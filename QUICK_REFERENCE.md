# FastEat - Quick Reference Guide

## 🚀 Get Started in 2 Steps

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

---

## 📁 Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `src/App.tsx` | Main app with routing | 26 |
| `src/components/BottomNav.tsx` | Mobile navigation | 36 |
| `src/components/TopNav.tsx` | Header bar | 27 |
| `src/components/FoodPost.tsx` | Instagram-like post | 95 |
| `src/components/ReviewThread.tsx` | Nested reviews modal | 170 |
| `src/pages/FeedPage.tsx` | Main feed with posts | 271 |
| `src/pages/DiscoveryPage.tsx` | Map view | 160 |
| `src/pages/CartPage.tsx` | Shopping cart | 125 |
| `src/pages/MessagesPage.tsx` | Messages list | 135 |
| `src/pages/ProfilePage.tsx` | User profile | 155 |

---

## 🎨 Color Palette

```javascript
FastEat Red:  #FF385C   (Primary actions, active states)
Home Chef:    #6366F1   (Indigo badges)
Restaurant:   #F59E0B   (Amber badges)
Gray:         #1F2937   (Text)
Gray Light:   #F3F4F6   (Backgrounds)
```

---

## 🔧 Common Tasks

### Add a New Post to Feed
Edit `src/pages/FeedPage.tsx`:
```typescript
const [feedData] = useState<FoodItem[]>([
  // ... existing posts
  {
    id: '4',
    chef: {
      id: 'chef4',
      name: 'New Chef Name',
      avatar: 'https://...',
      type: 'home-chef', // or 'restaurant'
    },
    image: 'https://...',
    title: 'Dish Name',
    description: 'Dish description',
    averageRating: 4.5,
    totalReviews: 10,
    reviews: [],
  },
])
```

### Change Brand Color
Edit `tailwind.config.js`:
```javascript
colors: {
  'fasteat-red': '#YOUR_HEX_CODE',
}
```

### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Add to `App.tsx`:
```typescript
<Route path="/newpage" element={<NewPage />} />
```
3. Add to `BottomNav.tsx` (if main navigation)

### Connect to Backend API
```typescript
useEffect(() => {
  fetch('https://api.example.com/posts')
    .then(r => r.json())
    .then(data => setFeedData(data))
}, [])
```

---

## 🎯 Component Props

### FoodPost Props
```typescript
interface FoodPostProps {
  id: string
  chef: { id, name, avatar, type: 'home-chef'|'restaurant' }
  image: string
  title: string
  description: string
  averageRating: number
  totalReviews: number
  onReviewClick: () => void
}
```

### ReviewThread Props
```typescript
interface ReviewThreadProps {
  postId: string
  reviews: Review[]
  onAddReview: (rating: number, text: string) => void
  onReplyToReview: (reviewId: string, text: string) => void
}
```

---

## 📊 Navigation Routes

| Route | Component | Icon | Label |
|-------|-----------|------|-------|
| `/` | FeedPage | 🏠 | Home |
| `/discovery` | DiscoveryPage | 📍 | Discovery |
| `/cart` | CartPage | 🛒 | Cart |
| `/messages` | MessagesPage | 💬 | Messages |
| `/profile` | ProfilePage | 👤 | Profile |

---

## 🎬 Framer Motion Patterns

### Page Entry Animation
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Button Tap Effect
```typescript
<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={handleClick}
>
  Click me
</motion.button>
```

### Expandable Section
```typescript
<AnimatePresence>
  {isExpanded && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

---

## 🧪 Testing Data

### Sample Reviews
```typescript
{
  id: 'r1',
  author: 'Emma Wilson',
  avatar: 'https://unsplash.com/...',
  rating: 5,
  text: 'Absolutely delicious!',
  timestamp: '2 days ago',
  replies: [
    {
      id: 'rep1',
      author: 'Sarah Johnson',
      avatar: 'https://unsplash.com/...',
      text: 'Thank you!',
      timestamp: '1 day ago',
    }
  ]
}
```

### Sample Chef
```typescript
{
  id: 'chef1',
  name: 'Sarah Johnson',
  avatar: 'https://unsplash.com/...',
  type: 'home-chef'
}
```

---

## 🔍 Debugging Tips

### Check Console Errors
```bash
npm start
# Look for compile errors in terminal
# Check browser console (F12)
```

### Reset Dependencies
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### TypeScript Errors
```bash
npx tsc --noEmit
```

### Tailwind Classes Not Working
- Ensure class is in a JSX element
- Check spelling (no typos)
- Reload browser (sometimes cache issue)

---

## 📦 Dependencies Installed

```
react 18.2.0
react-dom 18.2.0
react-router-dom 6.20.0
tailwindcss 3.4.0
framer-motion 10.16.0
lucide-react 0.292.0
react-leaflet 4.2.3
leaflet 1.9.4
typescript 5.3.0
```

---

## 🎁 What's Included

✅ **14 components** fully built
✅ **5 pages** with routing
✅ **3 sample posts** with reviews & replies
✅ **4 map locations** with filters
✅ **Responsive design** (mobile-first)
✅ **Smooth animations** (Framer Motion)
✅ **TypeScript** throughout
✅ **Tailwind CSS** styled
✅ **Sample data** included
✅ **PWA ready** (manifest.json)

---

## 🎯 Next: Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the 'build' folder
```

### Docker
```bash
docker build -t fasteat .
docker run -p 3000:3000 fasteat
```

---

## 📚 Documentation Files

- **README.md** - Full project overview
- **SETUP.md** - Installation & setup guide
- **COMPONENTS.md** - Visual hierarchy & specs
- **QUICK_REFERENCE.md** - This file!

---

## 💡 Pro Tips

1. Use Unsplash URLs for unlimited free images
2. Leaflet is free - no API keys needed
3. Tailwind utility classes = faster development
4. Framer Motion handles all animations
5. React Router handles all navigation
6. Lucide React has 400+ icons available
7. TypeScript catches bugs before runtime
8. Sample data is in component state - easy to replace with API

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Blank page | Check browser console for errors, ensure npm install completed |
| Map not showing | Verify Leaflet CSS is loaded, check network tab |
| Tailwind not working | Restart dev server, check class spelling |
| Animations janky | May be browser performance, check DevTools |
| Routes not working | Verify routes in App.tsx match BottomNav paths |
| Import errors | Run `npm install` again, check file paths |

---

**Made with ❤️ for food lovers | Ready to scale to production 🚀**
