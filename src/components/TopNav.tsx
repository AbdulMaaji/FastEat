import React from 'react';
import { Bell, Star } from 'lucide-react';

export default function TopNav() {
  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-fasteat-red rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">FastEat</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={24} className="text-gray-800" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-fasteat-red rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Star size={24} className="text-gray-800 fill-gray-200" />
          </button>
        </div>
      </div>
    </nav>
  );
}
