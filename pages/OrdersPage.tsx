import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchOrdersForUser } from '../services/orderService';
import { Order, OrderStatus } from '../types';
import { useLocation } from '../contexts/LocationContext';
import Spinner from '../components/Spinner';
import OrderDetailModal from '../components/OrderDetailModal';
import { 
  ArchiveBoxIcon, 
  TruckIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ChevronRightIcon, 
  InboxIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const { Link } = ReactRouterDOM as any;

type FilterType = 'Active' | 'Delivered' | 'Cancelled & Returned';

const STATUS_ICONS: Record<OrderStatus, React.ElementType> = {
  Processing: ArchiveBoxIcon,
  Shipped: TruckIcon,
  'Out for Delivery': TruckIcon,
  Delivered: CheckCircleIcon,
  Cancelled: XCircleIcon,
  Returned: XCircleIcon,
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  Processing: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  Shipped: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 animate-pulse-slow',
  'Out for Delivery': 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 animate-pulse',
  Delivered: 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  Cancelled: 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  Returned: 'text-gray-500 bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-700',
};

const OrdersPage: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('Active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { formatPrice } = useLocation();

  useEffect(() => {
    if (isAuthenticated && user) {
      setLoading(true);
      fetchOrdersForUser(user.id)
        .then(setOrders)
        .finally(() => setLoading(false));
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, isAuthenticated, authLoading]);

  const filteredOrders = useMemo(() => {
    if (filter === 'Active') {
      return orders.filter(o => ['Processing', 'Shipped', 'Out for Delivery'].includes(o.status));
    }
    if (filter === 'Delivered') {
      return orders.filter(o => o.status === 'Delivered');
    }
    return orders.filter(o => ['Cancelled', 'Returned'].includes(o.status));
  }, [orders, filter]);

  const handleOrderUpdate = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    setSelectedOrder(updatedOrder);
  };
  
  if (loading || authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  }

  if (!isAuthenticated) {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-lg">
                <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-6">
                    <LockClosedIcon className="h-8 w-8"/>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Access Your Logistics Hub</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Please sign in or create an account to view your order history, track shipments, and manage returns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/auth" className="inline-block w-full sm:w-auto bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                        Sign In
                    </Link>
                    <Link to="/auth" className="inline-block w-full sm:w-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        Create Account
                    </Link>
                </div>
             </div>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Logistics Hub</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage all your shipments in one place.</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex space-x-2 p-1 bg-gray-200 dark:bg-gray-800 rounded-lg max-w-md">
          {(['Active', 'Delivered', 'Cancelled & Returned'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all duration-300 ${
                filter === f
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow'
                  : 'text-gray-500 hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => {
              const Icon = STATUS_ICONS[order.status];
              const colorClasses = STATUS_COLORS[order.status];

              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-primary-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
                    
                    {/* Order ID */}
                    <div className="sm:col-span-1 lg:col-span-1">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Order ID</p>
                      <p className="font-mono text-sm font-bold text-gray-700 dark:text-gray-200">{order.id}</p>
                    </div>
                    
                    {/* Date */}
                    <div className="sm:col-span-1 lg:col-span-1">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date</p>
                      <p className="font-semibold text-sm">{new Date(order.date).toLocaleDateString()}</p>
                    </div>

                    {/* Total */}
                    <div className="sm:col-span-1 lg:col-span-1">
                       <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total</p>
                       <p className="font-bold text-lg text-primary-600 dark:text-primary-400">{formatPrice(order.total_amount)}</p>
                    </div>

                    {/* Item Preview */}
                    <div className="hidden lg:flex lg:col-span-1 -space-x-4 items-center">
                      {order.items.slice(0, 3).map(item => (
                         <img key={item.product_id + item.variant_id} src={item.image_url} alt={item.title} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow"/>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800 shadow">
                           +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    
                    {/* Status */}
                    <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                       <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${colorClasses}`}>
                          <Icon className="h-4 w-4" />
                          <span>{order.status}</span>
                       </div>
                    </div>
                    
                    {/* Action */}
                    <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex justify-end items-center">
                       <span className="text-sm font-bold text-gray-500 group-hover:text-primary-600">View Details</span>
                       <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-2 group-hover:text-primary-500 group-hover:translate-x-1 transition-transform"/>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <InboxIcon className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" />
              <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">No orders here</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">You don't have any {filter.toLowerCase()} orders yet.</p>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)} 
          onOrderUpdate={handleOrderUpdate}
        />
      )}
    </div>
  );
};

export default OrdersPage;