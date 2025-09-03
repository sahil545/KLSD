<?php
/**
 * Simple Tour Fields Display
 * Replace your complex plugin with this
 */

// Add to your theme's functions.php

// Display custom fields on single product pages
add_action('woocommerce_single_product_summary', 'simple_tour_fields_display', 25);

function simple_tour_fields_display() {
    global $product;
    
    // Only show on tour products (check category)
    if (!has_term('tours', 'product_cat')) {
        return;
    }
    
    $product_id = $product->get_id();
    
    // Get your existing custom fields
    $duration = get_post_meta($product_id, '_klsd_tour_duration', true);
    $group_size = get_post_meta($product_id, '_klsd_tour_group_size', true);
    $location = get_post_meta($product_id, '_klsd_tour_location', true);
    $highlights = get_post_meta($product_id, '_klsd_tour_highlights', true);
    $included = get_post_meta($product_id, '_klsd_included_items', true);
    
    // Display in a beautiful format
    ?>
    <div class="christ-statue-tour-section">
        <div class="tour-hero">
            <div class="tour-stats">
                <?php if ($duration): ?>
                <div class="stat-item">
                    <span class="icon">🕐</span>
                    <span class="value"><?php echo esc_html($duration); ?></span>
                </div>
                <?php endif; ?>
                
                <?php if ($group_size): ?>
                <div class="stat-item">
                    <span class="icon">👥</span>
                    <span class="value"><?php echo esc_html($group_size); ?></span>
                </div>
                <?php endif; ?>
                
                <?php if ($location): ?>
                <div class="stat-item">
                    <span class="icon">📍</span>
                    <span class="value"><?php echo esc_html($location); ?></span>
                </div>
                <?php endif; ?>
            </div>
        </div>
        
        <?php if ($highlights && is_array($highlights)): ?>
        <div class="tour-highlights">
            <h4>🌟 Tour Highlights</h4>
            <ul>
                <?php foreach ($highlights as $highlight): ?>
                <li><?php echo esc_html($highlight); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <?php endif; ?>
        
        <?php if ($included && is_array($included)): ?>
        <div class="tour-included">
            <h4>✅ What's Included</h4>
            <ul>
                <?php foreach ($included as $item): ?>
                <li><?php echo esc_html($item); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <?php endif; ?>
    </div>
    
    <style>
    .christ-statue-tour-section {
        background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%);
        color: white;
        padding: 30px;
        border-radius: 15px;
        margin: 20px 0;
    }
    .tour-stats {
        display: flex;
        gap: 20px;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }
    .stat-item {
        background: rgba(255,255,255,0.15);
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
    }
    .tour-highlights, .tour-included {
        margin: 20px 0;
    }
    .tour-highlights ul, .tour-included ul {
        list-style: none;
        padding: 0;
        display: grid;
        gap: 8px;
    }
    .tour-highlights li, .tour-included li {
        background: rgba(255,255,255,0.1);
        padding: 12px 15px;
        border-radius: 8px;
        position: relative;
        padding-left: 35px;
    }
    .tour-highlights li:before {
        content: "✓";
        position: absolute;
        left: 12px;
        color: #10b981;
        font-weight: bold;
    }
    .tour-included li:before {
        content: "•";
        position: absolute;
        left: 15px;
        color: #f59e0b;
        font-weight: bold;
    }
    </style>
    <?php
}
?>
