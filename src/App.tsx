import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import FeedPage from './pages/FeedPage';
import DiscoveryPage from './pages/DiscoveryPage';
import CartPage from './pages/CartPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-white">
        <TopNav />
        <div className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}
