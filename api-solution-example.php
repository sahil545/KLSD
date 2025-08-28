<?php
// Add to your plugin or functions.php

// Expose custom fields in WooCommerce REST API
add_filter('woocommerce_rest_prepare_product_object', 'add_custom_fields_to_api', 10, 3);

function add_custom_fields_to_api($response, $object, $request) {
    $product_id = $object->get_id();
    
    // Add tour data to API response
    $response->data['tour_data'] = array(
        'duration' => get_post_meta($product_id, '_klsd_tour_duration', true),
        'group_size' => get_post_meta($product_id, '_klsd_tour_group_size', true),
        'location' => get_post_meta($product_id, '_klsd_tour_location', true),
        'difficulty' => get_post_meta($product_id, '_klsd_tour_difficulty', true),
        'gear_included' => get_post_meta($product_id, '_klsd_tour_gear_included', true) === '1',
        'rating' => get_post_meta($product_id, '_klsd_tour_rating', true),
        'reviews' => get_post_meta($product_id, '_klsd_tour_reviews', true),
        'highlights' => get_post_meta($product_id, '_klsd_tour_highlights', true),
        'included_items' => get_post_meta($product_id, '_klsd_included_items', true),
    );
    
    return $response;
}

// Allow API access for custom fields
add_filter('woocommerce_rest_api_get_rest_namespaces', function($controllers) {
    // Custom endpoint for tour data
    $controllers['wc/v3']['products'] = 'Custom_WC_REST_Products_Controller';
    return $controllers;
});
?>
