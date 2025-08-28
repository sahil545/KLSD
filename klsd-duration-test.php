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
 * Save the Duration field using WooCommerce methods
 */

function klsd_save_duration_field($post_id) {
    // Save the duration field - WooCommerce handles security and validation
    if (isset($_POST['_klsd_test_duration'])) {
        $duration = sanitize_text_field($_POST['_klsd_test_duration']);
        // Set default if empty
        if (empty($duration)) {
            $duration = '99 hours';
        }
        update_post_meta($post_id, '_klsd_test_duration', $duration);
    }
}
add_action('woocommerce_process_product_meta', 'klsd_save_duration_field');

/**
 * Helper function to get duration value (for future frontend use)
 * Can accept product ID or WooCommerce product object
 */
function klsd_get_product_duration($product) {
    // Handle both product ID and product object
    if (is_numeric($product)) {
        $product_id = $product;
    } elseif (is_object($product) && method_exists($product, 'get_id')) {
        $product_id = $product->get_id();
    } else {
        return '99 hours'; // fallback
    }

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
        echo '<p><strong>Duration Test Plugin Active:</strong> Look for the "Duration" field in the General tab of Product Data.</p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'klsd_duration_admin_notice');
