import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, Edit2 } from 'lucide-react';

interface UserProfile {
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  totalOrders: number;
  averageRating: number;
  isChef: boolean;
}

export default function ProfilePage() {
  const [profile] = React.useState<UserProfile>({
    name: 'Alex Turner',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'Food enthusiast | Always looking for the next great meal 🍽️',
    followers: 234,
    following: 145,
    totalOrders: 28,
    averageRating: 4.7,
    isChef: false,
  });

  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex flex-col h-full bg-white max-w-2xl mx-auto border-x border-gray-100 min-h-screen">
      {/* Header Background */}
      <motion.div
        className="h-24 bg-gradient-to-r from-fasteat-red to-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Profile Card */}
      <motion.div
        className="px-4 -mt-12 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex gap-4 items-start">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit2 size={18} className="text-gray-700" />
                </motion.button>
              </div>

              <p className="text-sm text-gray-600 mb-3">{profile.bio}</p>

              <div className="flex gap-2">
                {profile.isChef && (
                  <span className="px-3 py-1 bg-home-chef text-white text-xs rounded-full font-medium">
                    👨‍🍳 Chef
                  </span>
                )}
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full font-medium">
                  ⭐ {profile.averageRating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-3 gap-2 px-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: 'Following', value: profile.following },
          { label: 'Followers', value: profile.followers },
          { label: 'Orders', value: profile.totalOrders },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200"
          >
            <p className="text-lg font-bold text-fasteat-red">{stat.value}</p>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Menu Items */}
      <motion.div
        className="flex-1 px-4 space-y-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          {
            icon: <span className="text-lg">❤️</span>,
            label: 'Favorite Chefs',
            value: '12',
          },
          {
            icon: <span className="text-lg">⭐</span>,
            label: 'My Reviews',
            value: '18',
          },
          {
            icon: <span className="text-lg">📍</span>,
            label: 'Saved Locations',
            value: '5',
          },
          {
            icon: <span className="text-lg">🎁</span>,
            label: 'Rewards',
            value: '250 pts',
          },
        ].map((item, idx) => (
          <motion.button
            key={idx}
            whileHover={{ x: 4 }}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">{item.icon}</div>
              <span className="font-medium text-gray-900">{item.label}</span>
            </div>
            <span className="text-sm text-gray-600 font-semibold">
              {item.value}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="border-t border-gray-200 p-4 space-y-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-900 font-medium">
          <Settings size={18} />
          Settings & Privacy
        </button>

        <button className="w-full flex items-center justify-center gap-2 p-3 bg-red-100 hover:bg-red-200 rounded-lg transition-colors text-red-600 font-medium">
          <LogOut size={18} />
          Logout
        </button>
      </motion.div>
    </div>
  );
}
