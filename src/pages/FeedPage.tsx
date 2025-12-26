import { useState } from 'react';
import { motion } from 'framer-motion';
import FoodPost from '../components/FoodPost';
import ReviewThread from '../components/ReviewThread';

interface Chef {
  id: string;
  name: string;
  avatar: string;
  type: 'home-chef' | 'restaurant';
}

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

interface FoodItem {
  id: string;
  chef: Chef;
  image: string;
  title: string;
  description: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export default function FeedPage() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [feedData, setFeedData] = useState<FoodItem[]>([
    {
      id: '1',
      chef: {
        id: 'chef1',
        name: 'Sarah Johnson',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        type: 'home-chef',
      },
      image:
        'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop',
      title: 'Homemade Butter Chicken',
      description:
        'Creamy, authentic butter chicken made with organic spices and fresh cream. Limited portions available today!',
      averageRating: 4.8,
      totalReviews: 24,
      reviews: [
        {
          id: 'r1',
          author: 'Emma Wilson',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
          rating: 5,
          text: 'Absolutely delicious! Tastes like home cooked food. Very fresh ingredients.',
          timestamp: '2 days ago',
          replies: [
            {
              id: 'rep1',
              author: 'Sarah Johnson',
              avatar:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
              text: 'Thank you so much Emma! That means a lot. 💕',
              timestamp: '1 day ago',
            },
          ],
        },
        {
          id: 'r2',
          author: 'John Smith',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
          rating: 4,
          text: 'Great taste, but could be a bit spicier for my preference.',
          timestamp: '1 day ago',
          replies: [],
        },
      ],
    },
    {
      id: '2',
      chef: {
        id: 'chef2',
        name: 'Mario\'s Pizzeria',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        type: 'restaurant',
      },
      image:
        'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=500&h=500&fit=crop',
      title: 'Classic Margherita Pizza',
      description:
        'Wood-fired pizza with fresh mozzarella, basil, and San Marzano tomatoes. Perfect for family dinner!',
      averageRating: 4.6,
      totalReviews: 156,
      reviews: [
        {
          id: 'r3',
          author: 'Lisa Chen',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
          rating: 5,
          text: 'Best pizza in town! The crust is perfectly crispy.',
          timestamp: '3 days ago',
          replies: [
            {
              id: 'rep2',
              author: 'Robert King',
              avatar:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
              text: 'I totally agree! Going back this weekend',
              timestamp: '2 days ago',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      chef: {
        id: 'chef3',
        name: 'Alex Kumar',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        type: 'home-chef',
      },
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop',
      title: 'Spiced Lentil Curry',
      description:
        'Traditional Indian lentil curry with roasted vegetables. Vegan-friendly and packed with proteins!',
      averageRating: 4.9,
      totalReviews: 42,
      reviews: [],
    },
  ]);

  const selectedPost = feedData.find((post) => post.id === selectedPostId);

  const handleAddReview = (postId: string, rating: number, text: string) => {
    setFeedData((prevData) =>
      prevData.map((post) =>
        post.id === postId
          ? {
            ...post,
            reviews: [
              ...post.reviews,
              {
                id: `r${Date.now()}`,
                author: 'Current User',
                avatar:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
                rating,
                text,
                timestamp: 'just now',
                replies: [],
              },
            ],
            totalReviews: post.totalReviews + 1,
            averageRating:
              (post.averageRating * post.totalReviews + rating) /
              (post.totalReviews + 1),
          }
          : post
      )
    );
  };

  const handleReplyToReview = (
    postId: string,
    reviewId: string,
    text: string
  ) => {
    setFeedData((prevData) =>
      prevData.map((post) =>
        post.id === postId
          ? {
            ...post,
            reviews: post.reviews.map((review) =>
              review.id === reviewId
                ? {
                  ...review,
                  replies: [
                    ...review.replies,
                    {
                      id: `rep${Date.now()}`,
                      author: 'Current User',
                      avatar:
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
                      text,
                      timestamp: 'just now',
                    },
                  ],
                }
                : review
            ),
          }
          : post
      )
    );
  };

  return (
    <div className="relative">
      {/* Feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="divide-y divide-gray-200 max-w-2xl mx-auto"
      >
        {feedData.map((post) => (
          <FoodPost
            key={post.id}
            id={post.id}
            chef={post.chef}
            image={post.image}
            title={post.title}
            description={post.description}
            averageRating={post.averageRating}
            totalReviews={post.totalReviews}
            onReviewClick={() => setSelectedPostId(post.id)}
          />
        ))}
      </motion.div>

      {/* Review Modal Overlay */}
      {selectedPostId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPostId(null)}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center md:justify-center"
        >
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full md:w-2xl md:max-h-[90vh] bg-white rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl"
          >
            {selectedPost && (
              <ReviewThread
                postId={selectedPost.id}
                reviews={selectedPost.reviews}
                onAddReview={(rating, text) =>
                  handleAddReview(selectedPost.id, rating, text)
                }
                onReplyToReview={(reviewId, text) =>
                  handleReplyToReview(selectedPost.id, reviewId, text)
                }
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
