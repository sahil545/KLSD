<?php
/**
 * OPTION 1: Complete WordPress Template Implementation
 * 
 * This file shows EXACTLY what your product page would look like
 * with Option 1 - Pure WordPress solution
 * 
 * Place this in: your-theme/woocommerce/single-product/christ-statue-tour-template.php
 */

// Prevent direct access
defined('ABSPATH') || exit;

global $product;
$product_id = $product->get_id();

// Get all your existing custom fields (that you already have in WordPress)
$duration = get_post_meta($product_id, '_klsd_tour_duration', true) ?: '4 Hours';
$group_size = get_post_meta($product_id, '_klsd_tour_group_size', true) ?: '25 Max';
$location = get_post_meta($product_id, '_klsd_tour_location', true) ?: 'Key Largo';
$difficulty = get_post_meta($product_id, '_klsd_tour_difficulty', true) ?: 'All Levels';
$gear_included = get_post_meta($product_id, '_klsd_tour_gear_included', true) === '1';
$rating = get_post_meta($product_id, '_klsd_tour_rating', true) ?: '4.9';
$reviews = get_post_meta($product_id, '_klsd_tour_reviews', true) ?: '487';
$highlights = get_post_meta($product_id, '_klsd_tour_highlights', true);
$included_items = get_post_meta($product_id, '_klsd_included_items', true);

// Convert highlights to array if it's a string
if (is_string($highlights)) {
    $highlights = array_filter(explode("\n", $highlights));
}
if (is_string($included_items)) {
    $included_items = array_filter(explode("\n", $included_items));
}

// Fallback data if custom fields are empty
$default_highlights = [
    'Famous 9-foot bronze Christ statue in crystal-clear water',
    'All snorkeling equipment included',
    'PADI certified guides',
    'Small group experience'
];

$default_included = [
    'Professional snorkeling equipment',
    'PADI certified dive guide',
    'John Pennekamp park entrance',
    'Marine life identification guide',
    'Safety equipment & briefing',
    'Free parking'
];

$display_highlights = !empty($highlights) ? $highlights : $default_highlights;
$display_included = !empty($included_items) ? $included_items : $default_included;
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo esc_html($product->get_name()); ?> - <?php bloginfo('name'); ?></title>
    
    <!-- EXACTLY the same styling as your Next.js version -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <style>
        /* Custom animations and effects */
        .hero-gradient {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%);
        }
        .stat-card {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .highlight-item {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
        }
        .pulse-booking {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
            100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
    </style>
</head>
<body>

<!-- HERO SECTION - EXACTLY like your Next.js design -->
<section class="hero-gradient relative text-white overflow-hidden min-h-screen">
    <!-- Background Image -->
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60" 
         style="background-image: url('<?php echo esc_url($product->get_image_url('full')); ?>');">
    </div>
    
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black/40"></div>
    
    <!-- Navigation -->
    <nav class="relative z-10 container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
            <div class="text-2xl font-bold">Key Largo Scuba Diving</div>
            <div class="hidden md:flex space-x-6">
                <a href="#" class="hover:text-orange-400">Certification</a>
                <a href="#" class="hover:text-orange-400">Dive Sites</a>
                <a href="#" class="hover:text-orange-400">Scuba Gear</a>
                <a href="#" class="hover:text-orange-400">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero Content -->
    <div class="relative z-10 container mx-auto px-4 pt-12 pb-12">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Left Column - Content -->
            <div>
                <!-- Breadcrumb -->
                <nav class="text-sm text-white/70 mb-4">
                    <span>Tours</span> / <span class="text-white"><?php echo esc_html($product->get_name()); ?></span>
                </nav>

                <!-- Trust Badges -->
                <div class="flex flex-wrap gap-2 mb-6">
                    <span class="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-sm">
                        ⭐ Best of Florida Keys
                    </span>
                    <span class="bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full text-sm">
                        🏆 #1 Rated Tour
                    </span>
                    <span class="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full text-sm">
                        ✓ No Booking Fees
                    </span>
                </div>

                <!-- Main Headline -->
                <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                    <?php echo esc_html($product->get_name()); ?>
                </h1>

                <!-- Star Rating -->
                <div class="flex items-center gap-3 mb-6">
                    <div class="flex gap-1">
                        <?php for ($i = 0; $i < 5; $i++): ?>
                            <i class="fas fa-star text-yellow-400"></i>
                        <?php endfor; ?>
                    </div>
                    <span class="text-white/90"><?php echo esc_html($rating); ?>/5</span>
                    <span class="text-white/70">(<?php echo esc_html($reviews); ?> reviews)</span>
                </div>

                <!-- Quick Info Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div class="stat-card text-center rounded-lg p-3">
                        <i class="fas fa-clock text-orange-400 text-xl mb-2"></i>
                        <div class="text-sm text-white/90">Duration</div>
                        <div class="font-semibold"><?php echo esc_html($duration); ?></div>
                    </div>
                    <div class="stat-card text-center rounded-lg p-3">
                        <i class="fas fa-users text-orange-400 text-xl mb-2"></i>
                        <div class="text-sm text-white/90">Group Size</div>
                        <div class="font-semibold"><?php echo esc_html($group_size); ?></div>
                    </div>
                    <div class="stat-card text-center rounded-lg p-3">
                        <i class="fas fa-map-marker-alt text-orange-400 text-xl mb-2"></i>
                        <div class="text-sm text-white/90">Location</div>
                        <div class="font-semibold"><?php echo esc_html($location); ?></div>
                    </div>
                    <div class="stat-card text-center rounded-lg p-3">
                        <i class="fas fa-shield-alt text-orange-400 text-xl mb-2"></i>
                        <div class="text-sm text-white/90">Gear</div>
                        <div class="font-semibold"><?php echo $gear_included ? 'Included' : 'Not Included'; ?></div>
                    </div>
                </div>

                <!-- Key Selling Points -->
                <div class="space-y-3 mb-8">
                    <?php foreach ($display_highlights as $highlight): ?>
                    <div class="flex items-center gap-3">
                        <i class="fas fa-check-circle text-orange-400 flex-shrink-0"></i>
                        <span class="text-white/90"><?php echo esc_html($highlight); ?></span>
                    </div>
                    <?php endforeach; ?>
                </div>

                <!-- Urgency Message -->
                <div class="mb-6 text-sm space-y-1">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-exclamation-circle text-orange-300"></i>
                        <span class="font-semibold text-white">Trips Sell Out</span>
                    </div>
                    <div class="text-white/80 ml-6">Book in advance to secure your spots</div>
                    <div class="text-green-300 ml-6">✓ Easy Cancellation & Reschedule</div>
                </div>

                <!-- CTA Button -->
                <button onclick="scrollToBooking()" 
                        class="pulse-booking bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg transition-all duration-300">
                    Book Your Adventure Now
                    <i class="fas fa-arrow-down ml-2"></i>
                </button>
            </div>

            <!-- Right Column - Booking Form -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 class="text-2xl font-bold mb-4">Book Your Experience</h3>
                <p class="text-white/80 mb-6">Starting at <?php echo $product->get_price_html(); ?> per person • Free cancellation up to 24 hours</p>
                
                <!-- This is where your WooCommerce booking form would go -->
                <?php woocommerce_template_single_add_to_cart(); ?>
            </div>
        </div>
    </div>
</section>

<!-- WHAT'S INCLUDED SECTION -->
<section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What's Included</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($display_included as $item): ?>
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <i class="fas fa-check text-green-500 mb-3 text-xl"></i>
                <p class="text-gray-700"><?php echo esc_html($item); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- TOUR TIMELINE SECTION -->
<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Your 4-Hour Journey</h2>
        <div class="max-w-4xl mx-auto">
            <div class="space-y-8">
                <div class="flex items-start gap-6">
                    <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">1</div>
                    <div>
                        <h4 class="text-xl font-bold">Welcome & Preparation</h4>
                        <p class="text-gray-600 mb-2">8:00 AM - 30 minutes</p>
                        <p>Meet our team at John Pennekamp State Park for equipment fitting and comprehensive safety briefing.</p>
                    </div>
                </div>
                <div class="flex items-start gap-6">
                    <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">2</div>
                    <div>
                        <h4 class="text-xl font-bold">Boat Journey</h4>
                        <p class="text-gray-600 mb-2">8:30 AM - 45 minutes</p>
                        <p>Scenic boat ride to the Christ of the Abyss statue site with marine life spotting along the way.</p>
                    </div>
                </div>
                <div class="flex items-start gap-6">
                    <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">3</div>
                    <div>
                        <h4 class="text-xl font-bold">Snorkeling Experience</h4>
                        <p class="text-gray-600 mb-2">9:15 AM - 2 hours</p>
                        <p>Explore the famous 9-foot bronze Christ statue and surrounding coral reef ecosystem.</p>
                    </div>
                </div>
                <div class="flex items-start gap-6">
                    <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">4</div>
                    <div>
                        <h4 class="text-xl font-bold">Return Journey</h4>
                        <p class="text-gray-600 mb-2">11:15 AM - 45 minutes</p>
                        <p>Relaxing return to shore with refreshments and photo sharing.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- BOOKING SECTION -->
<section id="booking-section" class="py-16 hero-gradient">
    <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 class="text-3xl font-bold text-white text-center mb-8">Ready to Book?</h3>
            
            <!-- Full WooCommerce booking integration goes here -->
            <div class="bg-white rounded-xl p-6">
                <?php 
                // This integrates with your existing WooCommerce setup
                woocommerce_template_single_add_to_cart(); 
                ?>
            </div>
        </div>
    </div>
</section>

<script>
function scrollToBooking() {
    document.getElementById('booking-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}
</script>

<?php wp_footer(); ?>
</body>
</html>
