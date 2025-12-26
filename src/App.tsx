import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import FeedPage from './pages/FeedPage';
import DiscoveryPage from './pages/DiscoveryPage';
import CartPage from './pages/CartPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-white overflow-hidden">
        {/* Sidebar for Desktop/Tablet */}
        <Sidebar />

        <div className="flex flex-col flex-1 relative min-w-0">
          <TopNav />
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <div className="max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/discovery" element={<DiscoveryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </div>
          </main>
          {/* Bottom Nav for Mobile */}
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}
