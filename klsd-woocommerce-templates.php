<?php
/**
 * Plugin Name: KLSD WooCommerce Template Manager
 * Plugin URI: https://keylargoscubadiving.com
 * Description: Professional custom fields and template management for Key Largo Scuba Diving WooCommerce products
 * Version: 1.0.0
 * Author: KLSD Development Team
 * License: GPL v2 or later
 * Text Domain: klsd-woo-templates
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('KLSD_PLUGIN_VERSION', '1.0.0');
define('KLSD_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('KLSD_PLUGIN_URL', plugin_dir_url(__FILE__));

class KLSD_WooCommerce_Templates {
    
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
        load_plugin_textdomain('klsd-woo-templates', false, dirname(plugin_basename(__FILE__)) . '/languages/');
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
        echo __('KLSD WooCommerce Template Manager requires WooCommerce to be installed and active.', 'klsd-woo-templates');
        echo '</p></div>';
    }
    
    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Product admin hooks - consolidated template management
        add_action('woocommerce_product_options_general_product_data', array($this, 'show_template_assignment'));
        add_action('woocommerce_process_product_meta', array($this, 'save_custom_fields'));

        // Admin styles and scripts
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));

        // Product category hooks
        add_action('created_product_cat', array($this, 'assign_template_on_category_change'));
        add_action('edited_product_cat', array($this, 'assign_template_on_category_change'));

        // Template override hooks for Next.js frontend
        add_filter('template_include', array($this, 'override_product_template'));
        add_action('wp_head', array($this, 'add_nextjs_meta_tags'));

        // Booking data hooks
        add_action('woocommerce_add_to_cart', array($this, 'save_booking_data_to_cart'));
        add_action('woocommerce_checkout_create_order', array($this, 'save_booking_data_to_order'));

        // Ajax handlers
        add_action('wp_ajax_klsd_get_template_fields', array($this, 'ajax_get_template_fields'));
        add_action('wp_ajax_klsd_save_template_data', array($this, 'ajax_save_template_data'));
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
        
        // Inline CSS since we can't guarantee external files
        wp_add_inline_style('wp-admin', $this->get_admin_css());
        
        // Inline JS since we can't guarantee external files
        wp_add_inline_script('jquery', $this->get_admin_js());
    }
    
    /**
     * Get admin CSS
     */
    private function get_admin_css() {
        return '
        .klsd-template-assignment { background: #fff; border: 1px solid #c3c4c7; box-shadow: 0 1px 1px rgba(0,0,0,0.04); margin-bottom: 20px; }
        .klsd-template-assignment h3 { font-size: 14px; color: #1d2327; font-weight: 600; padding: 10px 12px; margin: 0; background: #f9f9f9; border-left: 4px solid #2271b1; }
        .klsd-template-info { background: #e7f3ff; border: 1px solid #72aee6; border-radius: 4px; padding: 12px; margin: 12px; }
        .klsd-template-fields { background: #fff; border: 1px solid #c3c4c7; margin-top: 15px; border-radius: 4px; }
        .klsd-template-fields h4 { padding: 10px 12px; margin: 0; background: #f9f9f9; border-left: 4px solid #00a32a; font-size: 14px; font-weight: 600; }
        .klsd-field { margin-bottom: 12px; padding: 0 12px; }
        .klsd-field label { font-weight: 600; color: #1d2327; margin-bottom: 6px; display: block; }
        .klsd-field input, .klsd-field textarea, .klsd-field select { width: 100%; padding: 6px 8px; border: 1px solid #8c8f94; border-radius: 4px; }
        .klsd-field-group { border: 1px solid #ddd; border-radius: 4px; margin-bottom: 12px; }
        .klsd-field-group h4 { margin: 0; padding: 8px 12px; background: #f6f7f7; border-bottom: 1px solid #ddd; font-size: 13px; }
        ';
    }
    
    /**
     * Get admin JavaScript
     */
    private function get_admin_js() {
        return '
        jQuery(document).ready(function($) {
            // Auto-save indicator for template fields
            $(document).on("change input", ".klsd-field input, .klsd-field textarea, .klsd-field select", function() {
                $(this).css("background-color", "#fff2cd");
                setTimeout(function() {
                    $(".klsd-field input, .klsd-field textarea, .klsd-field select").css("background-color", "");
                }, 1000);
            });
        });
        ';
    }
    
    /**
     * Get template assignment for product based on categories
     */
    private function get_product_template($product_id) {
        $categories = wp_get_post_terms($product_id, 'product_cat');
        
        if (empty($categories)) {
            return null;
        }
        
        // Template mappings
        $template_mappings = array(
            'tours_trips' => array(
                'template' => 'christ-statue-tour',
                'name' => 'Tours & Trips Template',
                'categories' => array('tours', 'trips', 'snorkeling', 'diving', 'all-tours-trips', 'all-tours-and-trips')
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
     * Show template assignment in product admin
     */
    public function show_template_assignment() {
        global $post;

        $template = $this->get_product_template($post->ID);
        $use_nextjs = get_post_meta($post->ID, '_klsd_use_nextjs_frontend', true);

        echo '<div class="klsd-template-assignment options_group">';
        echo '<h3>🎨 Template Assignment</h3>';
        echo '<div style="padding: 12px;">';

        // Next.js Frontend Toggle
        echo '<div class="klsd-nextjs-toggle" style="background: #e7f3ff; border: 1px solid #72aee6; border-radius: 4px; padding: 12px; margin-bottom: 15px;">';
        echo '<h4 style="margin: 0 0 10px 0; color: #1d2327;">⚡ Frontend Engine</h4>';
        echo '<label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">';
        echo '<input type="checkbox" name="_klsd_use_nextjs_frontend" value="1"' . checked($use_nextjs, '1', false) . ' />';
        echo '<span style="font-weight: 600;">Use Next.js Frontend (Modern Templates)</span>';
        echo '</label>';
        echo '<p style="margin: 8px 0 0 0; font-size: 13px; color: #646970;">';
        echo 'When enabled, this product will use the modern Next.js frontend templates. ';
        echo 'When disabled, uses standard WordPress/WooCommerce templates.';
        echo '</p>';
        echo '</div>';

        if ($template) {
            echo '<div class="klsd-template-info">';
            echo '<strong>Assigned Template:</strong> ' . esc_html($template['name']) . '<br>';
            echo '<strong>Template Path:</strong> <code>/' . esc_html($template['template']) . '</code><br>';
            if ($use_nextjs) {
                echo '<strong>Frontend Engine:</strong> <span style="color: #00a32a; font-weight: 600;">Next.js (Modern)</span><br>';
                echo '<small style="color: #646970;">This product will use the Next.js frontend template when viewed.</small><br><br>';
            } else {
                echo '<strong>Frontend Engine:</strong> <span style="color: #d63638;">WordPress (Classic)</span><br>';
                echo '<small style="color: #646970;">This product will use the standard WordPress template when viewed.</small><br><br>';
            }
            echo '</div>';

            // Show template-specific custom fields directly here
            echo '<div class="klsd-template-fields" style="margin-top: 20px;">';
            $this->render_template_custom_fields($post->ID, $template);
            echo '</div>';

        } else {
            echo '<div style="background: #fcf3cd; border: 1px solid #ddd; border-radius: 4px; padding: 12px;">';
            echo '<strong>No Template Assigned</strong><br>';
            echo '<small>Add this product to "All Tours & Trips", "Scuba Gear", or "Certification Courses" categories to enable template-specific fields.</small>';
            echo '</div>';
        }

        echo '</div>';
        echo '</div>';
    }
    
    /**
     * Render template-specific custom fields (called from template assignment section)
     */
    private function render_template_custom_fields($product_id, $template) {
        echo '<h4 style="margin: 20px 0 15px 0; color: #1d2327;">📝 Template-Specific Fields</h4>';
        echo '<div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 4px; padding: 15px;">';

        switch ($template['template']) {
            case 'christ-statue-tour':
            case 'christ-statue-tour-static':
                $this->render_tours_fields($product_id);
                break;
            case 'product-template-1a':
                $this->render_gear_fields($product_id);
                break;
            case 'certification-template':
                $this->render_certification_fields($product_id);
                break;
            default:
                echo '<p style="color: #646970; font-style: italic;">No custom fields configured for this template.</p>';
                break;
        }

        echo '</div>';
    }
    
    /**
     * Render Tours & Trips template fields
     */
    private function render_tours_fields($product_id) {
        $fields = array(
            '_klsd_tour_duration' => array('label' => 'Tour Duration', 'type' => 'text', 'placeholder' => 'e.g., 4 Hours'),
            '_klsd_tour_group_size' => array('label' => 'Max Group Size', 'type' => 'number', 'placeholder' => 'e.g., 25'),
            '_klsd_tour_location' => array('label' => 'Tour Location', 'type' => 'text', 'placeholder' => 'e.g., Key Largo'),
            '_klsd_tour_difficulty' => array('label' => 'Difficulty Level', 'type' => 'select', 'options' => array('' => 'Select Difficulty', 'beginner' => 'Beginner', 'intermediate' => 'Intermediate', 'advanced' => 'Advanced')),
            '_klsd_tour_gear_included' => array('label' => 'Gear Included', 'type' => 'checkbox', 'description' => 'Check if all gear is included'),
            '_klsd_tour_rating' => array('label' => 'Average Rating', 'type' => 'number', 'step' => '0.1', 'min' => '0', 'max' => '5', 'placeholder' => '4.9'),
            '_klsd_tour_reviews' => array('label' => 'Number of Reviews', 'type' => 'number', 'placeholder' => '487'),
            '_klsd_meeting_point' => array('label' => 'Meeting Point', 'type' => 'textarea', 'placeholder' => 'Meeting location details...'),
            '_klsd_included_items' => array('label' => 'What\'s Included', 'type' => 'textarea', 'placeholder' => 'List included items (one per line)...'),
            '_klsd_tour_highlights' => array('label' => 'Tour Highlights', 'type' => 'textarea', 'placeholder' => 'Key highlights (one per line)...')
        );
        
        $this->render_field_group('Tours & Trips', $fields, $product_id);
    }
    
    /**
     * Render Scuba Gear template fields
     */
    private function render_gear_fields($product_id) {
        $fields = array(
            '_klsd_gear_brand' => array('label' => 'Brand', 'type' => 'text', 'placeholder' => 'e.g., ScubaPro, Aqualung'),
            '_klsd_gear_model' => array('label' => 'Model', 'type' => 'text', 'placeholder' => 'e.g., MK25 EVO'),
            '_klsd_gear_colors' => array('label' => 'Available Colors', 'type' => 'text', 'placeholder' => 'e.g., Black, Blue, Red'),
            '_klsd_gear_sizes' => array('label' => 'Size Range', 'type' => 'text', 'placeholder' => 'e.g., XS-XXL, 5-12'),
            '_klsd_gear_material' => array('label' => 'Material', 'type' => 'text', 'placeholder' => 'e.g., Neoprene, Titanium'),
            '_klsd_gear_skill_level' => array('label' => 'Skill Level', 'type' => 'select', 'options' => array('' => 'Select Level', 'beginner' => 'Beginner', 'intermediate' => 'Intermediate', 'professional' => 'Professional')),
            '_klsd_gear_warranty' => array('label' => 'Warranty Period', 'type' => 'text', 'placeholder' => 'e.g., 2 Years, Lifetime'),
            '_klsd_gear_features' => array('label' => 'Key Features', 'type' => 'textarea', 'placeholder' => 'List key features (one per line)...'),
            '_klsd_shipping_info' => array('label' => 'Shipping Information', 'type' => 'text', 'placeholder' => 'e.g., Free shipping over $99'),
            '_klsd_service_available' => array('label' => 'Service Available', 'type' => 'checkbox', 'description' => 'Check if factory service is available')
        );
        
        $this->render_field_group('Scuba Gear', $fields, $product_id);
    }
    
    /**
     * Render Certification template fields
     */
    private function render_certification_fields($product_id) {
        $fields = array(
            '_klsd_cert_agency' => array('label' => 'Certification Agency', 'type' => 'select', 'options' => array('' => 'Select Agency', 'padi' => 'PADI', 'ssi' => 'SSI', 'naui' => 'NAUI', 'iantd' => 'IANTD')),
            '_klsd_cert_level' => array('label' => 'Course Level', 'type' => 'select', 'options' => array('' => 'Select Level', 'beginner' => 'Beginner', 'advanced' => 'Advanced', 'professional' => 'Professional')),
            '_klsd_course_duration' => array('label' => 'Course Duration', 'type' => 'text', 'placeholder' => 'e.g., 3 Days, 1 Week'),
            '_klsd_number_of_dives' => array('label' => 'Number of Dives', 'type' => 'number', 'placeholder' => '4'),
            '_klsd_max_depth' => array('label' => 'Maximum Depth', 'type' => 'text', 'placeholder' => 'e.g., 60 feet, 100 feet'),
            '_klsd_age_minimum' => array('label' => 'Minimum Age', 'type' => 'number', 'placeholder' => '10'),
            '_klsd_prerequisites' => array('label' => 'Prerequisites', 'type' => 'text', 'placeholder' => 'e.g., Open Water Certified, None'),
            '_klsd_course_includes' => array('label' => 'What\'s Included', 'type' => 'textarea', 'placeholder' => 'List what\'s included (one per line)...'),
            '_klsd_skills_learned' => array('label' => 'Skills You\'ll Learn', 'type' => 'textarea', 'placeholder' => 'List skills (one per line)...'),
            '_klsd_after_certification' => array('label' => 'After Certification', 'type' => 'textarea', 'placeholder' => 'What you can do after certification...')
        );
        
        $this->render_field_group('Certification Course', $fields, $product_id);
    }
    
    /**
     * Render a group of fields
     */
    private function render_field_group($group_name, $fields, $product_id) {
        echo '<div class="klsd-field-group">';
        echo '<h4>' . esc_html($group_name) . ' Fields</h4>';
        echo '<div style="padding: 12px;">';
        
        foreach ($fields as $key => $field) {
            $value = get_post_meta($product_id, $key, true);
            
            echo '<div class="klsd-field">';
            echo '<label>' . esc_html($field['label']) . '</label>';
            
            switch ($field['type']) {
                case 'text':
                case 'number':
                    $attributes = '';
                    if (isset($field['step'])) $attributes .= ' step="' . esc_attr($field['step']) . '"';
                    if (isset($field['min'])) $attributes .= ' min="' . esc_attr($field['min']) . '"';
                    if (isset($field['max'])) $attributes .= ' max="' . esc_attr($field['max']) . '"';
                    
                    echo '<input type="' . esc_attr($field['type']) . '" name="' . esc_attr($key) . '" ';
                    echo 'value="' . esc_attr($value) . '" placeholder="' . esc_attr($field['placeholder'] ?? '') . '"' . $attributes . ' />';
                    break;
                    
                case 'textarea':
                    echo '<textarea name="' . esc_attr($key) . '" rows="3" ';
                    echo 'placeholder="' . esc_attr($field['placeholder'] ?? '') . '">' . esc_textarea($value) . '</textarea>';
                    break;
                    
                case 'select':
                    echo '<select name="' . esc_attr($key) . '">';
                    foreach ($field['options'] as $option_value => $option_label) {
                        echo '<option value="' . esc_attr($option_value) . '"' . selected($value, $option_value, false) . '>';
                        echo esc_html($option_label) . '</option>';
                    }
                    echo '</select>';
                    break;
                    
                case 'checkbox':
                    echo '<label style="font-weight: normal;">';
                    echo '<input type="checkbox" name="' . esc_attr($key) . '" value="1"' . checked($value, '1', false) . ' />';
                    echo ' ' . esc_html($field['description'] ?? $field['label']);
                    echo '</label>';
                    break;
            }
            
            echo '</div>';
        }
        
        echo '</div>';
        echo '</div>';
    }
    
    /**
     * Save custom fields
     */
    public function save_custom_fields($post_id) {
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
    }
    
    /**
     * Ajax handler for getting template fields
     */
    public function ajax_get_template_fields() {
        wp_send_json_success(array('message' => 'Template fields loaded'));
    }
    
    /**
     * Ajax handler for saving template data
     */
    public function ajax_save_template_data() {
        wp_send_json_success(array('message' => 'Template data saved'));
    }

    /**
     * Override product template to use Next.js frontend when enabled
     */
    public function override_product_template($template) {
        // Only override on single product pages
        if (!is_product()) {
            return $template;
        }

        global $post;
        $use_nextjs = get_post_meta($post->ID, '_klsd_use_nextjs_frontend', true);

        // If Next.js is not enabled for this product, use default template
        if ($use_nextjs !== '1') {
            return $template;
        }

        // Get the template assignment
        $template_info = $this->get_product_template($post->ID);

        if (!$template_info) {
            return $template; // No template assigned, use default
        }

        // Create custom template file path
        $custom_template = KLSD_PLUGIN_PATH . 'templates/nextjs-product-template.php';

        // Create the template file if it doesn't exist
        if (!file_exists($custom_template)) {
            $this->create_nextjs_template_file($custom_template);
        }

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
    $template_info = (new KLSD_WooCommerce_Templates())->get_product_template($product_id);

    if ($template_info) {
        echo $this->render_nextjs_content($product_id, $template_info);
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
        $fetch_url = $netlify_url . "/" . $template_path . "?product=" . $product_id . "&ssr=1&wordpress=1&static_hero=1";

        // Set up HTTP request with timeout
        $args = array(
            'timeout' => 10,
            'headers' => array(
                'User-Agent' => 'WordPress/KLSD-Templates ' . KLSD_PLUGIN_VERSION,
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

        // Also listen for iframe messages
        window.addEventListener('message', function(event) {
            // Handle messages from iframe if needed
            if (event.origin === 'https://livewsnklsdlaucnh.netlify.app') {
                if (event.data.type === 'KLSD_ADD_TO_CART') {
                    // Same handler as above
                    window.dispatchEvent(new CustomEvent('message', { data: event.data }));
                }
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
     * Prepare product data for Next.js
     */
    private function prepare_product_data($product) {
        return array(
            "id" => $product->get_id(),
            "name" => $product->get_name(),
            "price" => $product->get_price(),
            "description" => $product->get_description(),
            "short_description" => $product->get_short_description(),
            "images" => $this->get_product_images($product),
            "categories" => $this->get_product_categories($product),
            "meta_data" => $this->get_product_meta_data($product->get_id())
        );
    }

    /**
     * Get product images
     */
    private function get_product_images($product) {
        $images = array();
        $image_ids = $product->get_gallery_image_ids();

        // Add featured image
        if ($product->get_image_id()) {
            array_unshift($image_ids, $product->get_image_id());
        }

        foreach ($image_ids as $image_id) {
            $image_url = wp_get_attachment_image_url($image_id, "full");
            if ($image_url) {
                $images[] = array(
                    "src" => $image_url,
                    "alt" => get_post_meta($image_id, "_wp_attachment_image_alt", true)
                );
            }
        }

        return $images;
    }

    /**
     * Get product categories
     */
    private function get_product_categories($product) {
        $categories = array();
        $terms = wp_get_post_terms($product->get_id(), "product_cat");

        foreach ($terms as $term) {
            $categories[] = array(
                "id" => $term->term_id,
                "name" => $term->name,
                "slug" => $term->slug
            );
        }

        return $categories;
    }

    /**
     * Get product meta data
     */
    private function get_product_meta_data($product_id) {
        $meta_data = array();
        $all_meta = get_post_meta($product_id);

        foreach ($all_meta as $key => $value) {
            if (strpos($key, "_klsd_") === 0) {
                $meta_data[] = array(
                    "key" => $key,
                    "value" => is_array($value) ? $value[0] : $value
                );
            }
        }

        return $meta_data;
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
            echo "<meta name=\"klsd-version\" content=\"" . KLSD_PLUGIN_VERSION . "\" />\n";
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
}

// Initialize the plugin
new KLSD_WooCommerce_Templates();

/**
 * Activation hook
 */
register_activation_hook(__FILE__, function() {
    if (!get_option('klsd_woo_templates_version')) {
        add_option('klsd_woo_templates_version', '1.0.0');
    }
});
