
import { Product, Review } from '../types';

const FIRST_NAMES = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Lisa", "Matthew", "Betty", "Anthony", "Sandra", "Mark", "Ashley"];
const LAST_INITIALS = ["A.", "B.", "C.", "D.", "E.", "F.", "G.", "H.", "I.", "J.", "K.", "L.", "M.", "N.", "O.", "P.", "R.", "S.", "T.", "W.", "Y.", "Z."];

// Contextual Templates by Category
// This ensures reviews sound "real" for the specific item type
const TEMPLATES: Record<string, { titles: string[], bodies: string[], attributes: string[] }> = {
    Electronics: {
        titles: ["Works perfectly", "Great battery life", "Solid build quality", "Worth the money", "Better than expected", "Just okay", "A bit complicated", "Game changer", "Fast connectivity", "Sleek design"],
        bodies: [
            "I've been using this for a week now and the battery life is impressive. It synced immediately with my devices.",
            "The sound quality is crisp and clear. Highly recommend for the price point.",
            "A bit tricky to set up at first, but once it's running, it works like a charm.",
            "Build quality feels premium. Doesn't feel cheap or plasticky at all.",
            "Connectivity is stable, haven't experienced any dropouts yet.",
            "Fast charging is a huge plus. Saved me a few times when I forgot to charge overnight.",
            "Does exactly what it says on the box. No complaints.",
            "I was skeptical at first, but this gadget has improved my daily workflow significantly."
        ],
        attributes: ["Battery Life", "Sound Quality", "Connectivity", "Value", "Durability", "Ease of Use"]
    },
    Fashion: {
        titles: ["Fits perfectly", "Love the material", "So comfortable", "Stylish and cute", "Colors are vibrant", "Runs a bit small", "Great for the price", "My new favorite", "Soft fabric", "Good stitch quality"],
        bodies: [
            "The fabric is super soft and breathable. Perfect for all-day wear.",
            "I was worried about the fit, but it's true to size. Fits me like a glove.",
            "The color is exactly as shown in the picture. Really pops!",
            "Washed it a couple of times and it hasn't shrunk or faded.",
            "Very stylish, I've gotten so many compliments wearing this.",
            "A staple for my wardrobe now. Might buy another in a different color.",
            "The material feels high quality, not thin or see-through.",
            "Order a size up if you prefer a looser fit, but otherwise perfect."
        ],
        attributes: ["Comfort", "Fit", "Material Quality", "Style", "True to Size", "Fabric"]
    },
    "Home & Living": {
        titles: ["Looks great in my room", "Sturdy and well made", "Easy to assemble", "High quality", "Adds a nice touch", "Functional and pretty", "Good value", "Highly recommend", "Modern look", "Great addition"],
        bodies: [
            "Ideally suited for my living room decor. The design is modern and sleek.",
            "Very sturdy construction. Doesn't wobble or feel flimsy.",
            "Assembly was a breeze, took me less than 15 minutes.",
            "The finish is beautiful and feels very high-end.",
            "It does exactly what it's supposed to do and looks good doing it.",
            "Packaging was secure, arrived without a scratch.",
            "Adds such a cozy vibe to my space. Love it!",
            "Great quality for the price, looks much more expensive than it is."
        ],
        attributes: ["Sturdiness", "Assembly", "Aesthetics", "Value", "Quality", "Design"]
    },
    Beauty: {
        titles: ["Amazing results", "Smells great", "Gentle on skin", "My holy grail", "Will buy again", "Visible difference", "Luxury feel", "Good product", "Hydrating", "Smooth texture"],
        bodies: [
            "I've noticed a difference in just a few days. My skin feels so much better.",
            "The scent is light and not overpowering, which I love.",
            "A little goes a long way. This bottle will last me a while.",
            "Texture is smooth and absorbs quickly without leaving a residue.",
            "Finally found something that works for my sensitive skin.",
            "Packaging feels luxurious and the pump works well.",
            "Leaves my skin feeling refreshed and hydrated.",
            "Best product I've used in this category for a long time."
        ],
        attributes: ["Scent", "Effectiveness", "Texture", "Value", "Gentleness", "Packaging"]
    },
    // Fallback
    General: {
        titles: ["Great purchase", "Good quality", "Fast shipping", "Recommended", "Five stars", "Happy customer", "As described", "Nice item", "Excellent service", "Would buy again"],
        bodies: [
            "Product arrived on time and was exactly as described.",
            "Good quality for the price. I'm satisfied with my purchase.",
            "Customer service was helpful when I had a question.",
            "Simple, effective, and well-designed.",
            "I would definitely recommend this to a friend.",
            "Exceeded my expectations.",
            "Solid product, does the job well.",
            "Happy with this purchase, it arrived quickly and well packaged."
        ],
        attributes: ["Quality", "Shipping", "Value", "Service", "Accuracy", "Packaging"]
    }
};

const getCategoryData = (category: string) => {
    if (TEMPLATES[category]) return TEMPLATES[category];
    if (category === "Accessories" || category === "Sports" || category === "Pet Supplies") return TEMPLATES["Fashion"]; // Approximate mapping
    if (category === "Gadgets") return TEMPLATES["Electronics"];
    return TEMPLATES["General"];
};

export const generateReviewsForProduct = (product: Product): Review[] => {
    const reviews: Review[] = [];
    // Generate between 5 and 20 reviews to populate the feed
    const count = Math.min(Math.max(product.reviews_count, 5), 20); 
    const templateData = getCategoryData(product.category);

    for (let i = 0; i < count; i++) {
        // Weighted random rating: Higher probability to match the product's actual avg rating
        let rating = Math.round(product.rating + (Math.random() * 2 - 1));
        rating = Math.max(1, Math.min(5, rating)); // Clamp between 1 and 5

        const isPositive = rating >= 4;
        
        // Select Title
        let title = templateData.titles[Math.floor(Math.random() * templateData.titles.length)];
        if (rating <= 2) {
             title = "Disappointed"; // Simple override for bad ratings
        } else if (rating === 3) {
             title = "It's okay";
        }
        
        // Select Body (Mix 1 or 2 sentences)
        const bodyIdx1 = Math.floor(Math.random() * templateData.bodies.length);
        let body = templateData.bodies[bodyIdx1];
        if (Math.random() > 0.5) {
             const bodyIdx2 = (bodyIdx1 + 1) % templateData.bodies.length;
             body += " " + templateData.bodies[bodyIdx2];
        }

        // Add some "realism" flaws for lower ratings
        if (rating <= 3) {
            body = "The product is okay, but " + body.toLowerCase().replace("impressive", "average").replace("perfect", "decent").replace("great", "okay");
        }

        // Generate Image (1 in 8 chance) - Using category keyword to get relevant image
        let images: string[] | undefined = undefined;
        if (Math.random() > 0.85) {
            // Using a specific signature to ensure different images load
            images = [`https://source.unsplash.com/random/400x400/?${product.category.toLowerCase().split(' ')[0]}&sig=${product.id}-${i}`];
        }

        // Generate Variant Name string
        let variantName = "";
        if (product.variants.length > 0) {
             const variant = product.variants[Math.floor(Math.random() * product.variants.length)];
             variantName = Object.entries(variant.options).map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`).join(' | ');
        }

        // Date generation (spread over last 12 months)
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365));

        reviews.push({
            id: `rev-${product.id}-${i}`,
            author: `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)]}`,
            rating: rating,
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            title: title,
            content: body,
            verified: Math.random() > 0.15, // 85% verified
            helpful_count: Math.floor(Math.random() * 12),
            images: images,
            location: "United States",
            variant_name: variantName
        });
    }

    return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const generateAISummary = (product: Product): string => {
    const templateData = getCategoryData(product.category);
    // Pick 3 random attributes to discuss
    const attrs = templateData.attributes.slice(0, 3);
    
    return `Customers find the ${product.title} excels in ${attrs[0].toLowerCase()} and appreciate its ${attrs[1].toLowerCase()}. The design receives positive feedback, with many customers noting its ${attrs[2].toLowerCase()}. While most customers report it performs well, some mention it fits their specific needs perfectly. Customers generally express satisfaction with the product's durability and overall value.`;
};

export const getReviewAttributes = (product: Product): string[] => {
    return getCategoryData(product.category).attributes;
};
