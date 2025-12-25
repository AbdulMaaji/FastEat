import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  type: 'chef' | 'customer';
}

export default function MessagesPage() {
  const [conversations] = React.useState<Conversation[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: 'Your order is ready for pickup! 🎉',
      timestamp: '2m ago',
      unread: true,
      type: 'chef',
    },
    {
      id: '2',
      name: 'Mario\'s Pizzeria',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      lastMessage: 'Thank you for your 5-star review!',
      timestamp: '1h ago',
      unread: false,
      type: 'chef',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      lastMessage: 'Want to order together next time?',
      timestamp: '3h ago',
      unread: false,
      type: 'customer',
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white max-w-2xl mx-auto border-x border-gray-100">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-fasteat-red text-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-4"
          >
            <MessageCircle size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No conversations yet</p>
            <p className="text-gray-400 text-sm">
              Start ordering to chat with chefs!
            </p>
          </motion.div>
        ) : (
          filteredConversations.map((conv) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className="border-b border-gray-100 p-4 cursor-pointer transition-colors"
            >
              <div className="flex gap-3">
                <div className="relative">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conv.unread && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-fasteat-red rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`font-${conv.unread ? 'bold' : 'semibold'
                        } text-gray-900 text-sm`}
                    >
                      {conv.name}
                    </h3>
                    <span
                      className={`text-xs ${conv.unread
                          ? 'text-fasteat-red font-semibold'
                          : 'text-gray-500'
                        }`}
                    >
                      {conv.timestamp}
                    </span>
                  </div>

                  <p
                    className={`text-sm truncate ${conv.unread
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-600'
                      }`}
                  >
                    {conv.lastMessage}
                  </p>

                  {conv.type === 'chef' && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-home-chef text-white text-xs rounded-full">
                      Chef
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
