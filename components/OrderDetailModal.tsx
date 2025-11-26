import React, { useState } from 'react';
import { Order, OrderItem } from '../types';
import { useLocation } from '../contexts/LocationContext';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import { cancelOrder, returnOrderItem } from '../services/orderService';
import { products } from '../data/products';
import { 
  XMarkIcon, 
  MapPinIcon, 
  TruckIcon, 
  ArchiveBoxIcon, 
  CheckCircleIcon,
  ShoppingCartIcon,
  PencilIcon,
  ArrowUturnLeftIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface OrderDetailModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdate: (updatedOrder: Order) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, isOpen, onClose, onOrderUpdate }) => {
  const { formatPrice } = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addNotification } = useNotification();
  const [isCancelling, setIsCancelling] = useState(false);

  if (!isOpen) return null;

  const handleBuyAgain = (item: OrderItem) => {
    const product = products.find(p => p.id === item.product_id);
    const variant = product?.variants.find(v => v.variant_id === item.variant_id);
    if (product && variant) {
        addToCart(product, variant, 1);
        addNotification({
            type: 'success',
            title: 'Added to Cart!',
            message: `${product.title}`,
            productImage: product.images[0].image_url
        });
    }
  };
  
  const handleCancelOrder = async () => {
      if (!user) return;
      setIsCancelling(true);
      const success = await cancelOrder(user.id, order.id);
      if (success) {
          const updatedOrder = { 
              ...order, 
              status: 'Cancelled' as const,
              tracking_history: [{ date: new Date().toISOString(), location: 'Customer Request', status: 'Order Cancelled', isCurrent: true }, ...order.tracking_history]
          };
          onOrderUpdate(updatedOrder);
          addNotification({ type: 'success', title: 'Order Cancelled', message: `Order ${order.id} has been cancelled.`});
      } else {
           addNotification({ type: 'error', title: 'Cancellation Failed', message: 'This order could not be cancelled.'});
      }
      setIsCancelling(false);
  }

  const isCancellable = ['Processing', 'Shipped'].includes(order.status);
  
  const mapPath = "M 50 20 C 70 30, 80 60, 70 90 S 40 130, 50 150 C 60 170, 30 190, 50 220";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white z-20">
          <XMarkIcon className="h-6 w-6" />
        </button>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h2>
           <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{order.id}</p>
        </div>

        <div className="flex-grow flex flex-col md:flex-row overflow-y-auto">
          
          {/* Left Column: Tracking & Map */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <h3 className="text-lg font-bold mb-4">Tracking</h3>
            
            {/* Map Visualization */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 relative h-64">
                <svg viewBox="0 0 100 240" className="w-full h-full">
                    <path d={mapPath} stroke="rgba(150,150,150,0.3)" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                    <path d={mapPath} stroke="url(#line-gradient)" strokeWidth="3" fill="none" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}/>
                    <defs>
                      <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="20" r="8" fill="#fff" stroke="#3b82f6" strokeWidth="3"/>
                    <circle cx="50" cy="220" r="8" fill="#fff" stroke="#8b5cf6" strokeWidth="3"/>
                    <circle cx="50" cy="150" r="5" fill="#60a5fa"/>
                </svg>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
                   <ArchiveBoxIcon className="h-6 w-6 text-blue-500 mx-auto"/>
                   <p className="text-xs font-bold">Warehouse</p>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                   <MapPinIcon className="h-6 w-6 text-purple-500 mx-auto"/>
                   <p className="text-xs font-bold">You</p>
                </div>
                 {order.status === 'Shipped' && <circle cx="70" cy="90" r="6" fill="#3b82f6" className="animate-pulse-strong"/>}
                 {order.status === 'Out for Delivery' && <circle cx="50" cy="150" r="6" fill="#3b82f6" className="animate-pulse-strong"/>}
            </div>

            {/* Timeline */}
            <div className="space-y-6">
               {order.tracking_history.map((event, index) => (
                   <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${event.isCurrent ? 'bg-primary-500 border-primary-600 animate-pulse' : 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500'}`}>
                              <CheckCircleIcon className={`h-5 w-5 ${event.isCurrent ? 'text-white' : 'text-gray-400 dark:text-gray-300'}`} />
                          </div>
                          {index < order.tracking_history.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-600"></div>}
                      </div>
                      <div>
                          <p className={`font-bold text-sm ${event.isCurrent ? 'text-primary-600 dark:text-primary-400' : 'text-gray-800 dark:text-gray-200'}`}>{event.status}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{event.location}</p>
                          <p className="text-xs text-gray-400">{new Date(event.date).toLocaleString()}</p>
                      </div>
                   </div>
               ))}
            </div>
          </div>

          {/* Right Column: Items & Summary */}
          <div className="w-full md:w-2/3 p-6 flex flex-col">
              <div className="flex-grow space-y-4 pr-2 overflow-y-auto">
                 {order.items.map(item => (
                    <div key={item.variant_id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <img src={item.image_url} alt={item.title} className="w-20 h-20 rounded-md object-cover"/>
                        <div className="flex-1">
                           <p className="font-bold">{item.title}</p>
                           <p className="text-sm text-gray-500 dark:text-gray-400">{Object.values(item.variant_options).join(' / ')}</p>
                           <p className="text-sm">{`Qty: ${item.quantity}`}</p>
                           <p className="font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex flex-col items-end justify-center space-y-2">
                           {order.status === 'Delivered' && (
                               <>
                                <button onClick={() => handleBuyAgain(item)} className="text-xs font-bold bg-primary-600 text-white px-3 py-1.5 rounded-md hover:bg-primary-700 flex items-center gap-1 w-full justify-center"><ShoppingCartIcon className="h-3 w-3"/> Buy Again</button>
                                <button className="text-xs font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1 w-full justify-center"><PencilIcon className="h-3 w-3"/> Review</button>
                               </>
                           )}
                           {order.status === 'Shipped' && (
                                <button className="text-xs font-bold bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1 w-full justify-center"><ArrowUturnLeftIcon className="h-3 w-3"/> Return Item</button>
                           )}
                        </div>
                    </div>
                 ))}
              </div>
              
              <div className="flex-shrink-0 pt-6 border-t border-gray-200 dark:border-gray-700 mt-4">
                  <div className="flex justify-between text-sm mb-2">
                     <span className="text-gray-500">Subtotal</span>
                     <span className="font-medium">{formatPrice(order.items.reduce((sum, i) => sum + i.price * i.quantity, 0))}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                     <span className="text-gray-500">Shipping & Fees</span>
                     <span className="font-medium">{formatPrice(5.00)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                     <span>Total</span>
                     <span>{formatPrice(order.total_amount)}</span>
                  </div>
                  
                  {isCancellable && (
                      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                           <button 
                             onClick={handleCancelOrder}
                             disabled={isCancelling}
                             className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 font-bold py-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50"
                           >
                              {isCancelling ? (
                                  <>
                                      <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                      <span>Processing...</span>
                                  </>
                              ) : (
                                  <>
                                      <ExclamationTriangleIcon className="h-5 w-5"/>
                                      <span>Cancel Order</span>
                                  </>
                              )}
                           </button>
                           <p className="text-xs text-center mt-2 text-gray-400">You can cancel before the package is out for delivery.</p>
                      </div>
                  )}
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;