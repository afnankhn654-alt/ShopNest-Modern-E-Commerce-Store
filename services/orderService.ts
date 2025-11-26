import { Order, OrderItem, TrackingEvent, OrderStatus, Product } from '../types';
import { products } from '../data/products';

// --- MOCK DATA GENERATION ---

const CITIES = ["New York", "London", "Tokyo", "Paris", "Sydney", "Los Angeles", "Berlin", "Toronto", "Singapore", "Dubai"];
const COUNTRIES = ["USA", "UK", "Japan", "France", "Australia", "Germany", "Canada"];
const STREETS = ["Innovation Blvd", "Market Street", "Ocean Ave", "Maple Drive", "Main Street", "Station Road", "Victoria Road"];
const ORIGIN_FACILITIES = ["Shenzhen, CN", "Shanghai, CN", "Frankfurt, DE", "Los Angeles, USA", "Ho Chi Minh, VN"];

// Helper to generate a random date in the past
const randomPastDate = (daysAgo: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date;
};

// Helper to generate a realistic tracking history
const generateTrackingHistory = (orderDate: Date, status: OrderStatus, destinationCity: string, originFacility: string): TrackingEvent[] => {
  const history: TrackingEvent[] = [];
  const now = new Date();

  const addEvent = (eventDate: Date, location: string, statusText: string) => {
    if (eventDate <= now) {
      history.push({
        date: eventDate.toISOString(),
        location,
        status: statusText,
        isCurrent: false, // Will be set later
      });
    }
  };
  
  // 1. Order Placed
  addEvent(orderDate, "Global Distribution Center", "Order Placed");

  // 2. Processing
  const processingDate = new Date(orderDate);
  processingDate.setHours(orderDate.getHours() + Math.floor(Math.random() * 6) + 1);
  addEvent(processingDate, "Global Distribution Center", "Processing");

  if (status === 'Cancelled' || status === 'Returned') {
     history[0].isCurrent = true;
     return history;
  }

  // 3. Shipped
  const shippedDate = new Date(processingDate);
  shippedDate.setDate(processingDate.getDate() + Math.floor(Math.random() * 2));
  addEvent(shippedDate, `Origin Facility, ${originFacility}`, "Package Shipped");

  if (status === 'Shipped') {
    history[history.length-1].isCurrent = true;
    return history.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // 4. Out for Delivery
  const deliveryDate = new Date(shippedDate);
  deliveryDate.setDate(shippedDate.getDate() + Math.floor(Math.random() * 4) + 2);
  addEvent(deliveryDate, `Local Hub, ${destinationCity}`, "Out for Delivery");

  if (status === 'Out for Delivery') {
     history[history.length-1].isCurrent = true;
     return history.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  // 5. Delivered
  const deliveredDate = new Date(deliveryDate);
  deliveredDate.setHours(deliveryDate.getHours() + Math.floor(Math.random() * 8) + 1);
  addEvent(deliveredDate, `Customer Address, ${destinationCity}`, "Delivered");
  
  if (status === 'Delivered') {
      history[history.length-1].isCurrent = true;
  }

  return history.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const generateRandomItems = (count: number): OrderItem[] => {
    const items: OrderItem[] = [];
    const usedProductIds = new Set();
    for (let i = 0; i < count; i++) {
        let product;
        do {
            product = products[Math.floor(Math.random() * products.length)];
        } while (usedProductIds.has(product.id));
        usedProductIds.add(product.id);
        
        const variant = product.variants[Math.floor(Math.random() * product.variants.length)];
        items.push({
            product_id: product.id,
            variant_id: variant.variant_id,
            title: product.title,
            variant_options: variant.options,
            image_url: product.images[0].image_url,
            quantity: Math.floor(Math.random() * 2) + 1,
            price: variant.price,
        });
    }
    return items;
}

const generateRandomAddress = () => {
    const street = STREETS[Math.floor(Math.random() * STREETS.length)];
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    const zip = Math.floor(10000 + Math.random() * 90000);
    return `${Math.floor(Math.random() * 999) + 1} ${street}, ${city}, ${country} ${zip}`;
};

// Main generation function
const generateMockOrders = (userId: string, count: number): Order[] => {
  const orders: Order[] = [];
  
  const statuses: OrderStatus[] = ['Delivered', 'Delivered', 'Shipped', 'Out for Delivery', 'Processing', 'Cancelled', 'Returned'];

  for (let i = 0; i < count; i++) {
    const orderDate = randomPastDate(90);
    const items = generateRandomItems(Math.floor(Math.random() * 4) + 1);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5.00; // Add shipping
    const status = statuses[i % statuses.length];
    
    const estDeliveryDate = new Date(orderDate);
    estDeliveryDate.setDate(orderDate.getDate() + 7);

    const shippingAddress = generateRandomAddress();
    const destinationCity = shippingAddress.split(',')[1].trim();
    const originFacility = ORIGIN_FACILITIES[Math.floor(Math.random() * ORIGIN_FACILITIES.length)];

    orders.push({
        id: `SN-${userId.substring(0,4)}-${Math.floor(100000 + Math.random() * 900000)}`,
        date: orderDate.toISOString(),
        status: status,
        total_amount: total,
        item_count: items.reduce((sum, item) => sum + item.quantity, 0),
        items: items,
        shipping_address: shippingAddress,
        tracking_number: `1Z${Math.random().toString().slice(2, 18)}`,
        estimated_delivery: estDeliveryDate.toISOString(),
        tracking_history: generateTrackingHistory(orderDate, status, destinationCity, originFacility)
    });
  }
  return orders.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};


// --- MOCK API SERVICE ---

// We'll store the generated orders in memory to allow for updates (like cancellation)
let userOrders: Record<string, Order[]> = {};

export const fetchOrdersForUser = async (userId: string): Promise<Order[]> => {
    console.log(`Fetching orders for user: ${userId}`);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency

    if (!userOrders[userId]) {
        userOrders[userId] = generateMockOrders(userId, 7); // Generate 7 mock orders per user
    }
    return [...userOrders[userId]];
};

export const cancelOrder = async (userId: string, orderId: string): Promise<boolean> => {
    console.log(`Cancelling order ${orderId} for user ${userId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (userOrders[userId]) {
        const orderIndex = userOrders[userId].findIndex(o => o.id === orderId);
        if (orderIndex > -1 && ['Processing', 'Shipped'].includes(userOrders[userId][orderIndex].status)) {
            userOrders[userId][orderIndex].status = 'Cancelled';
            userOrders[userId][orderIndex].tracking_history.unshift({
                date: new Date().toISOString(),
                location: "Customer Request",
                status: "Order Cancelled",
                isCurrent: true
            });
            // Make previous step not current
            if (userOrders[userId][orderIndex].tracking_history[1]) {
                userOrders[userId][orderIndex].tracking_history[1].isCurrent = false;
            }
            return true;
        }
    }
    return false;
};

export const returnOrderItem = async (userId: string, orderId: string, itemId: string): Promise<boolean> => {
     console.log(`Returning item ${itemId} from order ${orderId}`);
     await new Promise(resolve => setTimeout(resolve, 500));
     
     if (userOrders[userId]) {
        const orderIndex = userOrders[userId].findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
            // In a real app, you'd mark just one item. Here we simplify and set the whole order status.
            userOrders[userId][orderIndex].status = 'Returned';
            return true;
        }
     }
     return false;
}