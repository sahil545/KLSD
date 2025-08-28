<?php
/**
 * Plugin Name: KLSD Duration Test
 * Plugin URI: https://keylargoscubadiving.com
 * Description: Simple test plugin that adds a Duration field to WooCommerce products
 * Version: 1.0.0
 * Author: Key Largo Scuba Diving
 * Text Domain: klsd-duration-test
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Check if WooCommerce is active
if (!in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    add_action('admin_notices', function() {
        echo '<div class="notice notice-error"><p>KLSD Duration Test requires WooCommerce to be installed and active.</p></div>';
    });
    return;
}

/**
 * Add Duration field to WooCommerce product admin page
 * Using WooCommerce-specific hook for better integration
 */
function klsd_add_duration_field() {
    echo '<div class="options_group">';
    woocommerce_wp_text_input(array(
        'id' => '_klsd_test_duration',
        'label' => 'Duration',
        'placeholder' => '99 hours',
        'desc_tip' => true,
        'description' => 'Testing duration field for this product'
    ));
    echo '</div>';
}
add_action('woocommerce_product_options_general_product_data', 'klsd_add_duration_field');

/**
 * Display the Duration field
 */
function klsd_duration_field_callback($post) {
    // Add nonce for security
    wp_nonce_field('klsd_duration_save', 'klsd_duration_nonce');
    
    // Get current value or use default
    $duration = get_post_meta($post->ID, '_klsd_test_duration', true);
    if (empty($duration)) {
        $duration = '99 hours';
    }
    
    echo '<table class="form-table">';
    echo '<tr>';
    echo '<th><label for="klsd_test_duration">Duration:</label></th>';
    echo '<td>';
    echo '<input type="text" id="klsd_test_duration" name="klsd_test_duration" value="' . esc_attr($duration) . '" style="width: 100%;" />';
    echo '<p class="description">Testing duration field (default: 99 hours)</p>';
    echo '</td>';
    echo '</tr>';
    echo '</table>';
}

/**
 * Save the Duration field
 */
function klsd_save_duration_field($post_id) {
    // Check nonce
    if (!isset($_POST['klsd_duration_nonce']) || !wp_verify_nonce($_POST['klsd_duration_nonce'], 'klsd_duration_save')) {
        return;
    }
    
    // Check if autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    // Check permissions
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    // Only save for products
    if (get_post_type($post_id) !== 'product') {
        return;
    }
    
    // Save the duration field
    if (isset($_POST['klsd_test_duration'])) {
        update_post_meta($post_id, '_klsd_test_duration', sanitize_text_field($_POST['klsd_test_duration']));
    }
}
add_action('save_post', 'klsd_save_duration_field');

/**
 * Helper function to get duration value (for future frontend use)
 */
function klsd_get_product_duration($product_id) {
    $duration = get_post_meta($product_id, '_klsd_test_duration', true);
    return !empty($duration) ? $duration : '99 hours';
}

/**
 * Add admin notice for guidance
 */
function klsd_duration_admin_notice() {
    $screen = get_current_screen();
    if ($screen && $screen->post_type === 'product' && $screen->base === 'post') {
        echo '<div class="notice notice-info is-dismissible">';
        echo '<p><strong>Duration Test Plugin Active:</strong> Look for the "Duration Test Field" box in the sidebar when editing products.</p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'klsd_duration_admin_notice');
