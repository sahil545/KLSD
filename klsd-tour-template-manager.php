<?php
/**
 * Plugin Name: KLSD Tour Template Manager
 * Plugin URI: https://keylargoscubadiving.com
 * Description: Advanced template management with Next.js integration for Key Largo Scuba Diving tours
 * Version: 2.0.0
 * Author: KLSD Development Team
 * License: GPL v2 or later
 * Text Domain: klsd-tour-templates
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('KLSD_TOUR_PLUGIN_VERSION', '2.0.0');
define('KLSD_TOUR_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('KLSD_TOUR_PLUGIN_URL', plugin_dir_url(__FILE__));

class KLSD_Tour_Template_Manager {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('plugins_loaded', array($this, 'load_textdomain'));
        
        // Check if WooCommerce is active
        if (!$this->is_woocommerce_active()) {
            add_action('admin_notices', array($this, 'woocommerce_missing_notice'));
            return;
        }
        
        $this->init_hooks();
    }
    
    /**
     * Initialize the plugin
     */
    public function init() {
        // Plugin initialization code
    }
    
    /**
     * Load plugin text domain
     */
    public function load_textdomain() {
        load_plugin_textdomain('klsd-tour-templates', false, dirname(plugin_basename(__FILE__)) . '/languages/');
    }
    
    /**
     * Check if WooCommerce is active
     */
    private function is_woocommerce_active() {
        return in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')));
    }
    
    /**
     * Display notice if WooCommerce is not active
     */
    public function woocommerce_missing_notice() {
        echo '<div class="notice notice-error"><p>';
        echo __('KLSD Tour Template Manager requires WooCommerce to be installed and active.', 'klsd-tour-templates');
        echo '</p></div>';
    }
    
    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Admin metaboxes
        add_action('add_meta_boxes', array($this, 'add_template_metaboxes'));
        add_action('save_post', array($this, 'save_template_fields'));
        
        // Template override hooks for Next.js frontend
        add_filter('template_include', array($this, 'override_product_template'));
        add_action('wp_head', array($this, 'add_nextjs_meta_tags'));
        
        // Booking data hooks
        add_action('woocommerce_add_to_cart', array($this, 'save_booking_data_to_cart'));
        add_action('woocommerce_checkout_create_order', array($this, 'save_booking_data_to_order'));
        
        // Admin styles
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
    }
    
    /**
     * Add metaboxes for tour products
     */
    public function add_template_metaboxes() {
        global $post;

        // Only add for products
        if (get_post_type($post) !== 'product') {
            return;
        }

        // Always add template management metabox (with toggle)
        add_meta_box(
            'klsd_template_manager',
            '⚡ Template & Frontend Engine',
            array($this, 'template_manager_metabox'),
            'product',
            'normal',
            'high'
        );

        // Get template assignment
        $template = $this->get_product_template($post->ID);

        if ($template) {
            // Add template-specific fields metabox only if template is assigned
            add_meta_box(
                'klsd_template_fields',
                '📝 ' . $template['name'] . ' Fields',
                array($this, 'template_fields_metabox'),
                'product',
                'normal',
                'high'
            );
        }
    }
    
    /**
     * Template manager metabox
     */
    public function template_manager_metabox($post) {
        wp_nonce_field('klsd_template_metabox', 'klsd_template_nonce');

        $template = $this->get_product_template($post->ID);
        $use_nextjs = get_post_meta($post->ID, '_klsd_use_nextjs_frontend', true);

        ?>
        <style>
        .klsd-metabox { background: #fff; }
        .klsd-metabox-table { width: 100%; border-collapse: collapse; }
        .klsd-metabox-table th { text-align: left; padding: 15px 10px; width: 180px; font-weight: 600; vertical-align: top; }
        .klsd-metabox-table td { padding: 15px 10px; }
        .klsd-metabox-table tr { border-bottom: 1px solid #f0f0f0; }
        .klsd-toggle-section { background: #e7f3ff; border: 1px solid #72aee6; border-radius: 4px; padding: 15px; margin: 10px 0; }
        .klsd-template-info { background: #f9f9f9; border: 1px solid #ddd; border-radius: 4px; padding: 15px; }
        .klsd-status-enabled { color: #00a32a; font-weight: 600; }
        .klsd-status-disabled { color: #d63638; font-weight: 600; }
        .klsd-warning { background: #fcf3cd; border: 1px solid #ddd; border-radius: 4px; padding: 15px; }
        .klsd-description { font-style: italic; color: #666; font-size: 12px; margin-top: 5px; }
        </style>

        <div class="klsd-metabox">
            <table class="klsd-metabox-table">
                <tr>
                    <th>Template Assigned</th>
                    <td>
                        <?php if ($template): ?>
                            <strong><?php echo esc_html($template['name']); ?></strong><br>
                            <code><?php echo esc_html($template['template']); ?></code>
                            <div class="klsd-description">Automatically assigned based on product categories</div>
                        <?php else: ?>
                            <div class="klsd-warning">
                                <strong>⚠️ No Template Assigned</strong><br>
                                Add this product to one of these categories to enable custom templates:
                                <ul style="margin: 10px 0 0 20px;">
                                    <li>• <strong>Tours & Trips</strong> (snorkeling, diving tours)</li>
                                    <li>• <strong>Scuba Gear</strong> (equipment & gear)</li>
                                    <li>• <strong>Certification Courses</strong> (training courses)</li>
                                </ul>
                            </div>
                        <?php endif; ?>
                    </td>
                </tr>
                <tr>
                    <th>Frontend Engine</th>
                    <td>
                        <div class="klsd-toggle-section">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" name="_klsd_use_nextjs_frontend" value="1" <?php checked($use_nextjs, '1'); ?> />
                                <span style="font-weight: 600;">Use Next.js Frontend (Modern Templates)</span>
                            </label>
                            <div class="klsd-description" style="margin-top: 10px;">
                                <?php if ($template): ?>
                                    When enabled, this product will use modern Next.js frontend templates.<br>
                                    When disabled, uses standard WordPress/WooCommerce templates.
                                <?php else: ?>
                                    <strong>Note:</strong> This toggle will only take effect once a template is assigned via product categories.<br>
                                    Currently will use standard WordPress/WooCommerce templates regardless of this setting.
                                <?php endif; ?>
                            </div>
                        </div>

                        <div class="klsd-template-info">
                            <strong>Current Status:</strong>
                            <?php if ($use_nextjs && $template): ?>
                                <span class="klsd-status-enabled">Next.js Frontend Active</span>
                            <?php elseif ($use_nextjs && !$template): ?>
                                <span class="klsd-status-disabled">Next.js Enabled but No Template (WordPress Frontend)</span>
                            <?php else: ?>
                                <span class="klsd-status-disabled">WordPress Frontend</span>
                            <?php endif; ?>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <?php
    }
    
    /**
     * Template fields metabox
     */
    public function template_fields_metabox($post) {
        $template = $this->get_product_template($post->ID);
        
        if (!$template) {
            echo '<p>No template assigned. Please assign product to appropriate category.</p>';
            return;
        }
        
        ?>
        <style>
        .klsd-fields-table { width: 100%; border-collapse: collapse; }
        .klsd-fields-table th { text-align: left; padding: 15px 10px; width: 180px; font-weight: 600; vertical-align: top; }
        .klsd-fields-table td { padding: 15px 10px; }
        .klsd-fields-table tr { border-bottom: 1px solid #f0f0f0; }
        .klsd-input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .klsd-textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; min-height: 100px; }
        .klsd-description { font-style: italic; color: #666; font-size: 12px; margin-top: 5px; }
        </style>
        
        <div class="klsd-metabox">
            <?php
            switch ($template['template']) {
                case 'christ-statue-tour':
                    $this->render_tours_fields_table($post->ID);
                    break;
                case 'product-template-1a':
                    $this->render_gear_fields_table($post->ID);
                    break;
                case 'certification-template':
                    $this->render_certification_fields_table($post->ID);
                    break;
                default:
                    echo '<p>No custom fields configured for this template.</p>';
                    break;
            }
            ?>
        </div>
        <?php
    }
    
    
    /**
     * Render Tours & Trips template fields table
     */
    private function render_tours_fields_table($product_id) {
        // Get existing values
        $duration = get_post_meta($product_id, '_klsd_tour_duration', true) ?: '4 Hours';
        $group_size = get_post_meta($product_id, '_klsd_tour_group_size', true) ?: '25 Max';
        $location = get_post_meta($product_id, '_klsd_tour_location', true) ?: 'Key Largo';
        $difficulty = get_post_meta($product_id, '_klsd_tour_difficulty', true) ?: 'All Levels';
        $gear_included = get_post_meta($product_id, '_klsd_tour_gear_included', true) ?: '1';
        $rating = get_post_meta($product_id, '_klsd_tour_rating', true) ?: '4.9';
        $reviews = get_post_meta($product_id, '_klsd_tour_reviews', true) ?: '487';
        $meeting_point = get_post_meta($product_id, '_klsd_meeting_point', true) ?: 'John Pennekamp Coral Reef State Park';
        
        $highlights = get_post_meta($product_id, '_klsd_tour_highlights', true);
        if (empty($highlights)) {
            $highlights = "Famous 9-foot bronze Christ statue in crystal-clear water\nAll snorkeling equipment included\nPADI certified guides\nSmall group experience";
        } elseif (is_array($highlights)) {
            $highlights = implode("\n", $highlights);
        }
        
        $included_items = get_post_meta($product_id, '_klsd_included_items', true);
        if (empty($included_items)) {
            $included_items = "Professional snorkeling equipment\nPADI certified dive guide\nJohn Pennekamp park entrance\nMarine life identification guide\nSafety equipment & briefing\nFree parking";
        } elseif (is_array($included_items)) {
            $included_items = implode("\n", $included_items);
        }
        
        ?>
        <table class="klsd-fields-table">
            <tr>
                <th><label for="klsd_tour_duration">Duration</label></th>
                <td>
                    <input type="text" id="klsd_tour_duration" name="_klsd_tour_duration" value="<?php echo esc_attr($duration); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "4 Hours", "Half Day"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_tour_group_size">Max Group Size</label></th>
                <td>
                    <input type="text" id="klsd_tour_group_size" name="_klsd_tour_group_size" value="<?php echo esc_attr($group_size); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "25 Max", "Small Groups Only"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_tour_location">Tour Location</label></th>
                <td>
                    <input type="text" id="klsd_tour_location" name="_klsd_tour_location" value="<?php echo esc_attr($location); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "Key Largo", "John Pennekamp Park"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_tour_difficulty">Difficulty Level</label></th>
                <td>
                    <select id="klsd_tour_difficulty" name="_klsd_tour_difficulty" class="klsd-input">
                        <option value="All Levels" <?php selected($difficulty, 'All Levels'); ?>>All Levels</option>
                        <option value="Beginner" <?php selected($difficulty, 'Beginner'); ?>>Beginner</option>
                        <option value="Intermediate" <?php selected($difficulty, 'Intermediate'); ?>>Intermediate</option>
                        <option value="Advanced" <?php selected($difficulty, 'Advanced'); ?>>Advanced</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_tour_gear_included">Gear Included</label></th>
                <td>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" name="_klsd_tour_gear_included" value="1" <?php checked($gear_included, '1'); ?> />
                        <span>All necessary gear is included in the tour price</span>
                    </label>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_tour_rating">Average Rating</label></th>
                <td>
                    <input type="number" id="klsd_tour_rating" name="_klsd_tour_rating" value="<?php echo esc_attr($rating); ?>" step="0.1" min="0" max="5" class="klsd-input" />
                    <div class="klsd-description">Rating out of 5 (e.g., 4.9)</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_tour_reviews">Number of Reviews</label></th>
                <td>
                    <input type="number" id="klsd_tour_reviews" name="_klsd_tour_reviews" value="<?php echo esc_attr($reviews); ?>" class="klsd-input" />
                    <div class="klsd-description">Total number of reviews (e.g., 487)</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_meeting_point">Meeting Point</label></th>
                <td>
                    <input type="text" id="klsd_meeting_point" name="_klsd_meeting_point" value="<?php echo esc_attr($meeting_point); ?>" class="klsd-input" />
                    <div class="klsd-description">Where guests should meet for the tour</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_tour_highlights">Tour Highlights</label></th>
                <td>
                    <textarea id="klsd_tour_highlights" name="_klsd_tour_highlights" class="klsd-textarea"><?php echo esc_textarea($highlights); ?></textarea>
                    <div class="klsd-description">One highlight per line - these appear as bullet points</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_included_items">What's Included</label></th>
                <td>
                    <textarea id="klsd_included_items" name="_klsd_included_items" class="klsd-textarea"><?php echo esc_textarea($included_items); ?></textarea>
                    <div class="klsd-description">One included item per line</div>
                </td>
            </tr>
        </table>
        <?php
    }
    
    /**
     * Render Scuba Gear template fields table
     */
    private function render_gear_fields_table($product_id) {
        // Get existing values
        $brand = get_post_meta($product_id, '_klsd_gear_brand', true) ?: '';
        $model = get_post_meta($product_id, '_klsd_gear_model', true) ?: '';
        $colors = get_post_meta($product_id, '_klsd_gear_colors', true) ?: '';
        $sizes = get_post_meta($product_id, '_klsd_gear_sizes', true) ?: '';
        $material = get_post_meta($product_id, '_klsd_gear_material', true) ?: '';
        $skill_level = get_post_meta($product_id, '_klsd_gear_skill_level', true) ?: '';
        $warranty = get_post_meta($product_id, '_klsd_gear_warranty', true) ?: '';
        $service_available = get_post_meta($product_id, '_klsd_service_available', true) ?: '';
        
        $features = get_post_meta($product_id, '_klsd_gear_features', true);
        if (is_array($features)) {
            $features = implode("\n", $features);
        }
        
        ?>
        <table class="klsd-fields-table">
            <tr>
                <th><label for="klsd_gear_brand">Brand</label></th>
                <td>
                    <input type="text" id="klsd_gear_brand" name="_klsd_gear_brand" value="<?php echo esc_attr($brand); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., ScubaPro, Aqualung, Mares</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_gear_model">Model</label></th>
                <td>
                    <input type="text" id="klsd_gear_model" name="_klsd_gear_model" value="<?php echo esc_attr($model); ?>" class="klsd-input" />
                    <div class="klsd-description">Product model name/number</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_gear_colors">Available Colors</label></th>
                <td>
                    <input type="text" id="klsd_gear_colors" name="_klsd_gear_colors" value="<?php echo esc_attr($colors); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "Black, Blue, Red"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_gear_sizes">Size Range</label></th>
                <td>
                    <input type="text" id="klsd_gear_sizes" name="_klsd_gear_sizes" value="<?php echo esc_attr($sizes); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "XS-XXL", "5-12", "One Size"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_gear_material">Material</label></th>
                <td>
                    <input type="text" id="klsd_gear_material" name="_klsd_gear_material" value="<?php echo esc_attr($material); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "Neoprene", "Titanium", "Stainless Steel"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_gear_skill_level">Skill Level</label></th>
                <td>
                    <select id="klsd_gear_skill_level" name="_klsd_gear_skill_level" class="klsd-input">
                        <option value="">Select Level</option>
                        <option value="Beginner" <?php selected($skill_level, 'Beginner'); ?>>Beginner</option>
                        <option value="Intermediate" <?php selected($skill_level, 'Intermediate'); ?>>Intermediate</option>
                        <option value="Professional" <?php selected($skill_level, 'Professional'); ?>>Professional</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_gear_warranty">Warranty Period</label></th>
                <td>
                    <input type="text" id="klsd_gear_warranty" name="_klsd_gear_warranty" value="<?php echo esc_attr($warranty); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "2 Years", "Lifetime Limited"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_service_available">Service Available</label></th>
                <td>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" name="_klsd_service_available" value="1" <?php checked($service_available, '1'); ?> />
                        <span>Factory service and repairs available</span>
                    </label>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_gear_features">Key Features</label></th>
                <td>
                    <textarea id="klsd_gear_features" name="_klsd_gear_features" class="klsd-textarea"><?php echo esc_textarea($features); ?></textarea>
                    <div class="klsd-description">One feature per line</div>
                </td>
            </tr>
        </table>
        <?php
    }
    
    /**
     * Render Certification template fields table
     */
    private function render_certification_fields_table($product_id) {
        // Get existing values with defaults
        $cert_agency = get_post_meta($product_id, '_klsd_cert_agency', true) ?: 'PADI';
        $cert_level = get_post_meta($product_id, '_klsd_cert_level', true) ?: 'Beginner';
        $course_duration = get_post_meta($product_id, '_klsd_course_duration', true) ?: '3 Days';
        $number_of_dives = get_post_meta($product_id, '_klsd_number_of_dives', true) ?: '4';
        $max_depth = get_post_meta($product_id, '_klsd_max_depth', true) ?: '60 feet';
        $age_minimum = get_post_meta($product_id, '_klsd_age_minimum', true) ?: '10';
        $prerequisites = get_post_meta($product_id, '_klsd_prerequisites', true) ?: 'None';
        
        $course_includes = get_post_meta($product_id, '_klsd_course_includes', true);
        if (empty($course_includes)) {
            $course_includes = "PADI certified instructor\nAll learning materials\nEquipment for training dives\nCertification card upon completion";
        } elseif (is_array($course_includes)) {
            $course_includes = implode("\n", $course_includes);
        }
        
        $skills_learned = get_post_meta($product_id, '_klsd_skills_learned', true);
        if (empty($skills_learned)) {
            $skills_learned = "Underwater breathing techniques\nBuoyancy control\nUnderwater navigation\nSafety procedures";
        } elseif (is_array($skills_learned)) {
            $skills_learned = implode("\n", $skills_learned);
        }
        
        ?>
        <table class="klsd-fields-table">
            <tr>
                <th><label for="klsd_cert_agency">Certification Agency</label></th>
                <td>
                    <select id="klsd_cert_agency" name="_klsd_cert_agency" class="klsd-input">
                        <option value="PADI" <?php selected($cert_agency, 'PADI'); ?>>PADI</option>
                        <option value="SSI" <?php selected($cert_agency, 'SSI'); ?>>SSI</option>
                        <option value="NAUI" <?php selected($cert_agency, 'NAUI'); ?>>NAUI</option>
                        <option value="IANTD" <?php selected($cert_agency, 'IANTD'); ?>>IANTD</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_cert_level">Course Level</label></th>
                <td>
                    <select id="klsd_cert_level" name="_klsd_cert_level" class="klsd-input">
                        <option value="Beginner" <?php selected($cert_level, 'Beginner'); ?>>Beginner</option>
                        <option value="Advanced" <?php selected($cert_level, 'Advanced'); ?>>Advanced</option>
                        <option value="Professional" <?php selected($cert_level, 'Professional'); ?>>Professional</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_course_duration">Course Duration</label></th>
                <td>
                    <input type="text" id="klsd_course_duration" name="_klsd_course_duration" value="<?php echo esc_attr($course_duration); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "3 Days", "1 Weekend", "5 Days"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_number_of_dives">Number of Dives</label></th>
                <td>
                    <input type="number" id="klsd_number_of_dives" name="_klsd_number_of_dives" value="<?php echo esc_attr($number_of_dives); ?>" class="klsd-input" />
                    <div class="klsd-description">Training dives included in course</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_max_depth">Maximum Depth</label></th>
                <td>
                    <input type="text" id="klsd_max_depth" name="_klsd_max_depth" value="<?php echo esc_attr($max_depth); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "60 feet", "100 feet", "130 feet"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_age_minimum">Minimum Age</label></th>
                <td>
                    <input type="number" id="klsd_age_minimum" name="_klsd_age_minimum" value="<?php echo esc_attr($age_minimum); ?>" class="klsd-input" />
                    <div class="klsd-description">Years old</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_prerequisites">Prerequisites</label></th>
                <td>
                    <input type="text" id="klsd_prerequisites" name="_klsd_prerequisites" value="<?php echo esc_attr($prerequisites); ?>" class="klsd-input" />
                    <div class="klsd-description">e.g., "Open Water Certified", "None"</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_course_includes">What's Included</label></th>
                <td>
                    <textarea id="klsd_course_includes" name="_klsd_course_includes" class="klsd-textarea"><?php echo esc_textarea($course_includes); ?></textarea>
                    <div class="klsd-description">One item per line</div>
                </td>
            </tr>
            <tr>
                <th><label for="klsd_skills_learned">Skills You'll Learn</label></th>
                <td>
                    <textarea id="klsd_skills_learned" name="_klsd_skills_learned" class="klsd-textarea"><?php echo esc_textarea($skills_learned); ?></textarea>
                    <div class="klsd-description">One skill per line</div>
                </td>
            </tr>
        </table>
        <?php
    }
    
    /**
     * Save all custom fields
     */
    public function save_template_fields($post_id) {
        // Check if our nonce is set and verify it
        if (!isset($_POST['klsd_template_nonce']) || !wp_verify_nonce($_POST['klsd_template_nonce'], 'klsd_template_metabox')) {
            return;
        }
        
        // If this is an autosave, don't do anything
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        
        // Check the user's permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        // Only save for products
        if (get_post_type($post_id) !== 'product') {
            return;
        }
        
        // Save Next.js frontend toggle
        $use_nextjs = isset($_POST['_klsd_use_nextjs_frontend']) ? '1' : '0';
        update_post_meta($post_id, '_klsd_use_nextjs_frontend', $use_nextjs);
        
        // Get all KLSD meta fields from POST data
        foreach ($_POST as $key => $value) {
            if (strpos($key, '_klsd_') === 0) {
                if (is_array($value)) {
                    $value = implode(', ', $value);
                }
                update_post_meta($post_id, sanitize_key($key), sanitize_textarea_field($value));
            }
        }
        
        // Handle textarea arrays for highlights and included items
        if (isset($_POST['_klsd_tour_highlights'])) {
            $highlights = array_filter(array_map('trim', explode("\n", $_POST['_klsd_tour_highlights'])));
            update_post_meta($post_id, '_klsd_tour_highlights', array_map('sanitize_text_field', $highlights));
        }
        
        if (isset($_POST['_klsd_included_items'])) {
            $included = array_filter(array_map('trim', explode("\n", $_POST['_klsd_included_items'])));
            update_post_meta($post_id, '_klsd_included_items', array_map('sanitize_text_field', $included));
        }
        
        if (isset($_POST['_klsd_gear_features'])) {
            $features = array_filter(array_map('trim', explode("\n", $_POST['_klsd_gear_features'])));
            update_post_meta($post_id, '_klsd_gear_features', array_map('sanitize_text_field', $features));
        }
        
        if (isset($_POST['_klsd_course_includes'])) {
            $includes = array_filter(array_map('trim', explode("\n", $_POST['_klsd_course_includes'])));
            update_post_meta($post_id, '_klsd_course_includes', array_map('sanitize_text_field', $includes));
        }
        
        if (isset($_POST['_klsd_skills_learned'])) {
            $skills = array_filter(array_map('trim', explode("\n", $_POST['_klsd_skills_learned'])));
            update_post_meta($post_id, '_klsd_skills_learned', array_map('sanitize_text_field', $skills));
        }
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function admin_scripts($hook) {
        if ('post.php' !== $hook && 'post-new.php' !== $hook) {
            return;
        }
        
        global $post_type;
        if ('product' !== $post_type) {
            return;
        }
        
        // Inline JS for auto-save indication
        wp_add_inline_script('jquery', '
        jQuery(document).ready(function($) {
            // Auto-save indicator for template fields
            $(document).on("change input", ".klsd-input, .klsd-textarea", function() {
                $(this).css("background-color", "#fff2cd");
                setTimeout(function() {
                    $(".klsd-input, .klsd-textarea").css("background-color", "");
                }, 1000);
            });
        });
        ');
    }
    
    /**
     * Get template assignment for product based on categories
     */
    public function get_product_template($product_id) {
        $categories = wp_get_post_terms($product_id, 'product_cat');
        
        if (empty($categories)) {
            return null;
        }
        
        // Template mappings
        $template_mappings = array(
            'tours_trips' => array(
                'template' => 'christ-statue-tour',
                'name' => 'Tours & Trips Template',
                'categories' => array('tours', 'trips', 'snorkeling', 'diving', 'all-tours-trips', 'all-tours-and-trips', 'snorkeling-tours')
            ),
            'scuba_gear' => array(
                'template' => 'product-template-1a',
                'name' => 'Scuba Gear Template',
                'categories' => array('scuba-gear', 'diving-gear', 'equipment', 'gear', 'accessories')
            ),
            'certification' => array(
                'template' => 'certification-template',
                'name' => 'Certification Template',
                'categories' => array('certification', 'certifications', 'courses', 'training', 'padi', 'certification-courses')
            )
        );
        
        foreach ($categories as $category) {
            $cat_slug = $category->slug;
            $cat_name = strtolower($category->name);
            
            foreach ($template_mappings as $key => $mapping) {
                foreach ($mapping['categories'] as $pattern) {
                    if (strpos($cat_slug, $pattern) !== false || strpos($cat_name, $pattern) !== false) {
                        return $mapping;
                    }
                }
            }
        }
        
        return null;
    }
    
    /**
     * Override product template to use Next.js frontend when enabled
     */
    public function override_product_template($template) {
        // Debug logging
        error_log('KLSD: Template override function called for template: ' . $template);

        // Only override on single product pages
        if (!is_product()) {
            error_log('KLSD: Not a product page, skipping override');
            return $template;
        }

        global $post;
        error_log('KLSD: Product ID: ' . $post->ID);

        $use_nextjs = get_post_meta($post->ID, '_klsd_use_nextjs_frontend', true);
        error_log('KLSD: Next.js enabled: ' . ($use_nextjs === '1' ? 'YES' : 'NO') . ' (value: ' . $use_nextjs . ')');

        // If Next.js is not enabled for this product, use default template
        if ($use_nextjs !== '1') {
            error_log('KLSD: Next.js not enabled, using default template');
            return $template;
        }

        // Get the template assignment
        $template_info = $this->get_product_template($post->ID);
        error_log('KLSD: Template info: ' . print_r($template_info, true));

        if (!$template_info) {
            error_log('KLSD: No template assigned, using default');
            return $template; // No template assigned, use default
        }

        // Create custom template file path
        $custom_template = KLSD_TOUR_PLUGIN_PATH . 'templates/nextjs-product-template.php';
        error_log('KLSD: Custom template path: ' . $custom_template);

        // Create the template file if it doesn't exist
        if (!file_exists($custom_template)) {
            error_log('KLSD: Creating template file');
            $this->create_nextjs_template_file($custom_template);
        } else {
            error_log('KLSD: Template file already exists');
        }

        error_log('KLSD: Returning custom template: ' . $custom_template);
        return $custom_template;
    }
    
    /**
     * Create the Next.js template file
     */
    private function create_nextjs_template_file($template_path) {
        $template_dir = dirname($template_path);
        
        // Create templates directory if it doesn't exist
        if (!file_exists($template_dir)) {
            wp_mkdir_p($template_dir);
        }
        
        $template_content = $this->get_nextjs_template_content();
        file_put_contents($template_path, $template_content);
    }
    
    /**
     * Get Next.js template content
     */
    private function get_nextjs_template_content() {
        return '<?php
/**
 * KLSD Next.js Product Template
 * This template renders Next.js frontend content within WordPress
 */

get_header(); ?>

<div id="klsd-nextjs-product-container">
    <?php
    global $post;
    $product_id = $post->ID;

    // Use global instance to avoid re-initialization
    $template_manager = $GLOBALS[\'klsd_tour_template_manager\'];
    $template_info = $template_manager->get_product_template($product_id);

    if ($template_info) {
        echo $template_manager->render_nextjs_content($product_id, $template_info);
    } else {
        echo "<div class=\"notice\">Template not assigned for this product.</div>";
    }
    ?>
</div>

<?php get_footer(); ?>';
    }
    
    /**
     * Render Next.js content for the product
     */
    public function render_nextjs_content($product_id, $template_info) {
        // Get product data
        $product = wc_get_product($product_id);
        
        if (!$product) {
            return '<div class="error">Product not found.</div>';
        }
        
        // Get the template path
        $template_path = $template_info["template"];
        
        // Fetch Next.js rendered HTML server-side
        $nextjs_html = $this->fetch_nextjs_html($product_id, $template_path);
        
        if ($nextjs_html) {
            // Successfully fetched Next.js HTML - return it directly
            return $nextjs_html;
        } else {
            // Fallback to basic product display if fetch fails
            return $this->render_fallback_content($product, $template_info);
        }
    }
    
    /**
     * Fetch Next.js HTML server-side for SEO
     */
    private function fetch_nextjs_html($product_id, $template_path) {
        $netlify_url = "https://livewsnklsdlaucnh.netlify.app";
        $fetch_url = $netlify_url . "/" . ltrim($template_path, '/') . "?product=" . $product_id . "&ssr=1&wordpress=1";
        
        // Set up HTTP request with timeout
        $args = array(
            'timeout' => 10,
            'headers' => array(
                'User-Agent' => 'WordPress/KLSD-Templates ' . KLSD_TOUR_PLUGIN_VERSION,
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            ),
        );
        
        // Make the request
        $response = wp_remote_get($fetch_url, $args);
        
        // Check for errors
        if (is_wp_error($response)) {
            error_log('KLSD: Failed to fetch Next.js HTML: ' . $response->get_error_message());
            return false;
        }
        
        $response_code = wp_remote_retrieve_response_code($response);
        if ($response_code !== 200) {
            error_log('KLSD: Next.js fetch returned HTTP ' . $response_code);
            return false;
        }
        
        $html = wp_remote_retrieve_body($response);
        
        // Clean and process the HTML
        return $this->process_nextjs_html($html, $product_id);
    }
    
    /**
     * Process and clean Next.js HTML for WordPress integration
     */
    private function process_nextjs_html($html, $product_id) {
        // Remove doctype, html, head, and body tags to get just the content
        $html = preg_replace('/<\!DOCTYPE[^>]*>/i', '', $html);
        $html = preg_replace('/<html[^>]*>/i', '', $html);
        $html = preg_replace('/<\/html>/i', '', $html);
        $html = preg_replace('/<head[^>]*>.*?<\/head>/is', '', $html);
        $html = preg_replace('/<body[^>]*>/i', '', $html);
        $html = preg_replace('/<\/body>/i', '', $html);
        
        // Extract just the main content area
        if (preg_match('/<main[^>]*>(.*?)<\/main>/is', $html, $matches)) {
            $html = $matches[1];
        } elseif (preg_match('/<div[^>]*class="[^"]*container[^"]*"[^>]*>(.*?)<\/div>/is', $html, $matches)) {
            $html = $matches[1];
        }
        
        // Clean up relative URLs and make them absolute
        $netlify_url = "https://livewsnklsdlaucnh.netlify.app";
        $html = str_replace('href="/', 'href="' . $netlify_url . '/', $html);
        $html = str_replace('src="/', 'src="' . $netlify_url . '/', $html);
        $html = str_replace("href='/", "href='" . $netlify_url . "/", $html);
        $html = str_replace("src='/", "src='" . $netlify_url . "/", $html);
        
        // Add wrapper with proper WordPress styling and booking handler
        $booking_script = $this->get_booking_handler_script($product_id);
        return '<div class="klsd-nextjs-content" data-product-id="' . esc_attr($product_id) . '">' . $html . '</div>' . $booking_script;
    }
    
    /**
     * Get booking handler JavaScript
     */
    private function get_booking_handler_script($product_id) {
        ob_start();
        ?>
        <script>
        // Listen for booking data from Next.js components
        window.addEventListener('message', function(event) {
            if (event.data.type === 'KLSD_ADD_TO_CART') {
                const bookingData = event.data;
                console.log('Received booking data:', bookingData);
                
                // Prepare form data for WooCommerce Bookings
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '<?php echo esc_url(wc_get_cart_url()); ?>';
                
                // Add product to cart fields
                const fields = {
                    'add-to-cart': bookingData.productId || '<?php echo esc_js($product_id); ?>',
                    'quantity': bookingData.guestCount || 1,
                    'wc_bookings_field_duration': '1',
                    'wc_bookings_field_resource': '',
                    'wc_bookings_field_persons': bookingData.guestCount || 1
                };
                
                // Add booking date if available
                if (bookingData.selectedDate) {
                    const bookingDate = new Date(bookingData.selectedDate);
                    fields['wc_bookings_field_start_date_year'] = bookingDate.getFullYear();
                    fields['wc_bookings_field_start_date_month'] = bookingDate.getMonth() + 1;
                    fields['wc_bookings_field_start_date_day'] = bookingDate.getDate();
                }
                
                // Add customer details as custom fields
                if (bookingData.bookingData && bookingData.bookingData.lead_guest) {
                    const leadGuest = bookingData.bookingData.lead_guest;
                    fields['klsd_lead_guest_name'] = leadGuest.firstName + ' ' + leadGuest.lastName;
                    fields['klsd_lead_guest_email'] = leadGuest.email;
                    fields['klsd_lead_guest_phone'] = leadGuest.phone;
                    fields['klsd_lead_guest_location'] = leadGuest.location;
                    fields['klsd_special_requests'] = leadGuest.specialRequests;
                    
                    if (bookingData.bookingData.passengers) {
                        fields['klsd_passengers'] = JSON.stringify(bookingData.bookingData.passengers);
                    }
                }
                
                // Create hidden form fields
                for (const [key, value] of Object.entries(fields)) {
                    if (value) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = value;
                        form.appendChild(input);
                    }
                }
                
                // Submit the form to add to cart
                document.body.appendChild(form);
                form.submit();
            }
        });
        </script>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Render fallback content if Next.js fetch fails
     */
    private function render_fallback_content($product, $template_info) {
        ob_start();
        ?>
        <div class="klsd-fallback-content">
            <div class="product-header">
                <h1><?php echo esc_html($product->get_name()); ?></h1>
                <div class="price">
                    <?php echo $product->get_price_html(); ?>
                </div>
            </div>
            
            <div class="product-description">
                <?php echo wp_kses_post($product->get_description()); ?>
            </div>
            
            <div class="product-meta">
                <p><strong>Template:</strong> <?php echo esc_html($template_info['name']); ?></p>
                <p><em>Enhanced view temporarily unavailable. Showing basic product information.</em></p>
            </div>
            
            <?php woocommerce_template_single_add_to_cart(); ?>
        </div>
        
        <style>
        .klsd-fallback-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .product-header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .price {
            font-size: 1.5em;
            color: #2ea44f;
            margin-bottom: 20px;
        }
        .product-description {
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .product-meta {
            background: #f6f8fa;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        </style>
        
        <?php
        $fallback_html = ob_get_clean();
        
        // Add booking handler script to fallback content too
        $booking_script = $this->get_booking_handler_script($product->get_id());
        return $fallback_html . $booking_script;
    }
    
    /**
     * Add Next.js specific meta tags for SEO
     */
    public function add_nextjs_meta_tags() {
        if (!is_product()) {
            return;
        }
        
        global $post;
        $use_nextjs = get_post_meta($post->ID, "_klsd_use_nextjs_frontend", true);
        
        if ($use_nextjs === "1") {
            echo "\n<!-- KLSD Next.js Frontend Active -->\n";
            echo "<meta name=\"klsd-frontend\" content=\"nextjs\" />\n";
            echo "<meta name=\"klsd-version\" content=\"" . KLSD_TOUR_PLUGIN_VERSION . "\" />\n";
        }
    }
    
    /**
     * Save booking data to cart session
     */
    public function save_booking_data_to_cart($cart_item_key) {
        // Save custom booking data to WooCommerce session
        if (isset($_POST['klsd_lead_guest_name'])) {
            WC()->session->set('klsd_lead_guest_name', sanitize_text_field($_POST['klsd_lead_guest_name']));
        }
        if (isset($_POST['klsd_lead_guest_email'])) {
            WC()->session->set('klsd_lead_guest_email', sanitize_email($_POST['klsd_lead_guest_email']));
        }
        if (isset($_POST['klsd_lead_guest_phone'])) {
            WC()->session->set('klsd_lead_guest_phone', sanitize_text_field($_POST['klsd_lead_guest_phone']));
        }
        if (isset($_POST['klsd_lead_guest_location'])) {
            WC()->session->set('klsd_lead_guest_location', sanitize_text_field($_POST['klsd_lead_guest_location']));
        }
        if (isset($_POST['klsd_special_requests'])) {
            WC()->session->set('klsd_special_requests', sanitize_textarea_field($_POST['klsd_special_requests']));
        }
        if (isset($_POST['klsd_passengers'])) {
            WC()->session->set('klsd_passengers', sanitize_text_field($_POST['klsd_passengers']));
        }
    }
    
    /**
     * Save booking data to order
     */
    public function save_booking_data_to_order($order) {
        // Transfer session data to order meta
        $booking_fields = array(
            'klsd_lead_guest_name' => 'Lead Guest Name',
            'klsd_lead_guest_email' => 'Lead Guest Email', 
            'klsd_lead_guest_phone' => 'Lead Guest Phone',
            'klsd_lead_guest_location' => 'Guest Location/Hotel',
            'klsd_special_requests' => 'Special Requests',
            'klsd_passengers' => 'All Passengers'
        );
        
        foreach ($booking_fields as $field_key => $field_label) {
            $field_value = WC()->session->get($field_key);
            if ($field_value) {
                $order->update_meta_data($field_key, $field_value);
                $order->update_meta_data('_' . $field_key . '_label', $field_label);
            }
        }
        
        // Clear session data after saving to order
        foreach (array_keys($booking_fields) as $field_key) {
            WC()->session->__unset($field_key);
        }
    }
    
    /**
     * Helper function to get tour data for frontend use (for backward compatibility)
     */
    public function get_tour_data($product_id) {
        return array(
            'duration' => get_post_meta($product_id, '_klsd_tour_duration', true),
            'groupSize' => get_post_meta($product_id, '_klsd_tour_group_size', true),
            'location' => get_post_meta($product_id, '_klsd_tour_location', true),
            'gearIncluded' => get_post_meta($product_id, '_klsd_tour_gear_included', true) === '1',
            'rating' => get_post_meta($product_id, '_klsd_tour_rating', true),
            'reviewCount' => get_post_meta($product_id, '_klsd_tour_reviews', true),
            'highlights' => get_post_meta($product_id, '_klsd_tour_highlights', true),
            'whatsIncluded' => get_post_meta($product_id, '_klsd_included_items', true)
        );
    }
}

// Initialize the plugin
$GLOBALS['klsd_tour_template_manager'] = new KLSD_Tour_Template_Manager();

/**
 * Activation hook
 */
register_activation_hook(__FILE__, function() {
    if (!get_option('klsd_tour_templates_version')) {
        add_option('klsd_tour_templates_version', '2.0.0');
    }
});
