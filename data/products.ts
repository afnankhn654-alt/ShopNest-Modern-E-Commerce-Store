import { Product } from '../types';

const originalProducts: Product[] = [
    {
        "id": "prod-0001",
        "title": "NeoSound Wireless Earbuds",
        "short_description": "Compact true-wireless earbuds with active noise cancellation and 30-hour battery life.",
        "long_description": "NeoSound Wireless Earbuds deliver immersive audio with active noise cancellation, touch controls, and a charging case that provides up to 30 hours of combined playback. Comfortable fit, IPX4 water resistance, and fast charging make them ideal for daily commutes and workouts.",
        "category": "Electronics",
        "subcategory": "Audio",
        "brand": "NeoSound",
        "price": 79.99,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 79.99,
        "stock_qty": 420,
        "sku": "NS-EARBUDS-01",
        "tags": ["wireless", "earbuds", "ANC", "bluetooth", "portable"],
        "rating": 4.5,
        "reviews_count": 128,
        "created_at": "2024-07-15T10:15:00Z",
        "is_trending": true,
        "popularity_score": 88,
        "sales_7d": 150,
        "views_7d": 2500,
        "add_to_cart_7d": 300,
        "variants": [
            { "variant_id": "v-prod-0001-1", "options": { "color": "Black" }, "price": 79.99, "stock_qty": 250, "sku": "NS-EARBUDS-01-BLK" },
            { "variant_id": "v-prod-0001-2", "options": { "color": "White" }, "price": 79.99, "stock_qty": 170, "sku": "NS-EARBUDS-01-WHT" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2000", "alt_text": "Close-up of NeoSound black wireless earbuds in charging case" },
            { "image_url": "https://images.unsplash.com/photo-1572569028738-411a68c4637c?q=80&w=2000", "alt_text": "Man wearing wireless earbuds looking focused" },
            { "image_url": "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2000", "alt_text": "Product layout of earbuds with case and accessories" },
            { "image_url": "https://images.unsplash.com/photo-1629367494173-c78a56567877?q=80&w=2000", "alt_text": "Lifestyle shot of earbuds on a wooden table near coffee" }
        ]
    },
    {
        "id": "prod-0002",
        "title": "Luma Cozy Throw Blanket",
        "short_description": "Ultra-soft microfiber throw blanket, lightweight and machine washable.",
        "long_description": "The Luma Cozy Throw Blanket is crafted from premium microfiber for an ultra-soft feel and excellent warmth without bulk. Perfect for living rooms and bedrooms; machine washable for easy care and available in multiple colors.",
        "category": "Home & Living",
        "subcategory": "Bedding",
        "brand": "LumaHome",
        "price": 29.50,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 29.50,
        "stock_qty": 980,
        "sku": "LH-THROW-01",
        "tags": ["home", "blanket", "cozy", "microfiber", "washable"],
        "rating": 4.3,
        "reviews_count": 64,
        "created_at": "2024-05-15T08:30:00Z",
        "is_trending": false,
        "popularity_score": 62,
        "sales_7d": 30,
        "views_7d": 800,
        "add_to_cart_7d": 50,
        "variants": [
            { "variant_id": "v-prod-0002-1", "options": { "color": "Gray" }, "price": 29.50, "stock_qty": 300, "sku": "LH-THROW-01-GR" },
            { "variant_id": "v-prod-0002-2", "options": { "color": "Beige" }, "price": 29.50, "stock_qty": 350, "sku": "LH-THROW-01-BE" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1580301762395-9c6496707e97?q=80&w=2000", "alt_text": "Cozy bedroom setting with Luma throw blanket" },
            { "image_url": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000", "alt_text": "Close-up texture of the soft microfiber material" },
            { "image_url": "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2000", "alt_text": "Neatly folded blankets in a stack" },
            { "image_url": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000", "alt_text": "Blanket draped over a modern sofa" }
        ]
    },
    {
        "id": "prod-0003",
        "title": "FlexRun Men’s Running Shoes",
        "short_description": "Lightweight breathable running shoes with responsive cushioning for daily runs.",
        "long_description": "FlexRun running shoes combine a breathable mesh upper with responsive midsole cushioning and a durable outsole for excellent traction. Engineered for comfort on long runs and daily training, available in multiple sizes and colorways.",
        "category": "Fashion",
        "subcategory": "Footwear",
        "brand": "FlexRun",
        "price": 64.00,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 64.00,
        "stock_qty": 540,
        "sku": "FR-SHOE-02",
        "tags": ["running", "shoes", "athletic", "breathable", "training"],
        "rating": 4.6,
        "reviews_count": 220,
        "created_at": "2024-07-05T12:00:00Z",
        "is_trending": true,
        "popularity_score": 92,
        "sales_7d": 210,
        "views_7d": 3200,
        "add_to_cart_7d": 450,
        "variants": [
            { "variant_id": "v-prod-0003-1", "options": { "size": "9", "color": "Blue" }, "price": 64.00, "stock_qty": 120, "sku": "FR-SHOE-02-9-BL" },
            { "variant_id": "v-prod-0003-2", "options": { "size": "10", "color": "Black" }, "price": 64.00, "stock_qty": 140, "sku": "FR-SHOE-02-10-BK" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000", "alt_text": "Side profile of FlexRun running shoe" },
            { "image_url": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2000", "alt_text": "Black variant of the shoe on concrete" },
            { "image_url": "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000", "alt_text": "Runner tying laces before a jog" },
            { "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2000", "alt_text": "Detailed product shot of the shoe sole and mesh" }
        ]
    },
    {
        "id": "prod-0004",
        "title": "GlowCare Vitamin C Serum",
        "short_description": "Lightweight Vitamin C serum for brighter skin and antioxidant protection.",
        "long_description": "GlowCare Vitamin C Serum helps improve skin tone and texture while providing antioxidant protection. Fast-absorbing formula suitable for morning and night routines; dermatologically tested and fragrance-free.",
        "category": "Beauty",
        "subcategory": "Skincare",
        "brand": "GlowCare",
        "price": 24.99,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 24.99,
        "stock_qty": 650,
        "sku": "GC-SERUM-01",
        "tags": ["skincare", "vitamin-c", "serum", "brightening", "antioxidant"],
        "rating": 4.2,
        "reviews_count": 89,
        "created_at": "2024-06-05T09:00:00Z",
        "is_trending": false,
        "popularity_score": 70,
        "sales_7d": 80,
        "views_7d": 1200,
        "add_to_cart_7d": 150,
        "variants": [
            { "variant_id": "v-prod-0004-1", "options": { "size": "30ml" }, "price": 24.99, "stock_qty": 650, "sku": "GC-SERUM-01-30" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1620916566398-39f168a27e43?q=80&w=2000", "alt_text": "Amber glass bottle of Vitamin C serum" },
            { "image_url": "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2000", "alt_text": "Close up of serum dropper with liquid" },
            { "image_url": "https://images.unsplash.com/photo-1576426863848-c2185fc6e936?q=80&w=2000", "alt_text": "Texture shot of serum on a surface" },
            { "image_url": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2000", "alt_text": "Woman applying skincare product in mirror" }
        ]
    },
    {
        "id": "prod-0005",
        "title": "PixiLite Smart LED Desk Lamp",
        "short_description": "Adjustable smart desk lamp with touch controls and color temperature settings.",
        "long_description": "PixiLite Smart LED Desk Lamp features adjustable arms, touch dimming, and color temperature selection (warm to cool). Integrates with voice assistants and includes a built-in USB charging port—ideal for home offices and study desks.",
        "category": "Gadgets",
        "subcategory": "Lighting",
        "brand": "PixiLite",
        "price": 49.00,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 49.00,
        "stock_qty": 320,
        "sku": "PL-LAMP-01",
        "tags": ["lamp", "smart", "led", "desk", "office"],
        "rating": 4.4,
        "reviews_count": 47,
        "created_at": "2024-07-01T16:20:00Z",
        "is_trending": true,
        "popularity_score": 85,
        "sales_7d": 95,
        "views_7d": 1800,
        "add_to_cart_7d": 200,
        "variants": [
            { "variant_id": "v-prod-0005-1", "options": { "color": "Black" }, "price": 49.00, "stock_qty": 180, "sku": "PL-LAMP-01-BK" },
            { "variant_id": "v-prod-0005-2", "options": { "color": "White" }, "price": 49.00, "stock_qty": 140, "sku": "PL-LAMP-01-WH" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2000", "alt_text": "PixiLite LED desk lamp on a wooden desk" },
            { "image_url": "https://images.unsplash.com/photo-1534073828943-f801091a7d58?q=80&w=2000", "alt_text": "Lamp illuminated in a dark room" },
            { "image_url": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000", "alt_text": "Modern workspace setup with the lamp" },
            { "image_url": "https://images.unsplash.com/photo-1565538420870-da587c10b839?q=80&w=2000", "alt_text": "Reading book under the lamp light" }
        ]
    },
    {
        "id": "prod-0006",
        "title": "Aura Yoga Mat",
        "short_description": "Eco-friendly, non-slip yoga mat with alignment markers.",
        "long_description": "The Aura Yoga Mat provides a stable, non-slip surface for your practice. Made from eco-friendly materials, it's lightweight yet durable. Features alignment markers to help guide your poses. Includes a carrying strap for easy transport.",
        "category": "Sports",
        "subcategory": "Yoga",
        "brand": "AuraFit",
        "price": 39.99,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 39.99,
        "stock_qty": 750,
        "sku": "AF-YOGA-01",
        "tags": ["yoga", "fitness", "mat", "eco-friendly", "non-slip"],
        "rating": 4.8,
        "reviews_count": 312,
        "created_at": "2024-03-20T11:00:00Z",
        "is_trending": false,
        "popularity_score": 78,
        "sales_7d": 110,
        "views_7d": 950,
        "add_to_cart_7d": 180,
        "variants": [
            { "variant_id": "v-prod-0006-1", "options": { "color": "Teal" }, "price": 39.99, "stock_qty": 400, "sku": "AF-YOGA-01-TEAL" },
            { "variant_id": "v-prod-0006-2", "options": { "color": "Purple" }, "price": 39.99, "stock_qty": 350, "sku": "AF-YOGA-01-PUR" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2000", "alt_text": "Rolled up purple and teal yoga mats" },
            { "image_url": "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=2000", "alt_text": "Woman doing yoga pose on the mat" },
            { "image_url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2000", "alt_text": "Mat laid out in a sunny studio" },
            { "image_url": "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2000", "alt_text": "Meditation session on the Aura Mat" }
        ]
    },
    {
        "id": "prod-0007",
        "title": "Urban Explorer Backpack",
        "short_description": "Durable and water-resistant backpack with a dedicated laptop compartment.",
        "long_description": "The Urban Explorer Backpack is designed for daily commutes and weekend adventures. It features a spacious main compartment, a padded sleeve for a 15-inch laptop, and multiple pockets for organization. Made from water-resistant fabric to protect your gear.",
        "category": "Accessories",
        "subcategory": "Bags",
        "brand": "UrbanGear",
        "price": 89.95,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 89.95,
        "stock_qty": 280,
        "sku": "UG-BP-03",
        "tags": ["backpack", "laptop-bag", "travel", "durable", "water-resistant"],
        "rating": 4.7,
        "reviews_count": 198,
        "created_at": "2024-07-18T14:45:00Z",
        "is_trending": true,
        "popularity_score": 95,
        "sales_7d": 180,
        "views_7d": 2800,
        "add_to_cart_7d": 350,
        "variants": [
            { "variant_id": "v-prod-0007-1", "options": { "color": "Charcoal" }, "price": 89.95, "stock_qty": 150, "sku": "UG-BP-03-CHR" },
            { "variant_id": "v-prod-0007-2", "options": { "color": "Olive Green" }, "price": 89.95, "stock_qty": 130, "sku": "UG-BP-03-OLV" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1553062407-98eeb6e0e5c8?q=80&w=2000", "alt_text": "Urban Explorer backpack isolated on white" },
            { "image_url": "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=2000", "alt_text": "Traveler wearing backpack in city station" },
            { "image_url": "https://images.unsplash.com/photo-1622560480605-d83c85265c7b?q=80&w=2000", "alt_text": "Backpack resting on a park bench" },
            { "image_url": "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=2000", "alt_text": "Top down view of backpack content organization" }
        ]
    },
    {
        "id": "prod-0008",
        "title": "Organic Matcha Green Tea Powder",
        "short_description": "Ceremonial grade organic matcha powder for lattes, smoothies, and baking.",
        "long_description": "Sourced from the finest tea leaves in Japan, our ceremonial grade matcha is vibrant green and has a smooth, rich flavor. Perfect for traditional tea ceremonies, lattes, or as an ingredient in your favorite recipes. Packed with antioxidants for a healthy boost.",
        "category": "Health",
        "subcategory": "Groceries",
        "brand": "ZenLeaf",
        "price": 22.50,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 22.50,
        "stock_qty": 800,
        "sku": "ZL-MATCHA-01",
        "tags": ["matcha", "tea", "organic", "healthy", "superfood"],
        "rating": 4.9,
        "reviews_count": 450,
        "created_at": "2024-02-10T09:00:00Z",
        "is_trending": false,
        "popularity_score": 82,
        "sales_7d": 130,
        "views_7d": 1100,
        "add_to_cart_7d": 220,
        "variants": [
            { "variant_id": "v-prod-0008-1", "options": { "size": "30g" }, "price": 22.50, "stock_qty": 800, "sku": "ZL-MATCHA-01-30G" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?q=80&w=2000", "alt_text": "Wooden spoon with vibrant green matcha powder" },
            { "image_url": "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2000", "alt_text": "Iced matcha latte on a marble table" },
            { "image_url": "https://images.unsplash.com/photo-1504633273314-6a929fcdce44?q=80&w=2000", "alt_text": "Traditional matcha tea ceremony setup" },
            { "image_url": "https://images.unsplash.com/photo-1532336414008-360188981440?q=80&w=2000", "alt_text": "Bamboo whisk and matcha bowl" }
        ]
    },
    {
        "id": "prod-0009",
        "title": "AeroGlide 4K Drone",
        "short_description": "Foldable 4K drone with 3-axis gimbal, 30-min flight time, and advanced obstacle avoidance.",
        "long_description": "Capture stunning aerial footage with the AeroGlide 4K Drone. Its compact, foldable design makes it perfect for travel, while the 3-axis gimbal ensures silky-smooth video. With a 30-minute flight time and intelligent flight modes, it's the perfect drone for both beginners and seasoned pilots.",
        "category": "Gadgets",
        "subcategory": "Drones",
        "brand": "AeroGlide",
        "price": 499.00,
        "currency": "USD",
        "discount_pct": 10,
        "final_price": 449.10,
        "stock_qty": 150,
        "sku": "AG-DRONE-4K-01",
        "tags": ["drone", "4k", "camera", "aerial", "gadget"],
        "rating": 4.8,
        "reviews_count": 215,
        "created_at": "2024-07-20T10:00:00Z",
        "is_trending": true,
        "popularity_score": 96,
        "sales_7d": 180,
        "views_7d": 3500,
        "add_to_cart_7d": 400,
        "variants": [
            { "variant_id": "v-prod-0009-1", "options": { "color": "Graphite" }, "price": 449.10, "stock_qty": 150, "sku": "AG-DRONE-4K-01-GR" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2000", "alt_text": "Drone hovering in a sunset sky" },
            { "image_url": "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2000", "alt_text": "Person holding the drone controller" },
            { "image_url": "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2000", "alt_text": "Drone landed on a rock" },
            { "image_url": "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=2000", "alt_text": "Aerial view taken from the drone" }
        ]
    },
    {
        "id": "prod-0010",
        "title": "Dawn Patrol Organic Coffee Beans",
        "short_description": "Single-origin whole bean organic coffee with notes of chocolate and citrus.",
        "long_description": "Start your morning right with Dawn Patrol Organic Coffee. These single-origin beans are ethically sourced and roasted in small batches to preserve their unique flavor profile. Expect rich notes of dark chocolate, a hint of citrus, and a smooth finish. Perfect for pour-over, French press, or espresso.",
        "category": "Health",
        "subcategory": "Groceries",
        "brand": "Dawn Patrol",
        "price": 18.99,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 18.99,
        "stock_qty": 600,
        "sku": "DP-COFFEE-01",
        "tags": ["coffee", "organic", "whole-bean", "gourmet", "fair-trade"],
        "rating": 4.9,
        "reviews_count": 520,
        "created_at": "2024-01-15T08:00:00Z",
        "is_trending": false,
        "popularity_score": 88,
        "sales_7d": 150,
        "views_7d": 1300,
        "add_to_cart_7d": 250,
        "variants": [
            { "variant_id": "v-prod-0010-1", "options": { "size": "12oz" }, "price": 18.99, "stock_qty": 600, "sku": "DP-COFFEE-01-12OZ" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2000", "alt_text": "Heap of roasted coffee beans in a burlap sack" },
            { "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2000", "alt_text": "Barista pouring hot water over coffee grounds" },
            { "image_url": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000", "alt_text": "Close-up of espresso beans" },
            { "image_url": "https://images.unsplash.com/photo-1559525839-4f3424058190?q=80&w=2000", "alt_text": "Coffee packaging on a cafe table" }
        ]
    },
    {
        "id": "prod-0011",
        "title": "HydroVibe Smart Water Bottle",
        "short_description": "Stainless steel water bottle that tracks intake and glows to remind you to drink.",
        "long_description": "Meet your hydration goals with the HydroVibe Smart Water Bottle. This vacuum-insulated stainless steel bottle keeps drinks cold for 24 hours. It syncs with an app to track your water intake and features a glowing reminder to ensure you stay hydrated throughout the day. BPA-free and rechargeable via USB-C.",
        "category": "Gadgets",
        "subcategory": "Health Tech",
        "brand": "HydroVibe",
        "price": 59.95,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 59.95,
        "stock_qty": 380,
        "sku": "HV-BOTTLE-01",
        "tags": ["smart-bottle", "water", "hydration", "health", "tech"],
        "rating": 4.6,
        "reviews_count": 150,
        "created_at": "2024-06-25T14:00:00Z",
        "is_trending": true,
        "popularity_score": 90,
        "sales_7d": 120,
        "views_7d": 2100,
        "add_to_cart_7d": 280,
        "variants": [
            { "variant_id": "v-prod-0011-1", "options": { "color": "Obsidian" }, "price": 59.95, "stock_qty": 200, "sku": "HV-BOTTLE-01-OB" },
            { "variant_id": "v-prod-0011-2", "options": { "color": "Seafoam" }, "price": 59.95, "stock_qty": 180, "sku": "HV-BOTTLE-01-SF" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=2000", "alt_text": "Matte black smart water bottle" },
            { "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000", "alt_text": "Water bottle on gym floor" },
            { "image_url": "https://images.unsplash.com/photo-1523356296765-52033c46e090?q=80&w=2000", "alt_text": "Lifestyle shot of bottle in backpack side pocket" },
            { "image_url": "https://images.unsplash.com/photo-1610373928379-42838153e7c8?q=80&w=2000", "alt_text": "Close-up of bottle lid and smart sensor" }
        ]
    },
    {
        "id": "prod-0012",
        "title": "Kawa Chef's Knife",
        "short_description": "8-inch high-carbon stainless steel chef's knife for precision cutting.",
        "long_description": "The Kawa Chef's Knife is a masterpiece of Japanese craftsmanship. Forged from high-carbon VG-10 stainless steel, the 8-inch blade offers exceptional sharpness, edge retention, and durability. The ergonomic Pakkawood handle provides a comfortable and secure grip for effortless slicing, dicing, and chopping.",
        "category": "Home & Living",
        "subcategory": "Kitchenware",
        "brand": "Kawa",
        "price": 129.00,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 129.00,
        "stock_qty": 250,
        "sku": "KAWA-KNIFE-01",
        "tags": ["knife", "chef", "kitchen", "cooking", "steel"],
        "rating": 4.9,
        "reviews_count": 350,
        "created_at": "2024-04-10T11:30:00Z",
        "is_trending": false,
        "popularity_score": 93,
        "sales_7d": 80,
        "views_7d": 1500,
        "add_to_cart_7d": 190,
        "variants": [
            { "variant_id": "v-prod-0012-1", "options": { "size": "8-inch" }, "price": 129.00, "stock_qty": 250, "sku": "KAWA-KNIFE-01-8" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=2000", "alt_text": "Chef's knife on a magnetic strip" },
            { "image_url": "https://images.unsplash.com/photo-1589993334800-20e98322c332?q=80&w=2000", "alt_text": "Slicing fresh vegetables on cutting board" },
            { "image_url": "https://images.unsplash.com/photo-1590732386121-654bd47b9736?q=80&w=2000", "alt_text": "Handle detail of the Kawa knife" },
            { "image_url": "https://images.unsplash.com/photo-1614949030048-c70a8d6f8f6e?q=80&w=2000", "alt_text": "Studio shot of the damascus steel blade" }
        ]
    },
     {
        "id": "prod-0013",
        "title": "Serenity Scented Candle Set",
        "short_description": "Set of three soy wax candles in Lavender, Sandalwood, and Eucalyptus scents.",
        "long_description": "Create a tranquil atmosphere with the Serenity Scented Candle Set. This collection includes three hand-poured soy wax candles in calming scents: Lavender, Sandalwood, and Eucalyptus. Each candle offers a clean, long-lasting burn of up to 40 hours. Perfect for relaxation, meditation, or as a thoughtful gift.",
        "category": "Home & Living",
        "subcategory": "Decor",
        "brand": "Serenity",
        "price": 34.99,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 34.99,
        "stock_qty": 850,
        "sku": "SER-CANDLE-SET-01",
        "tags": ["candle", "scented", "soy-wax", "home-decor", "relaxation"],
        "rating": 4.7,
        "reviews_count": 180,
        "created_at": "2024-05-22T18:00:00Z",
        "is_trending": false,
        "popularity_score": 80,
        "sales_7d": 100,
        "views_7d": 1100,
        "add_to_cart_7d": 190,
        "variants": [
            { "variant_id": "v-prod-0013-1", "options": { "set": "Calm" }, "price": 34.99, "stock_qty": 850, "sku": "SER-CANDLE-SET-01-CALM" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=2000", "alt_text": "Amber jar candle with flame" },
            { "image_url": "https://images.unsplash.com/photo-1570823336440-6207038446b5?q=80&w=2000", "alt_text": "Candle burning on a bedside table" },
            { "image_url": "https://images.unsplash.com/photo-1602170305825-96860f380721?q=80&w=2000", "alt_text": "Cozy reading nook with candles" },
            { "image_url": "https://images.unsplash.com/photo-1572295624792-51928375f49c?q=80&w=2000", "alt_text": "Set of candles arranged on a tray" }
        ]
    },
    {
        "id": "prod-0014",
        "title": "ErgoFlow Office Chair",
        "short_description": "Ergonomic mesh office chair with lumbar support, adjustable armrests, and headrest.",
        "long_description": "Upgrade your workspace with the ErgoFlow Office Chair. Designed for all-day comfort, it features a breathable mesh back, adjustable lumbar support, and 4D armrests. The synchronized tilt mechanism and adjustable headrest provide personalized support to reduce strain and improve posture during long work sessions.",
        "category": "Home & Living",
        "subcategory": "Furniture",
        "brand": "ErgoFlow",
        "price": 279.00,
        "currency": "USD",
        "discount_pct": 15,
        "final_price": 237.15,
        "stock_qty": 200,
        "sku": "EF-CHAIR-01",
        "tags": ["office-chair", "ergonomic", "furniture", "comfort", "lumbar-support"],
        "rating": 4.6,
        "reviews_count": 240,
        "created_at": "2024-07-10T09:45:00Z",
        "is_trending": true,
        "popularity_score": 94,
        "sales_7d": 90,
        "views_7d": 1900,
        "add_to_cart_7d": 180,
        "variants": [
            { "variant_id": "v-prod-0014-1", "options": { "color": "Black" }, "price": 237.15, "stock_qty": 120, "sku": "EF-CHAIR-01-BK" },
            { "variant_id": "v-prod-0014-2", "options": { "color": "Gray" }, "price": 237.15, "stock_qty": 80, "sku": "EF-CHAIR-01-GR" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2000", "alt_text": "Ergonomic office chair isolated" },
            { "image_url": "https://images.unsplash.com/photo-1589384267710-4a8d07f8b232?q=80&w=2000", "alt_text": "Modern home office setup with ErgoFlow chair" },
            { "image_url": "https://images.unsplash.com/photo-1611269154421-4e27c41eb443?q=80&w=2000", "alt_text": "Close-up of mesh backrest and lumbar support" },
            { "image_url": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000", "alt_text": "Wide shot of chair in a minimalist workspace" }
        ]
    },
    {
        "id": "prod-0015",
        "title": "TerraTrek Waterproof Hiking Boots",
        "short_description": "Durable, waterproof hiking boots with superior grip for all-terrain adventures.",
        "long_description": "Conquer any trail with the TerraTrek Hiking Boots. Featuring a waterproof yet breathable membrane, these boots keep your feet dry and comfortable in any weather. The high-traction rubber outsole provides excellent grip on rugged terrain, while the cushioned midsole and ankle support ensure stability on long hikes.",
        "category": "Fashion",
        "subcategory": "Footwear",
        "brand": "TerraTrek",
        "price": 139.99,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 139.99,
        "stock_qty": 450,
        "sku": "TT-BOOTS-01",
        "tags": ["hiking", "boots", "outdoor", "waterproof", "footwear"],
        "rating": 4.8,
        "reviews_count": 310,
        "created_at": "2024-03-05T12:00:00Z",
        "is_trending": false,
        "popularity_score": 89,
        "sales_7d": 110,
        "views_7d": 1600,
        "add_to_cart_7d": 200,
        "variants": [
            { "variant_id": "v-prod-0015-1", "options": { "size": "10", "color": "Brown" }, "price": 139.99, "stock_qty": 250, "sku": "TT-BOOTS-01-10-BRN" },
            { "variant_id": "v-prod-0015-2", "options": { "size": "9", "color": "Gray" }, "price": 139.99, "stock_qty": 200, "sku": "TT-BOOTS-01-9-GRY" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=2000", "alt_text": "Brown leather hiking boots on rocky terrain" },
            { "image_url": "https://images.unsplash.com/photo-1542840410-3092f48dfc11?q=80&w=2000", "alt_text": "Boots covered in mud after a hike" },
            { "image_url": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000", "alt_text": "Detail of the rugged outsole traction" },
            { "image_url": "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2000", "alt_text": "Hiker standing on a peak wearing the boots" }
        ]
    },
    {
        "id": "prod-0016",
        "title": "SoundWave Portable Bluetooth Speaker",
        "short_description": "Compact, waterproof Bluetooth speaker with 12-hour battery life and rich bass.",
        "long_description": "Take your music anywhere with the SoundWave Portable Speaker. This rugged, IPX7 waterproof speaker delivers surprisingly powerful sound and deep bass. With a 12-hour battery life and a durable fabric finish, it's the perfect companion for beach days, hikes, and parties.",
        "category": "Electronics",
        "subcategory": "Audio",
        "brand": "SoundWave",
        "price": 59.99,
        "currency": "USD",
        "discount_pct": 20,
        "final_price": 47.99,
        "stock_qty": 700,
        "sku": "SW-SPEAKER-01",
        "tags": ["speaker", "bluetooth", "portable", "waterproof", "audio"],
        "rating": 4.7,
        "reviews_count": 450,
        "created_at": "2024-07-22T15:30:00Z",
        "is_trending": true,
        "popularity_score": 91,
        "sales_7d": 250,
        "views_7d": 2900,
        "add_to_cart_7d": 420,
        "variants": [
            { "variant_id": "v-prod-0016-1", "options": { "color": "Black" }, "price": 47.99, "stock_qty": 400, "sku": "SW-SPEAKER-01-BLK" },
            { "variant_id": "v-prod-0016-2", "options": { "color": "Blue" }, "price": 47.99, "stock_qty": 300, "sku": "SW-SPEAKER-01-BLU" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2000", "alt_text": "Blue cylindrical bluetooth speaker" },
            { "image_url": "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=2000", "alt_text": "Black speaker on a white surface" },
            { "image_url": "https://images.unsplash.com/photo-1629828552726-1076b1f4133d?q=80&w=2000", "alt_text": "Speaker on sand at the beach" },
            { "image_url": "https://images.unsplash.com/photo-1543512214-318c77a799bf?q=80&w=2000", "alt_text": "Group of friends listening to music outdoors" }
        ]
    },
    {
        "id": "prod-0017",
        "title": "Nomad Leather Journal Set",
        "short_description": "Refillable A5 leather journal with a premium ballpoint pen.",
        "long_description": "Capture your thoughts, ideas, and sketches in the Nomad Leather Journal. Crafted from genuine top-grain leather, this A5 journal is both timeless and durable. It includes a smooth, lined paper insert that's refillable, along with a sleek metal ballpoint pen. An elastic closure keeps it securely fastened.",
        "category": "Accessories",
        "subcategory": "Stationery",
        "brand": "Nomad",
        "price": 45.00,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 45.00,
        "stock_qty": 320,
        "sku": "NOMAD-JRNL-01",
        "tags": ["journal", "leather", "notebook", "stationery", "writing"],
        "rating": 4.8,
        "reviews_count": 190,
        "created_at": "2024-04-01T10:10:00Z",
        "is_trending": false,
        "popularity_score": 75,
        "sales_7d": 60,
        "views_7d": 900,
        "add_to_cart_7d": 110,
        "variants": [
            { "variant_id": "v-prod-0017-1", "options": { "color": "Brown" }, "price": 45.00, "stock_qty": 320, "sku": "NOMAD-JRNL-01-BRN" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2000", "alt_text": "Rustic brown leather journal on wood table" },
            { "image_url": "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=2000", "alt_text": "Person writing notes in the journal" },
            { "image_url": "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2000", "alt_text": "Journal open showing lined paper" },
            { "image_url": "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2000", "alt_text": "Journal next to laptop and coffee" }
        ]
    },
    {
        "id": "prod-0018",
        "title": "PawsPerfect Grooming Kit",
        "short_description": "7-in-1 professional pet grooming kit with low-noise clippers.",
        "long_description": "Keep your furry friend looking their best with the PawsPerfect Grooming Kit. This all-in-one set includes low-noise electric clippers, multiple guide combs, stainless steel scissors, a nail clipper, a file, and a grooming brush. The clippers are quiet to reduce pet anxiety, rechargeable, and cordless for easy use.",
        "category": "Pet Supplies",
        "subcategory": "Grooming",
        "brand": "PawsPerfect",
        "price": 39.99,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 39.99,
        "stock_qty": 550,
        "sku": "PP-GROOM-KIT-01",
        "tags": ["pet", "dog", "grooming", "clippers", "cat"],
        "rating": 4.6,
        "reviews_count": 280,
        "created_at": "2024-06-12T13:00:00Z",
        "is_trending": true,
        "popularity_score": 85,
        "sales_7d": 130,
        "views_7d": 1400,
        "add_to_cart_7d": 210,
        "variants": [
            { "variant_id": "v-prod-0018-1", "options": { "kit": "7-in-1" }, "price": 39.99, "stock_qty": 550, "sku": "PP-GROOM-KIT-01-7IN1" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1585846416120-3a7354ed7d6d?q=80&w=2000", "alt_text": "Pet grooming tools laid out on table" },
            { "image_url": "https://images.unsplash.com/photo-1623366302587-bca8c1d67769?q=80&w=2000", "alt_text": "Professional clippers and scissors" },
            { "image_url": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2000", "alt_text": "Happy dog post-grooming" },
            { "image_url": "https://images.unsplash.com/photo-1598810239327-047a4687afc2?q=80&w=2000", "alt_text": "Dog getting groomed with clippers" }
        ]
    },
    {
        "id": "prod-0019",
        "title": "BlockBuilders Creative Set",
        "short_description": "500-piece creative building block set for endless imaginative play.",
        "long_description": "Unleash creativity with the BlockBuilders Creative Set. This 500-piece set features a wide variety of colorful blocks, wheels, windows, and figures to inspire hours of imaginative building. Made from durable, non-toxic plastic, these blocks are compatible with other major brands. Includes a storage bin for easy cleanup.",
        "category": "Toys & Games",
        "subcategory": "Building Toys",
        "brand": "BlockBuilders",
        "price": 29.99,
        "currency": "USD",
        "discount_pct": 0,
        "final_price": 29.99,
        "stock_qty": 1200,
        "sku": "BB-CREATE-500",
        "tags": ["toys", "blocks", "building", "kids", "creative"],
        "rating": 4.9,
        "reviews_count": 600,
        "created_at": "2024-07-01T11:00:00Z",
        "is_trending": true,
        "popularity_score": 87,
        "sales_7d": 200,
        "views_7d": 1800,
        "add_to_cart_7d": 350,
        "variants": [
            { "variant_id": "v-prod-0019-1", "options": { "pieces": "500" }, "price": 29.99, "stock_qty": 1200, "sku": "BB-CREATE-500-P" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2000", "alt_text": "Pile of colorful plastic building blocks" },
            { "image_url": "https://images.unsplash.com/photo-1560961911-ba7f06d6d23b?q=80&w=2000", "alt_text": "Child building a tower" },
            { "image_url": "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=2000", "alt_text": "Complex house structure made of blocks" },
            { "image_url": "https://images.unsplash.com/photo-1518688248740-75e240212009?q=80&w=2000", "alt_text": "Assorted brick sizes and colors" }
        ]
    },
    {
        "id": "prod-0020",
        "title": "SonicGlow Electric Toothbrush",
        "short_description": "Sonic electric toothbrush with 5 cleaning modes and a 2-minute smart timer.",
        "long_description": "Achieve a superior clean with the SonicGlow Electric Toothbrush. It uses powerful sonic vibrations (40,000 VPM) to remove up to 10x more plaque than a manual toothbrush. Choose from 5 modes (Clean, White, Polish, Gum Care, Sensitive) to customize your brushing. A single charge lasts up to 30 days. Includes 2 brush heads.",
        "category": "Beauty",
        "subcategory": "Oral Care",
        "brand": "SonicGlow",
        "price": 49.95,
        "currency": "USD",
        "discount_pct": 10,
        "final_price": 44.95,
        "stock_qty": 650,
        "sku": "SG-TOOTHBRUSH-01",
        "tags": ["toothbrush", "electric", "oral-care", "health", "sonic"],
        "rating": 4.7,
        "reviews_count": 320,
        "created_at": "2024-05-18T09:20:00Z",
        "is_trending": false,
        "popularity_score": 83,
        "sales_7d": 90,
        "views_7d": 1250,
        "add_to_cart_7d": 170,
        "variants": [
            { "variant_id": "v-prod-0020-1", "options": { "color": "White" }, "price": 44.95, "stock_qty": 350, "sku": "SG-TOOTHBRUSH-01-WHT" },
            { "variant_id": "v-prod-0020-2", "options": { "color": "Black" }, "price": 44.95, "stock_qty": 300, "sku": "SG-TOOTHBRUSH-01-BLK" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1559676169-a7d29ce6834e?q=80&w=2000", "alt_text": "Close-up of electric toothbrush head bristles" },
            { "image_url": "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2000", "alt_text": "Toothbrush on bathroom sink counter" },
            { "image_url": "https://images.unsplash.com/photo-1600171542381-8b388653b45a?q=80&w=2000", "alt_text": "White electric toothbrush on charging stand" },
            { "image_url": "https://images.unsplash.com/photo-1553556014-9279dc074503?q=80&w=2000", "alt_text": "Person holding toothbrush ready to brush" }
        ]
    },
    {
        "id": "prod-0021",
        "title": "ArcticFlex Winter Beanie & Scarf Set",
        "short_description": "Stay warm and stylish with this 2-in-1 fleece-lined knit beanie and neck warmer set.",
        "long_description": "Embrace the cold with the ArcticFlex Beanie & Scarf Set. This multi-functional combo is crafted from high-quality, pilling-resistant acrylic fabric and features a full, ultra-soft fleece lining for maximum warmth and wind protection. The versatile design allows you to wear it as a beanie, a neck warmer, or a full-face mask. Finished with a simple and fashionable leather and hardware logo accent, this unisex set is perfect for any occasion, from casual outings to business commutes.",
        "category": "Fashion",
        "subcategory": "Accessories",
        "brand": "ArcticFlex",
        "price": 24.99,
        "currency": "USD",
        "discount_pct": 20,
        "final_price": 19.99,
        "stock_qty": 950,
        "sku": "AF-WINTER-SET-01",
        "tags": ["winter", "beanie", "scarf", "unisex", "warm", "fleece", "hat"],
        "rating": 4.8,
        "reviews_count": 580,
        "created_at": "2024-10-15T11:00:00Z",
        "is_trending": true,
        "popularity_score": 95,
        "sales_7d": 350,
        "views_7d": 4500,
        "add_to_cart_7d": 600,
        "variants": [
            { "variant_id": "v-prod-0021-1", "options": { "color": "Black" }, "price": 19.99, "stock_qty": 300, "sku": "AF-SET-01-BLK" },
            { "variant_id": "v-prod-0021-2", "options": { "color": "Charcoal Gray" }, "price": 19.99, "stock_qty": 250, "sku": "AF-SET-01-GRY" },
            { "variant_id": "v-prod-0021-3", "options": { "color": "Light Gray" }, "price": 19.99, "stock_qty": 200, "sku": "AF-SET-01-LGR" },
            { "variant_id": "v-prod-0021-4", "options": { "color": "Navy Blue" }, "price": 19.99, "stock_qty": 200, "sku": "AF-SET-01-NAV" }
        ],
        "images": [
            { "image_url": "https://images.unsplash.com/photo-1610239327047a4687afc2?q=80&w=800", "alt_text": "Man wearing a charcoal gray beanie and neck warmer set" },
            { "image_url": "https://images.unsplash.com/photo-1641379983404-54b98c73c2a6?q=80&w=800", "alt_text": "Black knit beanie and scarf set displayed flat" },
            { "image_url": "https://images.unsplash.com/photo-1611352013349-b4b8d234f1e6?q=80&w=800", "alt_text": "Close-up of the thick fleece lining inside the beanie" },
            { "image_url": "https://images.unsplash.com/photo-1612422596495-92798f060822?q=80&w=800", "alt_text": "A navy blue beanie on a wooden surface" }
        ]
    }
];

// Product Definition Interface
interface ProductDef {
  name: string;
  cat: string;
  sub: string;
  brand: string;
  desc: string;
  imgKeyword: string;
}

// 1. $1-5 CATALOG (100 Items)
const CATALOG_1_5: ProductDef[] = [
    { name: "Gel Pen", cat: "Stationery", sub: "Writing", brand: "Scripto", desc: "Smooth writing gel pen with ergonomic grip.", imgKeyword: "pen" },
    { name: "Sticky Notes", cat: "Stationery", sub: "Paper", brand: "NoteMate", desc: "Bright and colorful sticky notes for reminders.", imgKeyword: "sticky notes" },
    { name: "Washi Tape", cat: "Stationery", sub: "Crafts", brand: "Crafty", desc: "Decorative adhesive tape for journaling.", imgKeyword: "washi tape" },
    { name: "Paper Clips", cat: "Stationery", sub: "Office", brand: "OfficePro", desc: "Durable metal paper clips in assorted colors.", imgKeyword: "paper clips" },
    { name: "Eraser", cat: "Stationery", sub: "Writing", brand: "EraseIt", desc: "Dust-free eraser for clean corrections.", imgKeyword: "eraser" },
    { name: "Ruler", cat: "Stationery", sub: "Tools", brand: "MeasureUp", desc: "Clear plastic 30cm ruler with metric markings.", imgKeyword: "ruler" },
    { name: "Pencil Case", cat: "Stationery", sub: "Storage", brand: "ZipLock", desc: "Canvas pencil case with sturdy zipper.", imgKeyword: "pencil case" },
    { name: "Notebook", cat: "Stationery", sub: "Paper", brand: "WriteOn", desc: "A6 pocket notebook with lined pages.", imgKeyword: "notebook" },
    { name: "Bookmark", cat: "Stationery", sub: "Accessories", brand: "ReadMore", desc: "Magnetic bookmark to keep your place.", imgKeyword: "bookmark" },
    { name: "Stapler", cat: "Stationery", sub: "Office", brand: "BindIt", desc: "Mini stapler with built-in remover.", imgKeyword: "stapler" },
    { name: "Scissors", cat: "Stationery", sub: "Tools", brand: "CutRight", desc: "Sharp stainless steel scissors for crafts.", imgKeyword: "scissors" },
    { name: "Glue Stick", cat: "Stationery", sub: "Crafts", brand: "StickFast", desc: "Non-toxic glue stick for paper.", imgKeyword: "glue stick" },
    { name: "Correction Tape", cat: "Stationery", sub: "Writing", brand: "FixIt", desc: "Instant dry correction tape.", imgKeyword: "correction tape" },
    { name: "Index Cards", cat: "Stationery", sub: "Study", brand: "StudyBuddy", desc: "Ruled index cards for flashcards and notes.", imgKeyword: "index cards" },
    { name: "Binder Clips", cat: "Stationery", sub: "Office", brand: "ClipTight", desc: "Assorted size binder clips.", imgKeyword: "binder clips" },
    { name: "Push Pins", cat: "Stationery", sub: "Office", brand: "PinPoint", desc: "Colorful push pins for cork boards.", imgKeyword: "push pins" },
    { name: "Magnets", cat: "Home & Living", sub: "Decor", brand: "StickOn", desc: "Strong decorative magnets.", imgKeyword: "magnets" },
    { name: "Keyring", cat: "Accessories", sub: "Gadgets", brand: "KeyKeep", desc: "Durable metal keyring with split ring.", imgKeyword: "keychain" },
    { name: "Lanyard", cat: "Accessories", sub: "Gadgets", brand: "HoldOn", desc: "Fabric lanyard with safety breakaway.", imgKeyword: "lanyard" },
    { name: "Badge Holder", cat: "Stationery", sub: "Office", brand: "IDSafe", desc: "Clear plastic ID card holder.", imgKeyword: "badge" },
    { name: "Whistle", cat: "Sports", sub: "Gear", brand: "LoudSound", desc: "Classic sports whistle with lanyard.", imgKeyword: "whistle" },
    { name: "Cable Tie", cat: "Electronics", sub: "Accessories", brand: "TidyTech", desc: "Reusable velcro cable ties.", imgKeyword: "cable tie" },
    { name: "Cord Organizer", cat: "Electronics", sub: "Accessories", brand: "CordKeeper", desc: "Adhesive cord clips for desk management.", imgKeyword: "cable management" },
    { name: "Phone Stand", cat: "Electronics", sub: "Accessories", brand: "ViewEasy", desc: "Foldable plastic phone stand.", imgKeyword: "phone stand" },
    { name: "Stylus", cat: "Electronics", sub: "Accessories", brand: "TouchPoint", desc: "Universal capacitive stylus pen.", imgKeyword: "stylus" },
    { name: "Screen Cloth", cat: "Electronics", sub: "Cleaning", brand: "CleanScreen", desc: "Microfiber cloth for screens and glasses.", imgKeyword: "microfiber cloth" },
    { name: "Earbud Case", cat: "Electronics", sub: "Accessories", brand: "PodGuard", desc: "Silicone case for wireless earbuds.", imgKeyword: "earbud case" },
    { name: "Battery Case", cat: "Electronics", sub: "Storage", brand: "PowerSafe", desc: "Plastic storage case for AA/AAA batteries.", imgKeyword: "battery" },
    { name: "Mini Torch", cat: "Gadgets", sub: "Tools", brand: "BrightLite", desc: "Compact LED keychain flashlight.", imgKeyword: "flashlight" },
    { name: "Tape Measure", cat: "Home & Living", sub: "Tools", brand: "MeasurePro", desc: "Retractable 1.5m sewing tape measure.", imgKeyword: "tape measure" },
    { name: "Screwdriver", cat: "Home & Living", sub: "Tools", brand: "FixAll", desc: "Mini pocket screwdriver set.", imgKeyword: "screwdriver" },
    { name: "Utility Knife", cat: "Home & Living", sub: "Tools", brand: "SharpEdge", desc: "Retractable box cutter.", imgKeyword: "box cutter" },
    { name: "Nail File", cat: "Beauty", sub: "Nails", brand: "SmoothNail", desc: "Professional grit nail file.", imgKeyword: "nail file" },
    { name: "Nail Clippers", cat: "Beauty", sub: "Nails", brand: "ClipClean", desc: "Stainless steel fingernail clippers.", imgKeyword: "nail clippers" },
    { name: "Tweezers", cat: "Beauty", sub: "Tools", brand: "PluckPerfect", desc: "Slant tip tweezers.", imgKeyword: "tweezers" },
    { name: "Comb", cat: "Beauty", sub: "Hair", brand: "StyleStrand", desc: "Fine tooth pocket comb.", imgKeyword: "comb" },
    { name: "Mirror", cat: "Beauty", sub: "Tools", brand: "ReflectMe", desc: "Compact travel mirror.", imgKeyword: "pocket mirror" },
    { name: "Hair Tie", cat: "Fashion", sub: "Accessories", brand: "HoldTight", desc: "No-snag hair elastics.", imgKeyword: "hair tie" },
    { name: "Scrunchie", cat: "Fashion", sub: "Accessories", brand: "SoftStyle", desc: "Velvet hair scrunchie.", imgKeyword: "scrunchie" },
    { name: "Headband", cat: "Fashion", sub: "Accessories", brand: "SweatBan", desc: "Sports headband.", imgKeyword: "headband" },
    { name: "Lip Balm", cat: "Beauty", sub: "Lip Care", brand: "SoftLips", desc: "Moisturizing lip balm stick.", imgKeyword: "lip balm" },
    { name: "Soap Bar", cat: "Beauty", sub: "Bath", brand: "PureWash", desc: "Natural scented soap bar.", imgKeyword: "soap bar" },
    { name: "Bath Bomb", cat: "Beauty", sub: "Bath", brand: "FizzFun", desc: "Aromatic fizzy bath bomb.", imgKeyword: "bath bomb" },
    { name: "Sponge", cat: "Home & Living", sub: "Cleaning", brand: "ScrubAway", desc: "Heavy duty kitchen sponge.", imgKeyword: "sponge" },
    { name: "Scrub Pad", cat: "Home & Living", sub: "Cleaning", brand: "ToughScrub", desc: "Stainless steel scouring pad.", imgKeyword: "scouring pad" },
    { name: "Dish Cloth", cat: "Home & Living", sub: "Kitchen", brand: "DryFast", desc: "Absorbent cotton dish cloth.", imgKeyword: "dish cloth" },
    { name: "Coaster", cat: "Home & Living", sub: "Decor", brand: "TableSafe", desc: "Cork backing coaster.", imgKeyword: "coaster" },
    { name: "Straw", cat: "Home & Living", sub: "Kitchen", brand: "EcoSip", desc: "Reusable stainless steel straw.", imgKeyword: "metal straw" },
    { name: "Bottle Opener", cat: "Home & Living", sub: "Kitchen", brand: "PopTop", desc: "Keychain bottle opener.", imgKeyword: "bottle opener" },
    { name: "Funnel", cat: "Home & Living", sub: "Kitchen", brand: "PourEasy", desc: "Collapsible silicone funnel.", imgKeyword: "funnel" },
    { name: "Bag Clip", cat: "Home & Living", sub: "Kitchen", brand: "FreshKeep", desc: "Food bag sealing clip.", imgKeyword: "bag clip" },
    { name: "Peeler", cat: "Home & Living", sub: "Kitchen", brand: "SkinOff", desc: "Vegetable peeler.", imgKeyword: "peeler" },
    { name: "Whisk", cat: "Home & Living", sub: "Kitchen", brand: "WhipIt", desc: "Mini wire whisk.", imgKeyword: "whisk" },
    { name: "Cookie Cutter", cat: "Home & Living", sub: "Kitchen", brand: "ShapeBake", desc: "Metal cookie cutter shape.", imgKeyword: "cookie cutter" },
    { name: "Tea Infuser", cat: "Home & Living", sub: "Kitchen", brand: "TeaTime", desc: "Mesh tea ball infuser.", imgKeyword: "tea infuser" },
    { name: "Napkin", cat: "Home & Living", sub: "Dining", brand: "CleanEat", desc: "Cloth dinner napkin.", imgKeyword: "napkin" },
    { name: "Candle", cat: "Home & Living", sub: "Decor", brand: "LiteUp", desc: "Unscented tealight candle.", imgKeyword: "candle" },
    { name: "Matches", cat: "Home & Living", sub: "Utility", brand: "FireStart", desc: "Safety matches box.", imgKeyword: "matches" },
    { name: "Incense", cat: "Home & Living", sub: "Decor", brand: "ZenScent", desc: "Pack of incense sticks.", imgKeyword: "incense" },
    { name: "Balloon", cat: "Toys & Games", sub: "Party", brand: "PartyPop", desc: "Latex party balloons.", imgKeyword: "balloon" },
    { name: "Party Popper", cat: "Toys & Games", sub: "Party", brand: "Celebrate", desc: "Confetti party popper.", imgKeyword: "confetti" },
    { name: "Streamers", cat: "Toys & Games", sub: "Party", brand: "DecorHang", desc: "Crepe paper streamers.", imgKeyword: "streamers" },
    { name: "Confetti", cat: "Toys & Games", sub: "Party", brand: "SprinkleFun", desc: "Bag of colorful confetti.", imgKeyword: "confetti" },
    { name: "Gift Bag", cat: "Stationery", sub: "Wrapping", brand: "PresentPack", desc: "Small paper gift bag.", imgKeyword: "gift bag" },
    { name: "Ribbon", cat: "Stationery", sub: "Wrapping", brand: "TieNice", desc: "Satin gift ribbon.", imgKeyword: "ribbon" },
    { name: "Greeting Card", cat: "Stationery", sub: "Cards", brand: "SayIt", desc: "Blank greeting card with envelope.", imgKeyword: "greeting card" },
    { name: "Envelope", cat: "Stationery", sub: "Post", brand: "MailSafe", desc: "Standard business envelopes.", imgKeyword: "envelope" },
    { name: "Sticker Pack", cat: "Stationery", sub: "Crafts", brand: "StickFun", desc: "Assorted decorative stickers.", imgKeyword: "sticker" },
    { name: "Patch", cat: "Fashion", sub: "DIY", brand: "SewOn", desc: "Embroidered iron-on patch.", imgKeyword: "patch" },
    { name: "Button", cat: "Fashion", sub: "DIY", brand: "FixWear", desc: "Assorted sewing buttons.", imgKeyword: "buttons" },
    { name: "Thread", cat: "Home & Living", sub: "Sewing", brand: "StitchStrong", desc: "Spool of sewing thread.", imgKeyword: "thread" },
    { name: "Needle Set", cat: "Home & Living", sub: "Sewing", brand: "SharpPoint", desc: "Hand sewing needles.", imgKeyword: "sewing needle" },
    { name: "Safety Pin", cat: "Home & Living", sub: "Sewing", brand: "SecurePin", desc: "Steel safety pins.", imgKeyword: "safety pin" },
    { name: "Thimble", cat: "Home & Living", sub: "Sewing", brand: "FingerGuard", desc: "Metal sewing thimble.", imgKeyword: "thimble" },
    { name: "Zipper", cat: "Home & Living", sub: "Sewing", brand: "ZipUp", desc: "Nylon coil zipper.", imgKeyword: "zipper" },
    { name: "Shoelaces", cat: "Fashion", sub: "Accessories", brand: "TieTight", desc: "Flat athletic shoelaces.", imgKeyword: "shoelaces" },
    { name: "Insole", cat: "Fashion", sub: "Footwear", brand: "WalkSoft", desc: "Foam shoe insoles.", imgKeyword: "insole" },
    { name: "Heel Grip", cat: "Fashion", sub: "Footwear", brand: "NoSlip", desc: "Adhesive heel grips.", imgKeyword: "heel grip" },
    { name: "Shoe Horn", cat: "Fashion", sub: "Accessories", brand: "SlideIn", desc: "Plastic shoe horn.", imgKeyword: "shoe horn" },
    { name: "Polish Cloth", cat: "Fashion", sub: "Care", brand: "ShineUp", desc: "Shoe polishing cloth.", imgKeyword: "polishing cloth" },
    { name: "Dust Mask", cat: "Health", sub: "Safety", brand: "BreatheSafe", desc: "Disposable dust mask.", imgKeyword: "mask" },
    { name: "Bandage", cat: "Health", sub: "First Aid", brand: "HealFast", desc: "Adhesive fabric bandages.", imgKeyword: "bandage" },
    { name: "Cotton Pads", cat: "Beauty", sub: "Tools", brand: "SoftTouch", desc: "Makeup removal cotton pads.", imgKeyword: "cotton pads" },
    { name: "Cotton Buds", cat: "Beauty", sub: "Tools", brand: "SwabClean", desc: "Cotton swabs.", imgKeyword: "cotton swabs" },
    { name: "Floss", cat: "Health", sub: "Oral Care", brand: "CleanTeeth", desc: "Mint waxed dental floss.", imgKeyword: "dental floss" },
    { name: "Toothbrush", cat: "Health", sub: "Oral Care", brand: "BrushDaily", desc: "Manual toothbrush soft bristles.", imgKeyword: "toothbrush" },
    { name: "Toothpaste", cat: "Health", sub: "Oral Care", brand: "MintFresh", desc: "Travel size toothpaste.", imgKeyword: "toothpaste" },
    { name: "Tissue", cat: "Home & Living", sub: "Hygiene", brand: "SoftBlow", desc: "Pocket tissue pack.", imgKeyword: "tissue" },
    { name: "Wipes", cat: "Home & Living", sub: "Hygiene", brand: "CleanWipe", desc: "Antibacterial wet wipes.", imgKeyword: "wet wipes" },
    { name: "Hand Sanitizer", cat: "Health", sub: "Hygiene", brand: "GermFree", desc: "Pocket hand sanitizer gel.", imgKeyword: "hand sanitizer" },
    { name: "Travel Bottle", cat: "Home & Living", sub: "Travel", brand: "GoPack", desc: "Refillable liquid bottle.", imgKeyword: "travel bottle" },
    { name: "Luggage Tag", cat: "Home & Living", sub: "Travel", brand: "TagIt", desc: "Plastic luggage ID tag.", imgKeyword: "luggage tag" },
    { name: "Sleep Mask", cat: "Home & Living", sub: "Travel", brand: "RestWell", desc: "Satin sleep eye mask.", imgKeyword: "sleep mask" },
    { name: "Ear Plugs", cat: "Health", sub: "Travel", brand: "QuietZone", desc: "Foam noise reduction ear plugs.", imgKeyword: "ear plugs" },
    { name: "Carabiner", cat: "Sports", sub: "Gear", brand: "ClipOn", desc: "Aluminum accessory carabiner.", imgKeyword: "carabiner" },
    { name: "Paracord", cat: "Sports", sub: "Gear", brand: "RopeStrong", desc: "Utility paracord bracelet.", imgKeyword: "paracord" },
    { name: "Bouncy Ball", cat: "Toys & Games", sub: "Outdoor", brand: "BounceHigh", desc: "High bounce rubber ball.", imgKeyword: "bouncy ball" },
    { name: "Marbles", cat: "Toys & Games", sub: "Classic", brand: "RollPlay", desc: "Glass marbles bag.", imgKeyword: "marbles" },
    { name: "Dice", cat: "Toys & Games", sub: "Classic", brand: "RollWin", desc: "Six-sided dice pair.", imgKeyword: "dice" },
    { name: "Playing Cards", cat: "Toys & Games", sub: "Classic", brand: "DeckPlay", desc: "Standard deck of playing cards.", imgKeyword: "playing cards" }
];

// 2. $6-10 CATALOG (100 Items)
const CATALOG_6_10: ProductDef[] = [
    { name: "Ceramic Mug", cat: "Home & Living", sub: "Kitchen", brand: "MugLife", desc: "Classic ceramic coffee mug.", imgKeyword: "ceramic mug" },
    { name: "Travel Mug", cat: "Home & Living", sub: "Kitchen", brand: "GoCup", desc: "Insulated plastic travel mug.", imgKeyword: "travel mug" },
    { name: "Glass Tumbler", cat: "Home & Living", sub: "Kitchen", brand: "ClearSip", desc: "Durable drinking glass.", imgKeyword: "glass tumbler" },
    { name: "Water Bottle", cat: "Sports", sub: "Gear", brand: "HydrateNow", desc: "BPA-free plastic water bottle.", imgKeyword: "water bottle" },
    { name: "Wine Glass", cat: "Home & Living", sub: "Dining", brand: "VineDine", desc: "Stemless wine glass.", imgKeyword: "wine glass" },
    { name: "Bowl", cat: "Home & Living", sub: "Kitchen", brand: "DishDelish", desc: "Ceramic cereal bowl.", imgKeyword: "bowl" },
    { name: "Plate", cat: "Home & Living", sub: "Kitchen", brand: "ServeIt", desc: "Dinner plate.", imgKeyword: "plate" },
    { name: "Cutlery Set", cat: "Home & Living", sub: "Dining", brand: "SilverWare", desc: "Knife, fork, and spoon set.", imgKeyword: "cutlery" },
    { name: "Kitchen Towel", cat: "Home & Living", sub: "Kitchen", brand: "DryDish", desc: "Cotton kitchen towel.", imgKeyword: "kitchen towel" },
    { name: "Oven Mitt", cat: "Home & Living", sub: "Kitchen", brand: "HotHand", desc: "Heat resistant oven mitt.", imgKeyword: "oven mitt" },
    { name: "Apron", cat: "Home & Living", sub: "Kitchen", brand: "ChefWear", desc: "Basic cooking apron.", imgKeyword: "apron" },
    { name: "Spatula", cat: "Home & Living", sub: "Kitchen", brand: "FlipIt", desc: "Silicone cooking spatula.", imgKeyword: "spatula" },
    { name: "Tongs", cat: "Home & Living", sub: "Kitchen", brand: "GrabIt", desc: "Stainless steel food tongs.", imgKeyword: "tongs" },
    { name: "Grater", cat: "Home & Living", sub: "Kitchen", brand: "ShredIt", desc: "Handheld cheese grater.", imgKeyword: "grater" },
    { name: "Can Opener", cat: "Home & Living", sub: "Kitchen", brand: "OpenEasy", desc: "Manual can opener.", imgKeyword: "can opener" },
    { name: "Pizza Cutter", cat: "Home & Living", sub: "Kitchen", brand: "SliceNice", desc: "Wheel pizza cutter.", imgKeyword: "pizza cutter" },
    { name: "Ice Tray", cat: "Home & Living", sub: "Kitchen", brand: "FreezeCube", desc: "Silicone ice cube tray.", imgKeyword: "ice tray" },
    { name: "Food Container", cat: "Home & Living", sub: "Storage", brand: "KeepFresh", desc: "Plastic food storage container.", imgKeyword: "food container" },
    { name: "Glass Jar", cat: "Home & Living", sub: "Storage", brand: "MasonKeep", desc: "Preserving glass jar with lid.", imgKeyword: "glass jar" },
    { name: "Spice Jar", cat: "Home & Living", sub: "Kitchen", brand: "FlavorKeep", desc: "Empty glass spice jar.", imgKeyword: "spice jar" },
    { name: "Salt Shaker", cat: "Home & Living", sub: "Dining", brand: "ShakeIt", desc: "Glass salt shaker.", imgKeyword: "salt shaker" },
    { name: "Pepper Mill", cat: "Home & Living", sub: "Dining", brand: "GrindFresh", desc: "Manual pepper grinder.", imgKeyword: "pepper mill" },
    { name: "Placemat", cat: "Home & Living", sub: "Dining", brand: "TableTop", desc: "Woven dining placemat.", imgKeyword: "placemat" },
    { name: "Table Runner", cat: "Home & Living", sub: "Dining", brand: "RunLong", desc: "Cotton table runner.", imgKeyword: "table runner" },
    { name: "Jar Candle", cat: "Home & Living", sub: "Decor", brand: "ScentHome", desc: "Scented jar candle.", imgKeyword: "jar candle" },
    { name: "Reed Diffuser", cat: "Home & Living", sub: "Decor", brand: "AirFresh", desc: "Room fragrance reed diffuser.", imgKeyword: "reed diffuser" },
    { name: "Incense Holder", cat: "Home & Living", sub: "Decor", brand: "AshCatch", desc: "Wooden incense burner.", imgKeyword: "incense holder" },
    { name: "Vase", cat: "Home & Living", sub: "Decor", brand: "FlowerHome", desc: "Small glass flower vase.", imgKeyword: "vase" },
    { name: "Plant Pot", cat: "Home & Living", sub: "Garden", brand: "GrowGreen", desc: "Ceramic plant pot.", imgKeyword: "plant pot" },
    { name: "Artificial Plant", cat: "Home & Living", sub: "Decor", brand: "FakeGreen", desc: "Small faux succulent.", imgKeyword: "succulent" },
    { name: "Photo Frame", cat: "Home & Living", sub: "Decor", brand: "Memories", desc: "4x6 wooden photo frame.", imgKeyword: "photo frame" },
    { name: "Wall Hook", cat: "Home & Living", sub: "Storage", brand: "HangUp", desc: "Decorative wall hook.", imgKeyword: "wall hook" },
    { name: "Door Stop", cat: "Home & Living", sub: "Utility", brand: "HoldDoor", desc: "Rubber door stopper.", imgKeyword: "door stop" },
    { name: "Storage Box", cat: "Home & Living", sub: "Storage", brand: "TidyBox", desc: "Fabric storage bin.", imgKeyword: "storage box" },
    { name: "Small Basket", cat: "Home & Living", sub: "Storage", brand: "WovenKeep", desc: "Woven storage basket.", imgKeyword: "basket" },
    { name: "Hangers", cat: "Home & Living", sub: "Storage", brand: "HangClothes", desc: "Pack of clothes hangers.", imgKeyword: "hangers" },
    { name: "Laundry Bag", cat: "Home & Living", sub: "Utility", brand: "WashDay", desc: "Mesh laundry bag.", imgKeyword: "laundry bag" },
    { name: "Shower Rings", cat: "Home & Living", sub: "Bath", brand: "CurtainHold", desc: "Shower curtain ring set.", imgKeyword: "shower rings" },
    { name: "Bath Mat", cat: "Home & Living", sub: "Bath", brand: "StepSoft", desc: "Cotton bath mat.", imgKeyword: "bath mat" },
    { name: "Hand Towel", cat: "Home & Living", sub: "Bath", brand: "DryHands", desc: "Soft hand towel.", imgKeyword: "hand towel" },
    { name: "Face Towel", cat: "Home & Living", sub: "Bath", brand: "WashFace", desc: "Cotton face cloth.", imgKeyword: "face towel" },
    { name: "Soap Dispenser", cat: "Home & Living", sub: "Bath", brand: "PumpSoap", desc: "Refillable soap pump.", imgKeyword: "soap dispenser" },
    { name: "Toothbrush Holder", cat: "Home & Living", sub: "Bath", brand: "HoldBrush", desc: "Ceramic toothbrush cup.", imgKeyword: "toothbrush holder" },
    { name: "Makeup Bag", cat: "Beauty", sub: "Storage", brand: "GlamPack", desc: "Zippered cosmetic pouch.", imgKeyword: "makeup bag" },
    { name: "Toiletry Bag", cat: "Home & Living", sub: "Travel", brand: "TravelWash", desc: "Waterproof toiletry bag.", imgKeyword: "toiletry bag" },
    { name: "Manicure Set", cat: "Beauty", sub: "Nails", brand: "NailCare", desc: "Compact manicure tool kit.", imgKeyword: "manicure set" },
    { name: "Hair Brush", cat: "Beauty", sub: "Hair", brand: "TangleFree", desc: "Paddle hair brush.", imgKeyword: "hair brush" },
    { name: "Makeup Brush", cat: "Beauty", sub: "Tools", brand: "BlendIt", desc: "Single makeup brush.", imgKeyword: "makeup brush" },
    { name: "Sponge Set", cat: "Beauty", sub: "Tools", brand: "BlendFace", desc: "Makeup blender sponge set.", imgKeyword: "makeup sponge" },
    { name: "Eyelash Curler", cat: "Beauty", sub: "Tools", brand: "CurlLash", desc: "Metal eyelash curler.", imgKeyword: "eyelash curler" },
    { name: "Hardcover Notebook", cat: "Stationery", sub: "Paper", brand: "NoteHard", desc: "A5 hardcover journal.", imgKeyword: "hardcover notebook" },
    { name: "Planner", cat: "Stationery", sub: "Paper", brand: "PlanAhead", desc: "Undated daily planner.", imgKeyword: "planner" },
    { name: "Desk Organizer", cat: "Stationery", sub: "Storage", brand: "DeskTidy", desc: "Mesh desk organizer.", imgKeyword: "desk organizer" },
    { name: "Pen Holder", cat: "Stationery", sub: "Storage", brand: "PenStand", desc: "Cup pen holder.", imgKeyword: "pen holder" },
    { name: "Mouse Pad", cat: "Electronics", sub: "Accessories", brand: "SmoothGlide", desc: "Basic fabric mouse pad.", imgKeyword: "mouse pad" },
    { name: "USB Hub", cat: "Electronics", sub: "Gadgets", brand: "PortExpand", desc: "4-port USB 2.0 hub.", imgKeyword: "usb hub" },
    { name: "Phone Case", cat: "Electronics", sub: "Accessories", brand: "CoverUp", desc: "Silicone phone case.", imgKeyword: "phone case" },
    { name: "Screen Protector", cat: "Electronics", sub: "Accessories", brand: "GlassGuard", desc: "Tempered glass screen protector.", imgKeyword: "screen protector" },
    { name: "USB-C Cable", cat: "Electronics", sub: "Accessories", brand: "ConnectC", desc: "Braided USB-C charging cable.", imgKeyword: "usb-c cable" },
    { name: "Lightning Cable", cat: "Electronics", sub: "Accessories", brand: "ConnectL", desc: "Braided Lightning cable.", imgKeyword: "lightning cable" },
    { name: "Wall Charger", cat: "Electronics", sub: "Accessories", brand: "PowerPlug", desc: "Single port USB wall charger.", imgKeyword: "wall charger" },
    { name: "Car Charger", cat: "Electronics", sub: "Accessories", brand: "AutoCharge", desc: "Dual port car charger.", imgKeyword: "car charger" },
    { name: "Phone Mount", cat: "Electronics", sub: "Accessories", brand: "DashHold", desc: "Car dashboard phone mount.", imgKeyword: "phone mount" },
    { name: "Laptop Sleeve", cat: "Electronics", sub: "Accessories", brand: "SafeSleeve", desc: "Neoprene laptop sleeve.", imgKeyword: "laptop sleeve" },
    { name: "Camera Strap", cat: "Electronics", sub: "Accessories", brand: "SecureCam", desc: "Woven camera neck strap.", imgKeyword: "camera strap" },
    { name: "Plain T-shirt", cat: "Fashion", sub: "Apparel", brand: "BasicWear", desc: "Cotton crew neck t-shirt.", imgKeyword: "t-shirt" },
    { name: "Tank Top", cat: "Fashion", sub: "Apparel", brand: "SummerWear", desc: "Basic cotton tank top.", imgKeyword: "tank top" },
    { name: "Socks Pack", cat: "Fashion", sub: "Apparel", brand: "FootCozy", desc: "3-pack ankle socks.", imgKeyword: "socks" },
    { name: "Boxer Briefs", cat: "Fashion", sub: "Apparel", brand: "InnerComfort", desc: "Cotton boxer briefs.", imgKeyword: "boxer briefs" },
    { name: "Beanie", cat: "Fashion", sub: "Accessories", brand: "WarmHead", desc: "Knit beanie hat.", imgKeyword: "beanie" },
    { name: "Cap", cat: "Fashion", sub: "Accessories", brand: "SunShade", desc: "Baseball cap.", imgKeyword: "baseball cap" },
    { name: "Bucket Hat", cat: "Fashion", sub: "Accessories", brand: "RetroWear", desc: "Cotton bucket hat.", imgKeyword: "bucket hat" },
    { name: "Gloves", cat: "Fashion", sub: "Accessories", brand: "WinterHand", desc: "Knit winter gloves.", imgKeyword: "gloves" },
    { name: "Scarf", cat: "Fashion", sub: "Accessories", brand: "NeckWarm", desc: "Lightweight fashion scarf.", imgKeyword: "scarf" },
    { name: "Belt", cat: "Fashion", sub: "Accessories", brand: "WaistHold", desc: "Canvas belt with buckle.", imgKeyword: "belt" },
    { name: "Canvas Wallet", cat: "Fashion", sub: "Accessories", brand: "CashKeep", desc: "Tri-fold canvas wallet.", imgKeyword: "wallet" },
    { name: "Coin Purse", cat: "Fashion", sub: "Accessories", brand: "ChangeKeep", desc: "Small zippered coin purse.", imgKeyword: "coin purse" },
    { name: "Tote Bag", cat: "Fashion", sub: "Bags", brand: "CarryAll", desc: "Canvas tote bag.", imgKeyword: "tote bag" },
    { name: "Shopping Bag", cat: "Home & Living", sub: "Utility", brand: "EcoShopper", desc: "Reusable fold-up shopping bag.", imgKeyword: "shopping bag" },
    { name: "Umbrella", cat: "Fashion", sub: "Accessories", brand: "RainAway", desc: "Compact travel umbrella.", imgKeyword: "umbrella" },
    { name: "Sunglasses", cat: "Fashion", sub: "Accessories", brand: "SunView", desc: "Classic style sunglasses.", imgKeyword: "sunglasses" },
    { name: "Reading Glasses", cat: "Health", sub: "Vision", brand: "ClearRead", desc: "Basic reading glasses.", imgKeyword: "glasses" },
    { name: "Watch Strap", cat: "Fashion", sub: "Accessories", brand: "TimeBand", desc: "Replacement nylon watch strap.", imgKeyword: "watch strap" },
    { name: "Jewelry Box", cat: "Fashion", sub: "Storage", brand: "GemSafe", desc: "Small jewelry travel box.", imgKeyword: "jewelry box" },
    { name: "Stud Earrings", cat: "Fashion", sub: "Jewelry", brand: "EarSparkle", desc: "Simple metal stud earrings.", imgKeyword: "stud earrings" },
    { name: "Chain Necklace", cat: "Fashion", sub: "Jewelry", brand: "NeckChain", desc: "Thin silver-tone chain.", imgKeyword: "necklace" },
    { name: "Beaded Bracelet", cat: "Fashion", sub: "Jewelry", brand: "WristBead", desc: "Stretch beaded bracelet.", imgKeyword: "bracelet" },
    { name: "Simple Ring", cat: "Fashion", sub: "Jewelry", brand: "FingerBand", desc: "Minimalist metal ring.", imgKeyword: "ring" },
    { name: "Dog Toy", cat: "Pet Supplies", sub: "Toys", brand: "PlayPup", desc: "Rope chew toy for dogs.", imgKeyword: "dog toy" },
    { name: "Cat Toy", cat: "Pet Supplies", sub: "Toys", brand: "PlayKitty", desc: "Feather wand cat toy.", imgKeyword: "cat toy" },
    { name: "Dog Collar", cat: "Pet Supplies", sub: "Accessories", brand: "NeckPup", desc: "Nylon dog collar.", imgKeyword: "dog collar" },
    { name: "Cat Collar", cat: "Pet Supplies", sub: "Accessories", brand: "NeckKitty", desc: "Collar with bell for cats.", imgKeyword: "cat collar" },
    { name: "Pet Bowl", cat: "Pet Supplies", sub: "Feeding", brand: "EatPup", desc: "Stainless steel pet bowl.", imgKeyword: "pet bowl" },
    { name: "Bird Feeder", cat: "Home & Living", sub: "Garden", brand: "BirdFeed", desc: "Small plastic bird feeder.", imgKeyword: "bird feeder" },
    { name: "Garden Trowel", cat: "Home & Living", sub: "Garden", brand: "DigEarth", desc: "Hand garden trowel.", imgKeyword: "trowel" },
    { name: "Garden Gloves", cat: "Home & Living", sub: "Garden", brand: "HandProtect", desc: "Cotton gardening gloves.", imgKeyword: "gardening gloves" },
    { name: "Seeds Pack", cat: "Home & Living", sub: "Garden", brand: "GrowLife", desc: "Assorted flower seeds.", imgKeyword: "seeds" },
    { name: "Watering Can", cat: "Home & Living", sub: "Garden", brand: "RainPour", desc: "Small plastic watering can.", imgKeyword: "watering can" },
    { name: "Flashlight", cat: "Gadgets", sub: "Tools", brand: "NightBeam", desc: "Handheld LED flashlight.", imgKeyword: "flashlight" }
];

// Helper to generate a consistent image URL
const getImageUrl = (keyword: string, variantIndex: number) => {
    return `https://source.unsplash.com/featured/?${encodeURIComponent(keyword)}&sig=${variantIndex}`;
};

// Helper to generate realistic technical specs based on product category
const getSpecsForProduct = (product: Product): Record<string, string> => {
    // Basic specs shared by all
    const baseSpecs: Record<string, string> = {
        "Brand": product.brand,
        "Manufacturer": product.brand,
        "Brand Name": product.brand,
        "Item Weight": `${(Math.random() * 2 + 0.1).toFixed(2)} pounds`,
        "Country of Origin": "China",
        "Number of Items": "1",
        "Part Number": `${product.brand.substring(0,3).toUpperCase()}-${product.sku.split('-').pop() || '001'}`,
        "Model Name": product.title,
        "Warranty Description": "1 Year Limited Warranty"
    };

    // Category specific specs
    switch(product.category) {
        case "Electronics":
        case "Gadgets":
            return {
                ...baseSpecs,
                "Color": product.variants[0]?.options.color || "Black",
                "Connectivity Technology": "Bluetooth, USB, Wireless",
                "Power Source": "Battery Powered",
                "Special Feature": "Portable, Lightweight, Fast Charging",
                "Included Components": "Charging Cable, User Manual",
                "Product Dimensions": `${(Math.random() * 5 + 2).toFixed(1)}"L x ${(Math.random() * 3 + 1).toFixed(1)}"W x ${(Math.random() * 2 + 0.5).toFixed(1)}"H`
            };
        case "Home & Living":
            return {
                ...baseSpecs,
                "Color": product.variants[0]?.options.color || "Multicolor",
                "Material": "Mixed Materials",
                "Style": "Modern",
                "Pattern": "Solid",
                "Shape": "Rectangular",
                "Included Components": product.title,
                "Product Dimensions": `${(Math.random() * 20 + 5).toFixed(1)}"L x ${(Math.random() * 20 + 5).toFixed(1)}"W`
            };
        case "Fashion":
        case "Accessories":
            return {
                ...baseSpecs,
                "Color": product.variants[0]?.options.color || "Assorted",
                "Department": "Unisex-Adult",
                "Style": "Casual",
                "Material": "Cotton Blend",
                "Care Instructions": "Machine Wash",
                "Closure Type": "Standard"
            };
        case "Beauty":
            return {
                ...baseSpecs,
                "Scent": "Unscented",
                "Item Form": "Liquid",
                "Skin Type": "All",
                "Age Range (Description)": "Adult",
                "Special Feature": "Natural Ingredients",
                "Net Quantity": "1 Count"
            };
        case "Sports":
            return {
                ...baseSpecs,
                "Color": product.variants[0]?.options.color || "Blue",
                "Material": "Composite",
                "Sport": "Exercise & Fitness",
                "Suggested Users": "Unisex-Adult",
                "Hand Orientation": "Ambidextrous"
            };
        default:
            return {
                ...baseSpecs,
                "Color": product.variants[0]?.options.color || "Standard",
                "Material": "Durable Material",
                "Included Components": product.title
            };
    }
};

// New Generator Function
const generateCatalogProducts = (catalog: ProductDef[], priceMin: number, priceMax: number, startId: number): Product[] => {
    return catalog.map((item, index) => {
        const productId = `prod-gen-${startId + index}`;
        // Generate a random price within range
        const price = parseFloat((Math.random() * (priceMax - priceMin) + priceMin).toFixed(2));
        
        // Generate 4 Variants
        const colors = ["Black", "White", "Blue", "Red", "Green", "Yellow", "Silver", "Gold"];
        const productVariants = Array.from({ length: 4 }).map((_, vIndex) => {
             const color = colors[(index + vIndex) % colors.length];
             return {
                variant_id: `v-${productId}-${vIndex}`,
                options: { color: color, style: "Standard" },
                price: price,
                stock_qty: Math.floor(Math.random() * 100) + 10,
                sku: `${item.brand.substring(0,3).toUpperCase()}-${productId.split('-')[2]}-${color.substring(0,2).toUpperCase()}`
             };
        });

        // Generate 4 Images
        const productImages = Array.from({ length: 4 }).map((_, iIndex) => ({
            image_url: `https://images.unsplash.com/photo-${getUnsplashId(item.imgKeyword, iIndex)}?auto=format&fit=crop&w=800&q=80`,
            alt_text: `${item.name} - View ${iIndex + 1}`
        }));

        const product: Product = {
            id: productId,
            title: item.name,
            short_description: item.desc,
            long_description: `${item.desc} This high-quality ${item.cat.toLowerCase()} item by ${item.brand} is perfect for daily use. Features durable materials and a modern design. Available in multiple colors to suit your style.`,
            category: item.cat,
            subcategory: item.sub,
            brand: item.brand,
            price: price,
            currency: "USD",
            discount_pct: 0,
            final_price: price,
            stock_qty: Math.floor(Math.random() * 500) + 50,
            sku: `${item.brand.substring(0,3).toUpperCase()}-${productId.split('-')[2]}`,
            tags: ["affordable", "essential", item.cat.toLowerCase(), item.sub.toLowerCase()],
            rating: parseFloat((3.5 + (Math.random() * 1.5)).toFixed(1)),
            reviews_count: Math.floor(Math.random() * 100) + 5,
            created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
            is_trending: Math.random() > 0.7,
            popularity_score: Math.floor(Math.random() * 100),
            sales_7d: Math.floor(Math.random() * 50) + 5,
            views_7d: Math.floor(Math.random() * 200) + 20,
            add_to_cart_7d: Math.floor(Math.random() * 20) + 2,
            variants: productVariants,
            images: productImages
        };
        
        return product;
    });
};

// Helper to get semi-deterministic valid Unsplash IDs
const getUnsplashId = (keyword: string, index: number): string => {
    const pool = [
        "1585846416120-3a7354ed7d6d", "1544816155-12df9643f363", "1608043152269-423dbba4e7e1", "1593618998160-e34014e67546",
        "1602143407151-7111542de6e8", "1559056199-641a0ac8b55e", "1473968512647-3e447244af8f", "1582793988951-9aed5509eb97",
        "1553062407-98eeb6e0e5c8", "1601925260368-ae2f83cf8b7f", "1507413245164-6160d8298b31", "1620916566398-39f168a27e43",
        "1606107557195-0e29a4b5b4aa", "1580301762395-9c6496707e97", "1590658268037-6bf12165a8df", "1505843490538-5133c6c7d0e1",
        "1572569028738-411a68c4637c", "1523275335684-37898b6baf30", "1512314889357-e157221bf163", "1497935586351-b67a49e012bf",
        "1616486967359-3654f36fbd84", "1610465299993-374fa37ce608", "1564466683-1b77844101e8", "1586776977607-310e9c725c37"
    ];
    let hash = 0;
    for (let i = 0; i < keyword.length; i++) {
        hash = keyword.charCodeAt(i) + ((hash << 5) - hash);
    }
    const safeHash = Math.abs(hash);
    return pool[(safeHash + index) % pool.length];
}

// Generate the final product list with specs applied to ALL products
export const products: Product[] = [
    ...originalProducts.map(p => ({...p, specs: getSpecsForProduct(p)})),
    ...generateCatalogProducts(CATALOG_1_5, 1.00, 5.00, 1000).map(p => ({...p, specs: getSpecsForProduct(p)})),
    ...generateCatalogProducts(CATALOG_6_10, 6.00, 10.00, 2000).map(p => ({...p, specs: getSpecsForProduct(p)}))
];

export const getCategories = () => [...new Set(products.map(p => p.category))];