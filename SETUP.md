# FastEat Setup & Installation Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- React Leaflet & Leaflet for maps

### 2. Start Development Server
```bash
npm start
```

The app will open automatically at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

---

## Project Overview

### File Structure Created

```
FastEat/
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx       # Mobile bottom navigation (5 tabs)
│   │   ├── TopNav.tsx          # Header with logo & notifications
│   │   ├── FoodPost.tsx        # Instagram-like food post card
│   │   └── ReviewThread.tsx    # Nested review discussion modal
│   ├── pages/
│   │   ├── FeedPage.tsx        # Main feed (3 sample posts)
│   │   ├── DiscoveryPage.tsx   # Map view with category filters
│   │   ├── CartPage.tsx        # Shopping cart (2 sample items)
│   │   ├── MessagesPage.tsx    # Messages/conversations
│   │   └── ProfilePage.tsx     # User profile page
│   ├── App.tsx                 # Main app component with routing
│   ├── index.tsx               # React entry point
│   └── index.css               # Global Tailwind styles
├── public/
│   ├── index.html              # HTML template
│   └── manifest.json           # PWA manifest
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Full documentation
```

---

## Component Details

### 1. **BottomNav Component**
- Fixed at bottom of screen
- 5 navigation items: Home, Discovery, Cart, Messages, Profile
- Active state shows FastEat Red (#FF385C)
- Lucide React icons with labels
- Mobile-first design

### 2. **TopNav Component**
- Sticky header with white background
- Left side: FastEat logo (red circle with "F")
- Right side: Notification bell + Favorite Chef star
- Red dot indicator on notification bell

### 3. **FoodPost Component**
- Chef header with avatar, name, and type badge
- Type badges: 👨‍🍳 Home Chef (Indigo) or 🏪 Restaurant (Amber)
- Large food image with hover scale animation
- 5-star rating display with review count
- Red "Review" button to open discussion modal
- Framer Motion entry animation

### 4. **ReviewThread Component** ⭐ (Key Feature)
- **Modal dialog** for posting reviews
- Star rating selector (1-5)
- Review text input
- List of existing reviews
- **Expandable reply sections** - each review can have nested replies
- Reply input field under each review
- AnimatePresence for smooth transitions
- Sample data with pre-populated reviews

### 5. **FeedPage**
- Displays multiple FoodPost components
- Modal overlay for ReviewThread
- Sample data: 3 posts (2 Home Chefs, 1 Restaurant)
- Post 1: Sarah Johnson - Butter Chicken (4.8 ⭐, 24 reviews with replies)
- Post 2: Mario's Pizzeria - Margherita Pizza (4.6 ⭐, 156 reviews)
- Post 3: Alex Kumar - Lentil Curry (4.9 ⭐, 42 reviews)

### 6. **DiscoveryPage**
- Full-screen interactive map using React Leaflet
- Centered on New York area (40.7128, -74.006)
- 4 sample location markers
- Floating category filter chips:
  - 📍 Near Me
  - ⭐ Top Rated
  - 👨‍🍳 Home Chefs
  - 🏪 Restaurants
  - 🌱 Vegan
- Bottom info section explaining chef types
- Uses OpenStreetMap (free, no API key needed)

### 7. **CartPage**
- Shopping cart with 2 sample items
- Quantity controls (+/-)
- Delete buttons
- Price calculations (subtotal, tax 8%, total)
- Checkout button
- Empty state when no items

### 8. **MessagesPage**
- Conversation list with 3 sample chats
- Search bar for filtering conversations
- Unread indicators (red dot)
- Last message preview
- Chef/Customer type badges
- Empty state messaging

### 9. **ProfilePage**
- User profile card with avatar
- Follower/Following/Orders stats
- 4 menu items:
  - ❤️ Favorite Chefs (12)
  - ⭐ My Reviews (18)
  - 📍 Saved Locations (5)
  - 🎁 Rewards (250 pts)
- Settings & Privacy button
- Logout button
- Gradient header background

---

## Design System

### Colors
```javascript
- FastEat Red: #FF385C (primary, CTAs, active states)
- Home Chef: #6366F1 (indigo, home chef badges)
- Restaurant: #F59E0B (amber, restaurant badges)
- White: #FFFFFF (backgrounds)
- Gray 50-900: Full grayscale for text & borders
```

### Typography
- Font Family: Inter, system-ui, sans-serif
- Sizes: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px)
- Weights: Normal (400), Medium (500), Semibold (600), Bold (700)

### Spacing
- Uses Tailwind's default 4px base unit
- Padding: p-2, p-3, p-4 commonly used
- Gaps: gap-2, gap-3, gap-4 for spacing children

### Shadows & Borders
- Subtle shadows for elevation
- 1px borders in gray-200/300 for separation
- Rounded corners: rounded-full (avatars), rounded-lg (cards)

---

## Key Features Implemented

### ✅ Mobile-First Navigation
- Bottom navigation bar with 5 routes
- Responsive page transitions
- Active route highlighting

### ✅ Food Feed (Instagram-like)
- Beautiful post cards with images
- Chef identity badges (Home Chef vs Restaurant)
- 5-star rating system
- Review count display

### ✅ Nested Review Discussion System
- Review modal with full discussion
- Star rating selector for new reviews
- Expandable reply threads
- Each reply shows author, text, timestamp
- Real-time optimistic UI updates

### ✅ Discovery Map
- Interactive map with markers
- Category filter chips
- Sample locations
- OpenStreetMap integration (free)

### ✅ Shopping Cart
- Quantity management
- Price calculations
- Item removal
- Checkout ready

### ✅ Messaging
- Conversation list
- Unread status
- Search functionality
- User type badges

### ✅ User Profile
- Stats display (followers, orders, rating)
- Profile customization menu
- Favorite chefs tracking
- Rewards system

### ✅ Animations & Transitions
- Framer Motion for smooth animations
- Page transition effects
- Modal sliding animation
- Expandable sections with AnimatePresence
- Hover state interactions

---

## Sample Data

### Posts
```typescript
// Post 1: Home Chef
- Chef: Sarah Johnson (Home Chef)
- Food: Homemade Butter Chicken
- Rating: 4.8/5 (24 reviews)
- Reviews: 2 reviews with nested replies

// Post 2: Restaurant
- Chef: Mario's Pizzeria (Restaurant)
- Food: Classic Margherita Pizza
- Rating: 4.6/5 (156 reviews)
- Reviews: 1 review with reply

// Post 3: Home Chef
- Chef: Alex Kumar (Home Chef)
- Food: Spiced Lentil Curry
- Rating: 4.9/5 (42 reviews)
- Reviews: 0 reviews (empty state demo)
```

### Map Locations
- Sarah Johnson - Butter Chicken (40.7128, -74.006)
- Mario's Pizzeria (40.758, -73.9855)
- Alex Kumar - Lentil Curry (40.7489, -73.968)
- Brooklyn Bagels (40.6782, -73.9442)

### Cart Items
- Butter Chicken ($12.99) x1 - Sarah Johnson
- Margherita Pizza ($15.99) x2 - Mario's Pizzeria

### Messages
- Sarah Johnson (unread, chef)
- Mario's Pizzeria (read, chef)
- Emma Wilson (read, customer)

---

## Customization Guide

### Change Brand Color
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'fasteat-red': '#FF385C', // Change this
    }
  }
}
```

### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Export component as default
3. Add route in `App.tsx`:
```typescript
<Route path="/newpage" element={<NewPage />} />
```
4. Add to BottomNav (optional)

### Connect Real API
Replace sample data in page components:
```typescript
// Instead of:
const [feedData] = useState([...])

// Use:
const [feedData, setFeedData] = useState([])

useEffect(() => {
  fetch('/api/posts')
    .then(r => r.json())
    .then(data => setFeedData(data))
}, [])
```

---

## Deployment Ready

The app is configured for production deployment:
- TypeScript for type safety
- Tailwind CSS minification
- React Router for SPA routing
- PWA manifest for app install
- Optimized Leaflet bundle

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Connect build/ folder to Netlify
```

---

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm start`
3. 📝 Test all navigation flows
4. 🎨 Customize colors/branding
5. 🔗 Connect to backend API
6. 👤 Add authentication
7. 💳 Integrate payment processing
8. 📤 Deploy to production

---

## Support

For issues or questions:
1. Check TypeScript errors in terminal
2. Clear cache: `rm -rf node_modules && npm install`
3. Review component props and types
4. Check Tailwind CSS docs for styling help
5. Refer to Framer Motion docs for animations

**Happy coding! 🚀**
