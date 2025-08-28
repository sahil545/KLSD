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
        
        // Template override hooks - ULTRA HIGH PRIORITY to beat theme
        add_filter('template_include', array($this, 'override_product_template'), 9999);
        add_action('wp_head', array($this, 'add_nextjs_meta_tags'));

        // Early override hooks to bypass theme completely
        add_action('template_redirect', array($this, 'early_template_override'), 1);
        add_action('wp', array($this, 'wp_hook_override'), 1);

        // Test mode - force override on any product page for debugging
        if (isset($_GET['klsd_test_override']) && $_GET['klsd_test_override'] === '1') {
            add_filter('template_include', array($this, 'force_test_override'), 99999);
        }

        // Add debugging to see what's interfering
        add_action('init', array($this, 'debug_active_filters'), 999);
        
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

        // Add diagnostic metabox for debugging
        add_meta_box(
            'klsd_template_diagnostics',
            '🔍 Template Override Diagnostics',
            array($this, 'template_diagnostics_metabox'),
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
     * Template diagnostics metabox for debugging
     */
    public function template_diagnostics_metabox($post) {
        $template = $this->get_product_template($post->ID);
        $use_nextjs = get_post_meta($post->ID, '_klsd_use_nextjs_frontend', true);
        $product_cats = wp_get_post_terms($post->ID, 'product_cat', array('fields' => 'names'));
        $netlify_url = "https://livewsnklsdlaucnh.netlify.app";

        // Test connectivity to Next.js
        $test_url = $netlify_url . "/api/template-test?test=1";
        $test_response = wp_remote_get($test_url, array('timeout' => 5));
        $connectivity_status = is_wp_error($test_response) ? 'Failed: ' . $test_response->get_error_message() : 'Success (HTTP ' . wp_remote_retrieve_response_code($test_response) . ')';

        // Check if we're on a product page (this will always be false in admin, but useful for reference)
        $is_product_page = is_product();

        // Check template file
        $custom_template = KLSD_TOUR_PLUGIN_PATH . 'templates/nextjs-product-template.php';
        $template_exists = file_exists($custom_template);

        ?>
        <style>
        .klsd-diagnostics { font-family: monospace; background: #f9f9f9; padding: 15px; border-radius: 4px; }
        .klsd-diag-item { margin: 8px 0; padding: 8px; background: white; border-left: 4px solid #ddd; }
        .klsd-diag-item.success { border-left-color: #00a32a; }
        .klsd-diag-item.warning { border-left-color: #dba617; }
        .klsd-diag-item.error { border-left-color: #d63638; }
        .klsd-test-button { background: #0073aa; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin: 10px 5px 0 0; }
        </style>

        <div class="klsd-diagnostics">
            <div class="klsd-diag-item <?php echo $use_nextjs === '1' ? 'success' : 'warning'; ?>">
                <strong>Next.js Toggle:</strong> <?php echo $use_nextjs === '1' ? 'ENABLED ✓' : 'DISABLED ⚠️'; ?>
            </div>

            <div class="klsd-diag-item <?php echo $template ? 'success' : 'error'; ?>">
                <strong>Template Assignment:</strong> <?php echo $template ? $template['name'] . ' (' . $template['template'] . ') ✓' : 'NONE ASSIGNED ❌'; ?>
            </div>

            <div class="klsd-diag-item">
                <strong>Product Categories:</strong> <?php echo !empty($product_cats) ? implode(', ', $product_cats) : 'None'; ?>
            </div>

            <div class="klsd-diag-item <?php echo $template_exists ? 'success' : 'warning'; ?>">
                <strong>Template File:</strong> <?php echo $template_exists ? 'EXISTS ✓' : 'WILL BE CREATED'; ?>
                <br><small><?php echo $custom_template; ?></small>
            </div>

            <div class="klsd-diag-item">
                <strong>Next.js Connectivity:</strong> <?php echo $connectivity_status; ?>
                <br><small>Testing: <?php echo $test_url; ?></small>
            </div>

            <div class="klsd-diag-item">
                <strong>Override Conditions:</strong>
                <?php if ($use_nextjs === '1' && $template): ?>
                    <span style="color: #00a32a;">READY - Override should work on frontend ✓</span>
                <?php else: ?>
                    <span style="color: #d63638;">NOT READY ❌</span>
                    <ul style="margin: 5px 0 0 20px;">
                        <?php if ($use_nextjs !== '1'): ?><li>Next.js toggle must be enabled</li><?php endif; ?>
                        <?php if (!$template): ?><li>Product must be in a supported category</li><?php endif; ?>
                    </ul>
                <?php endif; ?>
            </div>

            <div class="klsd-diag-item warning">
                <strong>⚠️ Theme Interference Detected:</strong>
                <p style="margin: 5px 0;">Your active theme (<?php echo wp_get_theme()->get('Name'); ?>) may be overriding our template system.</p>
                <p style="margin: 5px 0; font-size: 12px;">Use the buttons below to test different bypass methods:</p>
                <ul style="margin: 5px 0 0 20px; font-size: 12px;">
                    <li><strong>Normal Test:</strong> Uses template_include filter (may be blocked by theme)</li>
                    <li><strong>Emergency Test:</strong> Bypasses conditions but uses WordPress template system</li>
                    <li><strong>Force Bypass:</strong> Completely bypasses theme - ultimate test</li>
                </ul>
            </div>

            <div style="margin-top: 15px;">
                <button type="button" class="klsd-test-button" onclick="window.open('<?php echo $netlify_url . '/api/template-test'; ?>', '_blank')">
                    Test Next.js API
                </button>
                <?php if ($template && $use_nextjs === '1'): ?>
                <button type="button" class="klsd-test-button" onclick="window.open('<?php echo get_permalink($post->ID); ?>', '_blank')">
                    Test Frontend Override
                </button>
                <button type="button" class="klsd-test-button" onclick="window.open('<?php echo get_permalink($post->ID); ?>?klsd_test_override=1', '_blank')">
                    Force Test Override
                </button>
                <button type="button" class="klsd-test-button" onclick="window.open('<?php echo get_permalink($post->ID); ?>?klsd_emergency=1', '_blank')" style="background: #dc3545;">
                    Emergency Test
                </button>
                <?php endif; ?>

                <button type="button" class="klsd-test-button" onclick="window.open('<?php echo get_permalink($post->ID); ?>?klsd_force_bypass=1', '_blank')" style="background: #6f42c1; color: white;">
                    🚀 Force Bypass Theme
                </button>

                <h4 style="margin-top: 20px; margin-bottom: 10px;">WordPress Environment:</h4>
                <div style="font-size: 11px; font-family: monospace; background: #f0f0f0; padding: 10px; border-radius: 4px;">
                    <div>Active Theme: <?php echo wp_get_theme()->get('Name'); ?></div>
                    <div>WooCommerce Version: <?php echo WC()->version; ?></div>
                    <div>Plugin Path: <?php echo KLSD_TOUR_PLUGIN_PATH; ?></div>
                    <div>Template Directory: <?php echo KLSD_TOUR_PLUGIN_PATH . 'templates/'; ?></div>
                    <div>Directory Writable: <?php echo is_writable(dirname(KLSD_TOUR_PLUGIN_PATH . 'templates/')) ? 'YES' : 'NO'; ?></div>
                </div>
            </div>
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
        // Always log that this function was called
        error_log('KLSD: ===== TEMPLATE OVERRIDE FUNCTION CALLED =====');
        error_log('KLSD: Original template: ' . $template);
        error_log('KLSD: Current URL: ' . $_SERVER['REQUEST_URI']);
        error_log('KLSD: is_product(): ' . (is_product() ? 'YES' : 'NO'));
        error_log('KLSD: is_single(): ' . (is_single() ? 'YES' : 'NO'));
        error_log('KLSD: Current post type: ' . get_post_type());

        // Emergency bypass for testing - if URL contains klsd_emergency=1
        if (isset($_GET['klsd_emergency']) && $_GET['klsd_emergency'] === '1') {
            error_log('KLSD: EMERGENCY BYPASS ACTIVATED');
            return $this->create_emergency_template();
        }

        // Only override on single product pages
        if (!is_product()) {
            error_log('KLSD: Not a product page, skipping override. Post type: ' . get_post_type());
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
            error_log('KLSD: Creating template file at: ' . $custom_template);
            $this->create_nextjs_template_file($custom_template);

            // Verify it was created
            if (file_exists($custom_template)) {
                error_log('KLSD: Template file created successfully');
                error_log('KLSD: Template file size: ' . filesize($custom_template) . ' bytes');
            } else {
                error_log('KLSD: FAILED to create template file!');
                error_log('KLSD: Directory exists: ' . (file_exists(dirname($custom_template)) ? 'YES' : 'NO'));
                error_log('KLSD: Directory writable: ' . (is_writable(dirname($custom_template)) ? 'YES' : 'NO'));
            }
        } else {
            error_log('KLSD: Template file already exists');
            error_log('KLSD: Template file size: ' . filesize($custom_template) . ' bytes');
        }

        error_log('KLSD: Returning custom template: ' . $custom_template);
        return $custom_template;
    }

    /**
     * Force test override for debugging - bypasses all conditions
     */
    public function force_test_override($template) {
        error_log('KLSD: ===== FORCE TEST OVERRIDE ACTIVATED =====');

        // Always return a simple test template
        $test_template_content = '<?php
get_header(); ?>
<div style="background: #ff6b6b; color: white; padding: 40px; text-align: center; margin: 20px;">
    <h1>🔧 KLSD Template Override Test Mode</h1>
    <p>If you see this, the template override system is working!</p>
    <p>Product ID: ' . get_the_ID() . '</p>
    <p>Template: ' . $template . '</p>
    <p>URL: ' . $_SERVER['REQUEST_URI'] . '</p>
</div>
<?php get_footer(); ?>';

        $test_template_path = KLSD_TOUR_PLUGIN_PATH . 'templates/test-override.php';

        // Create templates directory if it doesn't exist
        $template_dir = dirname($test_template_path);
        if (!file_exists($template_dir)) {
            wp_mkdir_p($template_dir);
        }

        // Write the test template
        file_put_contents($test_template_path, $test_template_content);

        error_log('KLSD: Force override returning: ' . $test_template_path);
        return $test_template_path;
    }

    /**
     * Create emergency template for testing - minimal viable override
     */
    private function create_emergency_template() {
        $emergency_content = '<?php
/* Emergency KLSD Template Override Test */
get_header(); ?>

<div style="background: linear-gradient(45deg, #ff6b6b, #ff8e53); color: white; padding: 60px 20px; text-align: center; margin: 0;">
    <h1 style="font-size: 3em; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🚨 EMERGENCY OVERRIDE ACTIVE</h1>
    <p style="font-size: 1.5em; margin: 20px 0; opacity: 0.9;">Template override system is working!</p>
    <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; margin: 20px auto; max-width: 600px;">
        <h2 style="margin: 0 0 15px 0;">Diagnostic Information</h2>
        <div style="text-align: left; font-family: monospace; line-height: 1.8;">
            <strong>Post ID:</strong> <?php echo get_the_ID(); ?><br>
            <strong>Post Type:</strong> <?php echo get_post_type(); ?><br>
            <strong>URL:</strong> <?php echo $_SERVER["REQUEST_URI"]; ?><br>
            <strong>Time:</strong> <?php echo date("Y-m-d H:i:s"); ?><br>
            <strong>is_product():</strong> <?php echo is_product() ? "YES" : "NO"; ?><br>
            <strong>WooCommerce Active:</strong> <?php echo class_exists("WooCommerce") ? "YES" : "NO"; ?>
        </div>
    </div>
    <p style="margin: 30px 0 0 0; opacity: 0.8;">✅ If you see this, WordPress template override is functional!</p>
</div>

<?php get_footer(); ?>';

        $emergency_path = KLSD_TOUR_PLUGIN_PATH . 'templates/emergency-override.php';

        // Ensure directory exists
        $template_dir = dirname($emergency_path);
        if (!file_exists($template_dir)) {
            wp_mkdir_p($template_dir);
        }

        // Write emergency template
        file_put_contents($emergency_path, $emergency_content);

        error_log('KLSD: Emergency template created at: ' . $emergency_path);
        return $emergency_path;
    }

    /**
     * Early template override using template_redirect hook
     */
    public function early_template_override() {
        if (!is_product()) {
            return;
        }

        global $post;
        $use_nextjs = get_post_meta($post->ID, '_klsd_use_nextjs_frontend', true);

        if ($use_nextjs === '1') {
            error_log('KLSD: Early template override activated for post ' . $post->ID);

            // Get template and check conditions
            $template_info = $this->get_product_template($post->ID);
            if ($template_info) {
                // Bypass theme entirely - load our template directly
                $this->load_nextjs_template_directly($post->ID, $template_info);
                exit; // Stop WordPress from loading anything else
            }
        }
    }

    /**
     * Even earlier override using wp hook
     */
    public function wp_hook_override() {
        if (!is_product()) {
            return;
        }

        // Check for emergency mode
        if (isset($_GET['klsd_force_bypass']) && $_GET['klsd_force_bypass'] === '1') {
            error_log('KLSD: FORCE BYPASS MODE - Completely bypassing theme');
            $this->force_bypass_theme();
            exit;
        }
    }

    /**
     * Debug what filters are active on template_include
     */
    public function debug_active_filters() {
        global $wp_filter;

        if (isset($wp_filter['template_include'])) {
            error_log('KLSD: Active template_include filters:');
            foreach ($wp_filter['template_include']->callbacks as $priority => $callbacks) {
                foreach ($callbacks as $callback) {
                    $callback_name = 'Unknown';
                    if (is_array($callback['function'])) {
                        if (is_object($callback['function'][0])) {
                            $callback_name = get_class($callback['function'][0]) . '::' . $callback['function'][1];
                        } else {
                            $callback_name = $callback['function'][0] . '::' . $callback['function'][1];
                        }
                    } elseif (is_string($callback['function'])) {
                        $callback_name = $callback['function'];
                    }
                    error_log('KLSD: Priority ' . $priority . ': ' . $callback_name);
                }
            }
        }
    }

    /**
     * Load Next.js template directly, bypassing WordPress template system
     */
    private function load_nextjs_template_directly($product_id, $template_info) {
        error_log('KLSD: Loading Next.js template directly, bypassing theme');

        // Get Next.js content
        $nextjs_html = $this->fetch_nextjs_html($product_id, $template_info['template']);

        if ($nextjs_html) {
            // Output complete HTML page with WordPress head/footer
            get_header();
            echo '<div id="klsd-direct-template-load">';
            echo $nextjs_html;
            echo '</div>';
            get_footer();
        } else {
            // Fallback if Next.js fails
            get_header();
            echo '<div style="background: #ffc107; padding: 40px; text-align: center;">';
            echo '<h1>⚠️ Next.js Template Override Active</h1>';
            echo '<p>Template override is working, but Next.js content failed to load.</p>';
            echo '<p>Product ID: ' . $product_id . ' | Template: ' . $template_info['template'] . '</p>';
            echo '</div>';
            get_footer();
        }
    }

    /**
     * Force bypass theme completely - emergency mode
     */
    private function force_bypass_theme() {
        // Output minimal HTML directly
        ?>
        <!DOCTYPE html>
        <html <?php language_attributes(); ?>>
        <head>
            <meta charset="<?php bloginfo('charset'); ?>">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>KLSD Force Bypass Test</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 40px; background: #000; color: #fff; }
                .success { background: #28a745; padding: 30px; border-radius: 10px; text-align: center; }
                .info { background: #17a2b8; padding: 20px; margin: 20px 0; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="success">
                <h1>🎉 FORCE BYPASS SUCCESSFUL!</h1>
                <p>This completely bypasses the WordPress theme system!</p>
            </div>

            <div class="info">
                <h2>Diagnostic Information</h2>
                <p><strong>Post ID:</strong> <?php echo get_the_ID(); ?></p>
                <p><strong>Post Type:</strong> <?php echo get_post_type(); ?></p>
                <p><strong>Active Theme:</strong> <?php echo wp_get_theme()->get('Name'); ?></p>
                <p><strong>URL:</strong> <?php echo $_SERVER['REQUEST_URI']; ?></p>
                <p><strong>Time:</strong> <?php echo date('Y-m-d H:i:s'); ?></p>
            </div>

            <div class="info">
                <h2>✅ Success!</h2>
                <p>If you can see this page, it means we can completely bypass your theme.</p>
                <p>Now we can apply this technique to load Next.js content instead.</p>
            </div>
        </body>
        </html>
        <?php
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

        // Get product data to pass to static template
        $product = wc_get_product($product_id);
        $product_data = $this->prepare_product_data_for_url($product, $product_id);

        // Use the actual product template with real data (SSR parameters)
        $fetch_url = $netlify_url . "/" . $template_path . "?" . $product_data . "&ssr=1&wordpress=1";

        error_log('KLSD: Attempting to fetch Next.js HTML from: ' . $fetch_url);

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
            error_log('KLSD: Next.js fetch returned HTTP ' . $response_code . ' for URL: ' . $fetch_url);
            $response_body = wp_remote_retrieve_body($response);
            error_log('KLSD: Response body: ' . substr($response_body, 0, 500));
            return false;
        }

        $html = wp_remote_retrieve_body($response);
        error_log('KLSD: Successfully fetched ' . strlen($html) . ' bytes of HTML');

        // Clean and process the HTML
        return $this->process_nextjs_html($html, $product_id);
    }
    
    /**
     * Process and clean Next.js HTML for WordPress integration
     */
    private function process_nextjs_html($html, $product_id) {
        error_log('KLSD: Processing HTML - original length: ' . strlen($html));

        // Store original HTML for fallback
        $original_html = $html;

        // Extract CSS and meta tags from head before removing it
        $head_content = '';
        $netlify_url = "https://livewsnklsdlaucnh.netlify.app";

        if (preg_match('/<head[^>]*>(.*?)<\/head>/is', $html, $head_matches)) {
            $head_html = $head_matches[1];

            // Extract CSS links and inline styles
            preg_match_all('/<link[^>]*rel=["\']stylesheet["\'][^>]*>/i', $head_html, $css_links);
            preg_match_all('/<style[^>]*>.*?<\/style>/is', $head_html, $inline_styles);
            preg_match_all('/<meta[^>]*>/i', $head_html, $meta_tags);

            // Fix CSS links to use absolute URLs
            $fixed_css_links = array();
            foreach ($css_links[0] as $css_link) {
                // Make relative URLs absolute
                $fixed_link = str_replace('href="/', 'href="' . $netlify_url . '/', $css_link);
                $fixed_link = str_replace("href='/", "href='" . $netlify_url . "/", $fixed_link);
                $fixed_css_links[] = $fixed_link;
            }

            // Combine all head content we want to preserve
            $head_content = implode("\n", $fixed_css_links) . "\n" . implode("\n", $inline_styles[0]) . "\n" . implode("\n", $meta_tags[0]);
            error_log('KLSD: Extracted and fixed head content length: ' . strlen($head_content));
        }

        // Remove doctype, html, head, and body tags to get just the content
        $html = preg_replace('/<\!DOCTYPE[^>]*>/i', '', $html);
        $html = preg_replace('/<html[^>]*>/i', '', $html);
        $html = preg_replace('/<\/html>/i', '', $html);
        $html = preg_replace('/<head[^>]*>.*?<\/head>/is', '', $html);
        $html = preg_replace('/<body[^>]*>/i', '', $html);
        $html = preg_replace('/<\/body>/i', '', $html);

        error_log('KLSD: After basic cleanup - length: ' . strlen($html));

        // Remove Next.js navigation to avoid duplicate headers
        $html = preg_replace('/<nav[^>]*>.*?<\/nav>/is', '', $html);

        // Simplified approach - just remove nav and footer, keep everything else
        error_log('KLSD: Starting simplified content extraction from HTML length: ' . strlen($html));

        // Remove navigation elements (to avoid duplicate headers)
        $html = preg_replace('/<nav[^>]*>.*?<\/nav>/is', '', $html);

        // Remove footer elements (WordPress will add its own)
        $html = preg_replace('/<footer[^>]*>.*?<\/footer>/is', '', $html);

        error_log('KLSD: After removing nav/footer, content length: ' . strlen($html));

        // Safety check - if content is too short, use original
        if (strlen($html) < 500) {
            error_log('KLSD: Content too short, using original body content');
            $html = $original_html;
            $html = preg_replace('/<\!DOCTYPE[^>]*>/i', '', $html);
            $html = preg_replace('/<html[^>]*>/i', '', $html);
            $html = preg_replace('/<\/html>/i', '', $html);
            $html = preg_replace('/<head[^>]*>.*?<\/head>/is', '', $html);
            $html = preg_replace('/<body[^>]*>/i', '', $html);
            $html = preg_replace('/<\/body>/i', '', $html);
            // Only remove nav, keep everything else
            $html = preg_replace('/<nav[^>]*>.*?<\/nav>/is', '', $html);
        }

        error_log('KLSD: Final processed content length: ' . strlen($html));

        // Clean up relative URLs and make them absolute
        $netlify_url = "https://livewsnklsdlaucnh.netlify.app";
        $html = str_replace('href="/', 'href="' . $netlify_url . '/', $html);
        $html = str_replace('src="/', 'src="' . $netlify_url . '/', $html);
        $html = str_replace("href='/", "href='" . $netlify_url . "/", $html);
        $html = str_replace("src='/", "src='" . $netlify_url . "/", $html);

        // Add wrapper with proper WordPress styling and booking handler
        $booking_script = $this->get_booking_handler_script($product_id);

        // Include the head content for styling
        $result = $head_content . '<div class="klsd-nextjs-content" data-product-id="' . esc_attr($product_id) . '">' . $html . '</div>' . $booking_script;

        error_log('KLSD: Final result length: ' . strlen($result));
        return $result;
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
     * Prepare product data for URL parameters
     */
    private function prepare_product_data_for_url($product, $product_id) {
        if (!$product) {
            return 'product=' . $product_id;
        }

        $params = array(
            'product' => $product_id,
            'product_id' => $product_id,
            'product_name' => urlencode($product->get_name()),
            'product_price' => $product->get_price(),
        );

        // Get custom field data from your WordPress fields
        $tour_duration = get_post_meta($product_id, '_klsd_tour_duration', true);
        $tour_group_size = get_post_meta($product_id, '_klsd_tour_group_size', true);
        $tour_location = get_post_meta($product_id, '_klsd_tour_location', true);
        $tour_difficulty = get_post_meta($product_id, '_klsd_tour_difficulty', true);
        $tour_gear_included = get_post_meta($product_id, '_klsd_tour_gear_included', true);
        $tour_highlights = get_post_meta($product_id, '_klsd_tour_highlights', true);

        // Add tour data if available
        if ($tour_duration) $params['tour_duration'] = urlencode($tour_duration);
        if ($tour_group_size) $params['tour_group_size'] = urlencode($tour_group_size);
        if ($tour_location) $params['tour_location'] = urlencode($tour_location);
        if ($tour_difficulty) $params['tour_difficulty'] = urlencode($tour_difficulty);
        if ($tour_gear_included) $params['tour_gear_included'] = $tour_gear_included === '1' ? '1' : '0';

        // Handle highlights (could be array or string)
        if ($tour_highlights) {
            if (is_array($tour_highlights)) {
                $params['tour_highlights'] = urlencode(json_encode($tour_highlights));
            } else {
                // Split by newlines if it's a string
                $highlights_array = array_filter(explode("\n", $tour_highlights));
                $params['tour_highlights'] = urlencode(json_encode($highlights_array));
            }
        }

        // Get product categories
        $categories = array();
        $terms = wp_get_post_terms($product_id, 'product_cat');
        foreach ($terms as $term) {
            $categories[] = array(
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug
            );
        }
        if (!empty($categories)) {
            $params['product_categories'] = urlencode(json_encode($categories));
        }

        // Get product images
        $images = array();
        $image_ids = $product->get_gallery_image_ids();
        if ($product->get_image_id()) {
            array_unshift($image_ids, $product->get_image_id());
        }
        foreach ($image_ids as $image_id) {
            $image_url = wp_get_attachment_image_url($image_id, 'full');
            if ($image_url) {
                $images[] = array(
                    'src' => $image_url,
                    'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true)
                );
                break; // Just get the first image for hero
            }
        }
        if (!empty($images)) {
            $params['product_images'] = urlencode(json_encode($images));
        }

        return http_build_query($params);
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
