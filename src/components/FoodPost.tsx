import { Star, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Chef {
  id: string;
  name: string;
  avatar: string;
  type: 'home-chef' | 'restaurant';
}

interface FoodPostProps {
  id: string;
  chef: Chef;
  image: string;
  title: string;
  description: string;
  averageRating: number;
  totalReviews: number;
  onReviewClick: () => void;
}

export default function FoodPost({
  chef,
  image,
  title,
  description,
  averageRating,
  totalReviews,
  onReviewClick,
}: FoodPostProps) {

  const chefTypeColor =
    chef.type === 'home-chef' ? 'bg-home-chef' : 'bg-restaurant';
  const chefTypeLabel =
    chef.type === 'home-chef' ? '👨‍🍳 Home Chef' : '🏪 Restaurant';

  return (
    <motion.div
      className="bg-white border-b border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chef Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={chef.avatar}
            alt={chef.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">
              {chef.name}
            </h3>
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white ${chefTypeColor}`}
            >
              {chefTypeLabel}
            </span>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <span className="text-2xl">⋯</span>
        </button>
      </div>

      {/* Food Image */}
      <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        {/* Rating and Review Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
              ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          <motion.button
            onClick={onReviewClick}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-fasteat-red hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Review
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
