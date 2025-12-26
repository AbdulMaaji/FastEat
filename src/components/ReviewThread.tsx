import { useState } from 'react';
import { Star, Send, Heart, MessageCircle as MessageCircleIcon, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Reply {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  timestamp: string;
  replies: Reply[];
  likes?: number;
}

interface ReviewThreadProps {
  postId: string;
  reviews: Review[];
  onAddReview: (rating: number, text: string) => void;
  onReplyToReview: (reviewId: string, text: string) => void;
}

export default function ReviewThread({
  reviews,
  onAddReview,
  onReplyToReview,
}: ReviewThreadProps) {
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  const handleSubmitReview = () => {
    if (newReviewText.trim()) {
      onAddReview(newReviewRating, newReviewText);
      setNewReviewText('');
      setNewReviewRating(5);
    }
  };

  const handleSubmitReply = (reviewId: string) => {
    if (replyText[reviewId]?.trim()) {
      onReplyToReview(reviewId, replyText[reviewId]);
      setReplyText({ ...replyText, [reviewId]: '' });
    }
  };

  const toggleLike = (reviewId: string) => {
    const newLiked = new Set(likedReviews);
    if (newLiked.has(reviewId)) {
      newLiked.delete(reviewId);
    } else {
      newLiked.add(reviewId);
    }
    setLikedReviews(newLiked);
  };

  // Calculate rating stats
  const ratingStats = {
    average: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0',
    total: reviews.length,
    distribution: [5, 4, 3, 2, 1].map(rating => 
      reviews.filter(r => r.rating === rating).length
    )
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-h-[85vh] flex flex-col border border-gray-100">
      {/* Modern Header with Stats */}
      <div className="bg-gradient-to-r from-fasteat-red to-red-500 text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Left: Rating Summary */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{ratingStats.average}</span>
                <span className="text-lg opacity-90">/5.0</span>
              </div>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(parseFloat(ratingStats.average))
                        ? 'fill-yellow-300 text-yellow-300'
                        : 'text-white/30'
                    }
                  />
                ))}
              </div>
              <p className="text-sm opacity-90 mt-2">
                {ratingStats.total} {ratingStats.total === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            {/* Right: Rating Distribution */}
            <div className="space-y-1.5">
              {[5, 4, 3, 2, 1].map((stars, idx) => (
                <div key={stars} className="flex items-center gap-2 text-xs">
                  <span className="w-4">{stars}</span>
                  <div className="w-16 h-2 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-300 transition-all duration-300"
                      style={{
                        width: `${(ratingStats.distribution[idx] / ratingStats.total) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="w-6 text-right">{ratingStats.distribution[idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List - Instagram Style */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 px-4"
          >
            <div className="text-5xl mb-3">💬</div>
            <p className="text-gray-600 font-medium text-center">No reviews yet</p>
            <p className="text-gray-400 text-sm text-center mt-1">Be the first to share your thoughts!</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Review Header - Instagram Style */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-fasteat-red/20"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">
                        {review.author}
                      </p>
                      <p className="text-xs text-gray-500">{review.timestamp}</p>
                    </div>
                  </div>
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                  {review.text}
                </p>

                {/* Action Buttons - Facebook/Instagram Style */}
                <div className="flex items-center justify-between text-gray-600 text-xs mb-3 pb-3 border-b border-gray-100">
                  <button
                    onClick={() => toggleLike(review.id)}
                    className="flex items-center gap-1.5 hover:text-fasteat-red transition-colors group"
                  >
                    <Heart
                      size={16}
                      className={likedReviews.has(review.id) ? 'fill-fasteat-red text-fasteat-red' : 'group-hover:fill-fasteat-red/20'}
                    />
                    <span className="text-xs font-medium">
                      {(review.likes || 0) + (likedReviews.has(review.id) ? 1 : 0)}
                    </span>
                  </button>

                  <motion.button
                    onClick={() =>
                      setExpandedReviewId(
                        expandedReviewId === review.id ? null : review.id
                      )
                    }
                    className="flex items-center gap-1.5 hover:text-fasteat-red transition-colors group"
                  >
                    <MessageCircleIcon size={16} className="group-hover:fill-fasteat-red/20" />
                    <span className="font-medium">
                      {review.replies.length}
                    </span>
                  </motion.button>

                  <button className="flex items-center gap-1.5 hover:text-fasteat-red transition-colors group">
                    <Share2 size={16} className="group-hover:fill-fasteat-red/20" />
                  </button>
                </div>

                {/* Replies Section - Modern Nested Design */}
                <AnimatePresence>
                  {expandedReviewId === review.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 mt-3"
                    >
                      {/* Existing Replies */}
                      {review.replies.length > 0 && (
                        <div className="space-y-2.5 pl-6 border-l-2 border-fasteat-red/30">
                          {review.replies.map((reply) => (
                            <motion.div
                              key={reply.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 rounded-xl"
                            >
                              <div className="flex items-start gap-2">
                                <img
                                  src={reply.avatar}
                                  alt={reply.author}
                                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-fasteat-red/10"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-baseline gap-2">
                                    <p className="font-semibold text-gray-900 text-xs">
                                      {reply.author}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      {reply.timestamp}
                                    </p>
                                  </div>
                                  <p className="text-xs text-gray-700 mt-1">
                                    {reply.text}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input - Modern Design */}
                      <div className="flex gap-2 mt-3 pl-6">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser"
                          alt="You"
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyText[review.id] || ''}
                            onChange={(e) =>
                              setReplyText({
                                ...replyText,
                                [review.id]: e.target.value,
                              })
                            }
                            className="flex-1 px-3 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs focus:outline-none focus:border-fasteat-red focus:ring-1 focus:ring-fasteat-red/20 transition-all"
                          />
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSubmitReply(review.id)}
                            disabled={!replyText[review.id]?.trim()}
                            className="bg-fasteat-red hover:bg-red-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                          >
                            <Send size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Review Section - Modern Sticky Bottom */}
      <div className="border-t border-gray-100 p-4 bg-gradient-to-b from-gray-50 to-white sticky bottom-0">
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-700 block mb-2.5 uppercase tracking-wide">
            Rate Your Experience
          </label>
          <div className="flex gap-2.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setNewReviewRating(star)}
                className="transition-transform"
              >
                <Star
                  size={28}
                  className={
                    star <= newReviewRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative mb-3">
          <textarea
            placeholder="Share your experience... (be nice! 😊)"
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-fasteat-red focus:ring-2 focus:ring-fasteat-red/10 resize-none bg-white transition-all"
            rows={3}
          />
          <span className="absolute bottom-2 right-3 text-xs text-gray-400">
            {newReviewText.length}/500
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmitReview}
          disabled={!newReviewText.trim()}
          className="w-full bg-gradient-to-r from-fasteat-red to-red-500 hover:from-red-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
        >
          Post Review
        </motion.button>
      </div>
    </div>
  );
}
