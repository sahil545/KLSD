# KLSD WooCommerce Template Manager Plugin

## 📁 **What You'll Find in Your Download**

When you download this project, you'll find:

- `klsd-woocommerce-templates.php` - The complete WordPress plugin file

## 🚀 **Installation Instructions**

### Method 1: Direct Upload (Recommended)

1. **Download the project** and locate `klsd-woocommerce-templates.php`
2. **Login to your WordPress admin** panel
3. **Go to Plugins → Add New → Upload Plugin**
4. **Upload the PHP file** directly (WordPress will accept single PHP files as plugins)
5. **Activate the plugin**

### Method 2: FTP Installation

1. **Download the project** and locate `klsd-woocommerce-templates.php`
2. **Create a folder** named `klsd-woocommerce-templates` on your computer
3. **Move the PHP file** into this folder
4. **Upload the entire folder** to `/wp-content/plugins/` via FTP
5. **Activate the plugin** in WordPress admin

## ✅ **Verification Steps**

After installation:

1. **Check WooCommerce is active** (required)
2. **Edit any WooCommerce product**
3. **Look for these new sections:**
   - 🎨 **Template Assignment** - Shows which template is assigned
   - 📝 **Template Custom Fields** - Category-specific forms

## 🎯 **How It Works**

### Automatic Template Assignment

- **Tours & Trips categories** → Christ Statue Tour Template (`/christ-statue-tour`)
- **Scuba Gear categories** → Scuba Gear Template (`/product-template-1a`)
- **Certification categories** → Certification Template (`/certification-template`)

### Category Detection

The plugin automatically detects these category patterns:

**Tours & Trips:**

- tours, trips, snorkeling, diving
- all-tours-trips, all-tours-and-trips

**Scuba Gear:**

- scuba-gear, diving-gear, equipment, gear, accessories

**Certification:**

- certification, certifications, courses, training, padi, certification-courses

## 📝 **Custom Fields Created**

### Tours & Trips Fields

- Tour Duration, Group Size, Location
- Difficulty Level, Gear Included
- Rating, Reviews, Meeting Point
- Included Items, Tour Highlights

### Scuba Gear Fields

- Brand, Model, Colors, Sizes
- Material, Skill Level, Warranty
- Key Features, Shipping Info, Service Available

### Certification Fields

- Agency, Course Level, Duration
- Number of Dives, Max Depth, Age Minimum
- Prerequisites, Course Includes
- Skills Learned, After Certification

## 🔧 **Using the Data**

All custom fields are saved with the `_klsd_` prefix and can be accessed in your templates:

```php
// Get tour duration
$duration = get_post_meta($product_id, '_klsd_tour_duration', true);

// Get gear brand
$brand = get_post_meta($product_id, '_klsd_gear_brand', true);

// Get certification agency
$agency = get_post_meta($product_id, '_klsd_cert_agency', true);
```

## 🆘 **Troubleshooting**

**Plugin not visible?**

- Ensure WooCommerce is installed and active
- Check that the PHP file was uploaded correctly

**No custom fields showing?**

- Add your product to the appropriate categories
- Click "Configure Template Fields" button

**Fields not saving?**

- Ensure you have proper WordPress permissions
- Check that WooCommerce is functioning properly

## 📋 **Requirements**

- WordPress 5.0+
- WooCommerce 3.0+
- PHP 7.4+

## 🎉 **Success!**

Once installed, your WooCommerce products will automatically get professional custom fields based on their categories, making it easy to create rich, template-driven product pages!
