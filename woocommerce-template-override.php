<?php
// Create: your-theme/woocommerce/single-product/product-summary.php
// This overrides the default WooCommerce product summary

defined('ABSPATH') || exit;

global $product;
?>

<div class="summary entry-summary">
    <?php
    // Standard WooCommerce hooks
    do_action('woocommerce_single_product_summary');
    
    // Your custom tour fields section
    if (has_term('tours', 'product_cat', $product->get_id())) {
        display_custom_tour_section($product->get_id());
    }
    ?>
</div>

<?php
function display_custom_tour_section($product_id) {
    ?>
    <div class="tour-details-section">
        <h3>Tour Information</h3>
        
        <div class="tour-grid">
            <?php
            $fields = [
                '_klsd_tour_duration' => ['label' => 'Duration', 'icon' => '🕐'],
                '_klsd_tour_group_size' => ['label' => 'Group Size', 'icon' => '👥'],
                '_klsd_tour_location' => ['label' => 'Location', 'icon' => '📍'],
                '_klsd_tour_difficulty' => ['label' => 'Difficulty', 'icon' => '⚡'],
            ];
            
            foreach ($fields as $meta_key => $field) {
                $value = get_post_meta($product_id, $meta_key, true);
                if ($value) {
                    echo '<div class="tour-detail-item">';
                    echo '<span class="icon">' . $field['icon'] . '</span>';
                    echo '<span class="label">' . $field['label'] . ':</span>';
                    echo '<span class="value">' . esc_html($value) . '</span>';
                    echo '</div>';
                }
            }
            ?>
        </div>
        
        <?php
        // Tour highlights
        $highlights = get_post_meta($product_id, '_klsd_tour_highlights', true);
        if ($highlights && is_array($highlights)) {
            echo '<div class="tour-highlights">';
            echo '<h4>Tour Highlights</h4>';
            echo '<ul>';
            foreach ($highlights as $highlight) {
                echo '<li>' . esc_html($highlight) . '</li>';
            }
            echo '</ul>';
            echo '</div>';
        }
        ?>
    </div>
    
    <style>
    .tour-details-section {
        background: linear-gradient(135deg, #1e3a8a, #0f766e);
        color: white;
        padding: 30px;
        border-radius: 12px;
        margin: 20px 0;
    }
    .tour-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }
    .tour-detail-item {
        background: rgba(255,255,255,0.1);
        padding: 15px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .tour-highlights ul {
        list-style: none;
        padding: 0;
    }
    .tour-highlights li {
        background: rgba(255,255,255,0.1);
        padding: 10px;
        margin: 8px 0;
        border-radius: 6px;
    }
    .tour-highlights li:before {
        content: "✓";
        color: #10b981;
        margin-right: 10px;
        font-weight: bold;
    }
    </style>
    <?php
}
?>
