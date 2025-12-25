import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, ShoppingCart, MessageCircle, User, Bell, Star } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/discovery', icon: MapPin, label: 'Discovery' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-gray-200 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-fasteat-red rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">FastEat</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(path)
                  ? 'bg-fasteat-red text-white shadow-md shadow-fasteat-red/20 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <Icon size={24} className={isActive(path) ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'} />
              <span className="text-base text-inherit">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100">
        <button className="flex items-center gap-4 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors group">
          <div className="relative">
            <Bell size={24} className="group-hover:text-gray-900" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-fasteat-red border-2 border-white rounded-full"></span>
          </div>
          <span className="text-base group-hover:text-gray-900">Notifications</span>
        </button>
        <button className="flex items-center gap-4 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors group">
          <Star size={24} className="group-hover:text-gray-900" />
          <span className="text-base group-hover:text-gray-900">Favorites</span>
        </button>
      </div>
    </aside>
  );
}
