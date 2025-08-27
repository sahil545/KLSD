<?php
/**
 * Plugin Name: Snorkeling Tour Admin Fields
 * Plugin URI: https://keylargoscubadiving.com
 * Description: Simple custom fields for snorkeling tour products in WordPress admin
 * Version: 1.0.0
 * Author: Key Largo Scuba Diving
 * Text Domain: snorkeling-tour-fields
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add metaboxes only for products in snorkeling-tours category
 */
function staf_add_tour_metaboxes() {
    global $post;
    
    // Only add for products
    if (get_post_type($post) !== 'product') {
        return;
    }
    
    // Check if product is in snorkeling-tours category
    $product_cats = wp_get_post_terms($post->ID, 'product_cat', array('fields' => 'slugs'));
    if (!in_array('snorkeling-tours', $product_cats)) {
        return;
    }
    
    // Add metabox for snorkeling tour products
    add_meta_box(
        'staf_tour_basic_info',
        'Snorkeling Tour Information',
        'staf_tour_basic_info_callback',
        'product',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'staf_add_tour_metaboxes');

/**
 * Basic Tour Information Metabox
 */
function staf_tour_basic_info_callback($post) {
    wp_nonce_field('staf_tour_metabox', 'staf_tour_nonce');
    
    // Get existing values
    $duration = get_post_meta($post->ID, '_tour_duration', true) ?: '4 Hours';
    $group_size = get_post_meta($post->ID, '_tour_group_size', true) ?: '25 Max';
    $location = get_post_meta($post->ID, '_tour_location', true) ?: 'Key Largo';
    $gear_included = get_post_meta($post->ID, '_tour_gear_included', true) ?: 'yes';
    $rating = get_post_meta($post->ID, '_tour_rating', true) ?: '4.9';
    $review_count = get_post_meta($post->ID, '_tour_review_count', true) ?: '487';
    
    $highlights = get_post_meta($post->ID, '_tour_highlights', true);
    if (empty($highlights)) {
        $highlights = "Famous 9-foot bronze Christ statue in crystal-clear water\nAll snorkeling equipment included\nPADI certified guides\nSmall group experience";
    } else {
        $highlights = implode("\n", $highlights);
    }
    
    $whats_included = get_post_meta($post->ID, '_tour_whats_included', true);
    if (empty($whats_included)) {
        $whats_included = "Professional snorkeling equipment\nPADI certified dive guide\nJohn Pennekamp park entrance\nMarine life identification guide\nSafety equipment & briefing\nFree parking";
    } else {
        $whats_included = implode("\n", $whats_included);
    }
    
    ?>
    <style>
    .staf-form-table { width: 100%; border-collapse: collapse; }
    .staf-form-table th { text-align: left; padding: 15px 10px; width: 150px; font-weight: 600; }
    .staf-form-table td { padding: 15px 10px; }
    .staf-form-table tr { border-bottom: 1px solid #f0f0f0; }
    .staf-input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    .staf-textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; min-height: 100px; }
    .staf-description { font-style: italic; color: #666; font-size: 12px; margin-top: 5px; }
    </style>
    
    <table class="staf-form-table">
        <tr>
            <th><label for="tour_duration">Duration</label></th>
            <td>
                <input type="text" id="tour_duration" name="tour_duration" value="<?php echo esc_attr($duration); ?>" class="staf-input" />
                <div class="staf-description">e.g., "4 Hours"</div>
            </td>
        </tr>
        <tr>
            <th><label for="tour_group_size">Group Size</label></th>
            <td>
                <input type="text" id="tour_group_size" name="tour_group_size" value="<?php echo esc_attr($group_size); ?>" class="staf-input" />
                <div class="staf-description">e.g., "25 Max"</div>
            </td>
        </tr>
        <tr>
            <th><label for="tour_location">Location</label></th>
            <td>
                <input type="text" id="tour_location" name="tour_location" value="<?php echo esc_attr($location); ?>" class="staf-input" />
                <div class="staf-description">e.g., "Key Largo"</div>
            </td>
        </tr>
        <tr>
            <th><label for="tour_gear_included">Gear Included</label></th>
            <td>
                <select id="tour_gear_included" name="tour_gear_included" class="staf-input">
                    <option value="yes" <?php selected($gear_included, 'yes'); ?>>Yes - Included</option>
                    <option value="no" <?php selected($gear_included, 'no'); ?>>No - Not Included</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="tour_rating">Rating</label></th>
            <td>
                <input type="number" id="tour_rating" name="tour_rating" value="<?php echo esc_attr($rating); ?>" step="0.1" min="0" max="5" class="staf-input" />
                <div class="staf-description">Rating out of 5 (e.g., 4.9)</div>
            </td>
        </tr>
        <tr>
            <th><label for="tour_review_count">Review Count</label></th>
            <td>
                <input type="number" id="tour_review_count" name="tour_review_count" value="<?php echo esc_attr($review_count); ?>" class="staf-input" />
                <div class="staf-description">Total number of reviews (e.g., 487)</div>
            </td>
        </tr>
        <tr>
            <th><label for="tour_highlights">Tour Highlights</label></th>
            <td>
                <textarea id="tour_highlights" name="tour_highlights" class="staf-textarea"><?php echo esc_textarea($highlights); ?></textarea>
                <div class="staf-description">One highlight per line</div>
            </td>
        </tr>
        <tr>
            <th><label for="tour_whats_included">What's Included</label></th>
            <td>
                <textarea id="tour_whats_included" name="tour_whats_included" class="staf-textarea"><?php echo esc_textarea($whats_included); ?></textarea>
                <div class="staf-description">One item per line</div>
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Save all custom fields
 */
function staf_save_tour_fields($post_id) {
    // Check if our nonce is set and verify it
    if (!isset($_POST['staf_tour_nonce']) || !wp_verify_nonce($_POST['staf_tour_nonce'], 'staf_tour_metabox')) {
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
    
    // Only save for products in snorkeling-tours category
    $product_cats = wp_get_post_terms($post_id, 'product_cat', array('fields' => 'slugs'));
    if (!in_array('snorkeling-tours', $product_cats)) {
        return;
    }
    
    // Basic Info Fields
    $basic_fields = array(
        'tour_duration', 'tour_group_size', 'tour_location', 'tour_gear_included',
        'tour_rating', 'tour_review_count'
    );
    
    foreach ($basic_fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
    
    // Handle textarea arrays
    if (isset($_POST['tour_highlights'])) {
        $highlights = array_filter(array_map('trim', explode("\n", $_POST['tour_highlights'])));
        update_post_meta($post_id, '_tour_highlights', array_map('sanitize_text_field', $highlights));
    }
    
    if (isset($_POST['tour_whats_included'])) {
        $included = array_filter(array_map('trim', explode("\n", $_POST['tour_whats_included'])));
        update_post_meta($post_id, '_tour_whats_included', array_map('sanitize_text_field', $included));
    }
}
add_action('save_post', 'staf_save_tour_fields');

/**
 * Helper function to get tour data for frontend use
 */
function staf_get_tour_data($product_id) {
    return array(
        'duration' => get_post_meta($product_id, '_tour_duration', true),
        'groupSize' => get_post_meta($product_id, '_tour_group_size', true),
        'location' => get_post_meta($product_id, '_tour_location', true),
        'gearIncluded' => get_post_meta($product_id, '_tour_gear_included', true) === 'yes',
        'rating' => get_post_meta($product_id, '_tour_rating', true),
        'reviewCount' => get_post_meta($product_id, '_tour_review_count', true),
        'highlights' => get_post_meta($product_id, '_tour_highlights', true),
        'whatsIncluded' => get_post_meta($product_id, '_tour_whats_included', true)
    );
}

/**
 * Add admin notice to help users understand how to use the plugin
 */
function staf_admin_notice() {
    $screen = get_current_screen();
    if ($screen->post_type === 'product') {
        echo '<div class="notice notice-info is-dismissible">';
        echo '<p><strong>Snorkeling Tour Fields:</strong> Add your product to the "snorkeling-tours" category to see custom tour fields.</p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'staf_admin_notice');
?>
