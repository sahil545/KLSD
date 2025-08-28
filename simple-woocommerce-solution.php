<?php
// In your theme's functions.php or a simple plugin

// Hook into WooCommerce product display
add_action('woocommerce_single_product_summary', 'display_custom_tour_fields', 25);

function display_custom_tour_fields() {
    global $product;
    
    // Get your custom fields
    $duration = get_post_meta($product->get_id(), '_klsd_tour_duration', true);
    $group_size = get_post_meta($product->get_id(), '_klsd_tour_group_size', true);
    $highlights = get_post_meta($product->get_id(), '_klsd_tour_highlights', true);
    
    if ($duration || $group_size || $highlights) {
        echo '<div class="custom-tour-info">';
        
        if ($duration) {
            echo '<div class="tour-detail">';
            echo '<strong>Duration:</strong> ' . esc_html($duration);
            echo '</div>';
        }
        
        if ($group_size) {
            echo '<div class="tour-detail">';
            echo '<strong>Group Size:</strong> ' . esc_html($group_size);
            echo '</div>';
        }
        
        if ($highlights && is_array($highlights)) {
            echo '<div class="tour-highlights">';
            echo '<strong>Tour Highlights:</strong>';
            echo '<ul>';
            foreach ($highlights as $highlight) {
                echo '<li>' . esc_html($highlight) . '</li>';
            }
            echo '</ul>';
            echo '</div>';
        }
        
        echo '</div>';
    }
}

// Add CSS
add_action('wp_head', function() {
    if (is_product()) {
        echo '<style>
        .custom-tour-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .tour-detail {
            margin-bottom: 10px;
        }
        .tour-highlights ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        </style>';
    }
});
?>
