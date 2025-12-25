import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  chef: string;
}

export default function CartPage() {
  const [items, setItems] = React.useState<CartItem[]>([
    {
      id: '1',
      name: 'Butter Chicken',
      price: 12.99,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=80&h=80&fit=crop',
      chef: 'Sarah Johnson',
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      price: 15.99,
      quantity: 2,
      image:
        'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=80&h=80&fit=crop',
      chef: "Mario's Pizzeria",
    },
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setItems(
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-sm text-gray-600 mt-1">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-400 text-sm">
              Start adding food items from the feed
            </p>
          </motion.div>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="flex gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600">{item.chef}</p>
                <p className="text-sm font-semibold text-fasteat-red mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <Minus size={16} className="text-gray-600" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={() => updateQuantity(item.id, 0)}
                  className="p-1 hover:bg-white rounded transition-colors ml-2"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      {items.length > 0 && (
        <motion.div
          className="border-t border-gray-200 p-4 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span className="text-fasteat-red">${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-fasteat-red hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors">
            Proceed to Checkout
          </button>
        </motion.div>
      )}
    </div>
  );
}
