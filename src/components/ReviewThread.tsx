import React, { useState } from 'react';
import { Star, Send, ReplyIcon } from 'lucide-react';
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
}

interface ReviewThreadProps {
  postId: string;
  reviews: Review[];
  onAddReview: (rating: number, text: string) => void;
  onReplyToReview: (reviewId: string, text: string) => void;
}

export default function ReviewThread({
  postId,
  reviews,
  onAddReview,
  onReplyToReview,
}: ReviewThreadProps) {
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-bold text-gray-900">Reviews & Feedback</h2>
        <p className="text-sm text-gray-600">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      {/* Reviews List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {reviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-gray-500">No reviews yet. Be the first!</p>
            </motion.div>
          ) : (
            reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="border border-gray-200 rounded-lg p-3 bg-gray-50"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {review.author}
                      </p>
                      <p className="text-xs text-gray-500">{review.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
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
                <p className="text-sm text-gray-700 mb-3">{review.text}</p>

                {/* Toggle Replies Button */}
                <motion.button
                  onClick={() =>
                    setExpandedReviewId(
                      expandedReviewId === review.id ? null : review.id
                    )
                  }
                  className="flex items-center gap-1 text-xs font-medium text-fasteat-red hover:text-red-700"
                >
                  <ReplyIcon size={14} />
                  {expandedReviewId === review.id
                    ? 'Hide'
                    : `Show (${review.replies.length})`}{' '}
                  replies
                </motion.button>

                {/* Replies Section */}
                <AnimatePresence>
                  {expandedReviewId === review.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-gray-300 space-y-2"
                    >
                      {/* Existing Replies */}
                      {review.replies.map((reply) => (
                        <motion.div
                          key={reply.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white p-2 rounded border-l-2 border-fasteat-red"
                        >
                          <div className="flex items-start gap-2">
                            <img
                              src={reply.avatar}
                              alt={reply.author}
                              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-900">
                                {reply.author}
                              </p>
                              <p className="text-xs text-gray-600">
                                {reply.text}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {reply.timestamp}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Reply Input */}
                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder="Reply..."
                          value={replyText[review.id] || ''}
                          onChange={(e) =>
                            setReplyText({
                              ...replyText,
                              [review.id]: e.target.value,
                            })
                          }
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-fasteat-red"
                        />
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSubmitReply(review.id)}
                          className="bg-fasteat-red hover:bg-red-600 text-white p-1 rounded transition-colors"
                        >
                          <Send size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Review Section */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="mb-3">
          <label className="text-sm font-semibold text-gray-900 block mb-2">
            Your Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileTap={{ scale: 1.2 }}
                onClick={() => setNewReviewRating(star)}
                className="transition-transform"
              >
                <Star
                  size={24}
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

        <textarea
          placeholder="Share your experience..."
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-fasteat-red resize-none"
          rows={3}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmitReview}
          disabled={!newReviewText.trim()}
          className="w-full mt-2 bg-fasteat-red hover:bg-red-600 disabled:bg-gray-300 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Post Review
        </motion.button>
      </div>
    </div>
  );
}
