import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Utensils, Award, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix for Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const CATEGORY_CHIPS = [
  { id: 1, label: '📍 Near Me', color: 'bg-blue-500' },
  { id: 2, label: '⭐ Top Rated', color: 'bg-yellow-500' },
  { id: 3, label: '👨‍🍳 Home Chefs', color: 'bg-home-chef' },
  { id: 4, label: '🏪 Restaurants', color: 'bg-restaurant' },
  { id: 5, label: '🌱 Vegan', color: 'bg-green-500' },
];

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'home-chef' | 'restaurant';
}

const SAMPLE_LOCATIONS: MapLocation[] = [
  {
    id: '1',
    name: 'Sarah Johnson - Butter Chicken',
    lat: 40.7128,
    lng: -74.006,
    type: 'home-chef',
  },
  {
    id: '2',
    name: "Mario's Pizzeria",
    lat: 40.758,
    lng: -73.9855,
    type: 'restaurant',
  },
  {
    id: '3',
    name: 'Alex Kumar - Lentil Curry',
    lat: 40.7489,
    lng: -73.968,
    type: 'home-chef',
  },
  {
    id: '4',
    name: 'Brooklyn Bagels',
    lat: 40.6782,
    lng: -73.9442,
    type: 'restaurant',
  },
];

export default function DiscoveryPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filteredLocations, setFilteredLocations] = useState(SAMPLE_LOCATIONS);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);

    if (selectedCategory === categoryId) {
      setFilteredLocations(SAMPLE_LOCATIONS);
    } else {
      // Filter based on category (simplified)
      if (categoryId === 3) {
        setFilteredLocations(
          SAMPLE_LOCATIONS.filter((loc) => loc.type === 'home-chef')
        );
      } else if (categoryId === 4) {
        setFilteredLocations(
          SAMPLE_LOCATIONS.filter((loc) => loc.type === 'restaurant')
        );
      }
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-white">
      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
            >
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Category Chips */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2 bg-gradient-to-t from-white via-white to-transparent pt-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {CATEGORY_CHIPS.map((chip) => (
            <motion.button
              key={chip.id}
              onClick={() => handleCategoryClick(chip.id)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-medium text-white whitespace-nowrap transition-all ${selectedCategory === chip.id
                  ? `${chip.color} scale-105 shadow-lg`
                  : 'bg-gray-700 hover:bg-gray-800'
                }`}
            >
              {chip.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Info Section - Side Panel on Desktop, Bottom on Mobile */}
      <motion.div
        className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-200 p-6 bg-gray-50 overflow-y-auto"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Discover Nearby Chefs
        </h2>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">👨‍🍳</div>
            <div>
              <p className="font-semibold text-gray-900">Home Chefs</p>
              <p className="text-sm text-gray-500">Authentic personal recipes from local home kitchens.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-3xl">🏪</div>
            <div>
              <p className="font-semibold text-gray-900">Restaurants</p>
              <p className="text-sm text-gray-500">Favorite professional kitchens in your neighborhood.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-3xl">⭐</div>
            <div>
              <p className="font-semibold text-gray-900">Top Rated</p>
              <p className="text-sm text-gray-500">Most loved dishes voted by the local community.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-600 mb-2">Popular Tags</p>
          <div className="flex flex-wrap gap-2">
            {['Spicy', 'Vegan', 'Dessert', 'Healthy', 'Italian'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-100">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
