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
        // Product admin hooks
        add_action('woocommerce_product_options_general_product_data', array($this, 'add_custom_fields'));
        add_action('woocommerce_process_product_meta', array($this, 'save_custom_fields'));
        
        // Category-based template assignment
        add_action('woocommerce_product_options_general_product_data', array($this, 'show_template_assignment'));
        
        // Admin styles and scripts
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
        
        // Product category hooks
        add_action('created_product_cat', array($this, 'assign_template_on_category_change'));
        add_action('edited_product_cat', array($this, 'assign_template_on_category_change'));
        
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
        .klsd-custom-fields { background: #fff; border: 1px solid #c3c4c7; margin-bottom: 20px; }
        .klsd-custom-fields h3 { padding: 10px 12px; margin: 0; background: #f9f9f9; border-left: 4px solid #00a32a; font-size: 14px; font-weight: 600; }
        .klsd-field { margin-bottom: 12px; padding: 0 12px; }
        .klsd-field label { font-weight: 600; color: #1d2327; margin-bottom: 6px; display: block; }
        .klsd-field input, .klsd-field textarea, .klsd-field select { width: 100%; padding: 6px 8px; border: 1px solid #8c8f94; border-radius: 4px; }
        .klsd-field-group { border: 1px solid #ddd; border-radius: 4px; margin-bottom: 12px; }
        .klsd-field-group h4 { margin: 0; padding: 8px 12px; background: #f6f7f7; border-bottom: 1px solid #ddd; font-size: 13px; }
        .klsd-configure-template { background: #2271b1; color: #fff; padding: 6px 12px; border: none; border-radius: 3px; cursor: pointer; }
        ';
    }
    
    /**
     * Get admin JavaScript
     */
    private function get_admin_js() {
        return '
        jQuery(document).ready(function($) {
            $(document).on("click", ".klsd-configure-template", function(e) {
                e.preventDefault();
                $(".klsd-custom-fields").show();
                $("html, body").animate({ scrollTop: $(".klsd-custom-fields").offset().top - 100 }, 500);
            });
            
            // Auto-save fields
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
        
        echo '<div class="klsd-template-assignment options_group">';
        echo '<h3>🎨 Template Assignment</h3>';
        echo '<div style="padding: 12px;">';
        
        if ($template) {
            echo '<div class="klsd-template-info">';
            echo '<strong>Assigned Template:</strong> ' . esc_html($template['name']) . '<br>';
            echo '<strong>Template Path:</strong> <code>/' . esc_html($template['template']) . '</code><br>';
            echo '<small style="color: #646970;">This template is automatically assigned based on product categories.</small><br><br>';
            echo '<button type="button" class="klsd-configure-template" data-template="' . esc_attr($template['template']) . '">';
            echo 'Configure Template Fields</button>';
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
     * Add custom fields based on template type
     */
    public function add_custom_fields() {
        global $post;
        
        $template = $this->get_product_template($post->ID);
        
        if (!$template) {
            return;
        }
        
        echo '<div class="klsd-custom-fields options_group" style="display: none;">';
        echo '<h3>📝 Template Custom Fields</h3>';
        echo '<div style="padding: 12px;">';
        
        switch ($template['template']) {
            case 'christ-statue-tour':
                $this->render_tours_fields($post->ID);
                break;
            case 'product-template-1a':
                $this->render_gear_fields($post->ID);
                break;
            case 'certification-template':
                $this->render_certification_fields($post->ID);
                break;
        }
        
        echo '</div>';
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
