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
 * Add Duration field as standalone meta box on product admin page
 * Only for products in "Testing Category"
 */
function klsd_add_duration_field() {
    global $post;

    // Only add meta box for products
    if (!$post || get_post_type($post) !== 'product') {
        return;
    }

    // Check if product is in "Testing Category"
    $product_cats = wp_get_post_terms($post->ID, 'product_cat', array('fields' => 'names'));
    if (!in_array('Testing Category', $product_cats)) {
        return;
    }

    add_meta_box(
        'klsd_duration_test',
        'Product Duration Test',
        'klsd_duration_field_callback',
        'product',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'klsd_add_duration_field');

/**
 * Display the Duration field in standalone meta box
 */
function klsd_duration_field_callback($post) {
    // Add nonce for security
    wp_nonce_field('klsd_duration_save', 'klsd_duration_nonce');

    // Get current value or use default
    $duration = get_post_meta($post->ID, '_klsd_test_duration', true);
    if (empty($duration)) {
        $duration = '99 hours';
    }

    ?>
    <style>
    .klsd-duration-container {
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 20px;
        margin: 10px 0;
    }
    .klsd-field-row {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
    }
    .klsd-field-row label {
        font-weight: 600;
        min-width: 100px;
        color: #333;
    }
    .klsd-field-row input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #ccd0d4;
        border-radius: 4px;
        font-size: 14px;
    }
    .klsd-field-row input:focus {
        border-color: #007cba;
        box-shadow: 0 0 0 1px #007cba;
        outline: none;
    }
    .klsd-description {
        color: #666;
        font-style: italic;
        font-size: 13px;
        margin-top: 5px;
    }
    .klsd-test-badge {
        background: #00a32a;
        color: white;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        float: right;
    }
    </style>

    <div class="klsd-duration-container">
        <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #ddd;">
            <strong>Custom Duration Field</strong>
            <span class="klsd-test-badge">Test Mode</span>
        </div>

        <div class="klsd-field-row">
            <label for="klsd_test_duration">Duration:</label>
            <input type="text"
                   id="klsd_test_duration"
                   name="klsd_test_duration"
                   value="<?php echo esc_attr($duration); ?>"
                   placeholder="99 hours" />
        </div>

        <div class="klsd-description">
            ✨ This is a test field for the Duration functionality. Default value: "99 hours"
        </div>
    </div>
    <?php
}

/**
 * Save the Duration field from standalone meta box
 * Only for products in "Testing Category"
 */
function klsd_save_duration_field($post_id) {
    // Check nonce for security
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

    // Only save for products in "Testing Category"
    $product_cats = wp_get_post_terms($post_id, 'product_cat', array('fields' => 'names'));
    if (!in_array('Testing Category', $product_cats)) {
        return;
    }

    // Save the duration field
    if (isset($_POST['klsd_test_duration'])) {
        $duration = sanitize_text_field($_POST['klsd_test_duration']);
        // Set default if empty
        if (empty($duration)) {
            $duration = '99 hours';
        }
        update_post_meta($post_id, '_klsd_test_duration', $duration);
    }
}
add_action('save_post', 'klsd_save_duration_field');

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
        global $post;
        if ($post) {
            $product_cats = wp_get_post_terms($post->ID, 'product_cat', array('fields' => 'names'));
            if (in_array('Testing Category', $product_cats)) {
                echo '<div class="notice notice-success is-dismissible">';
                echo '<p><strong>Duration Test Plugin:</strong> This product is in "Testing Category" - Duration field is available below.</p>';
                echo '</div>';
            } else {
                echo '<div class="notice notice-warning is-dismissible">';
                echo '<p><strong>Duration Test Plugin:</strong> Add this product to "Testing Category" to see the Duration field.</p>';
                echo '</div>';
            }
        }
    }
}
add_action('admin_notices', 'klsd_duration_admin_notice');
