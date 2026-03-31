import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import FloatingBottomBar from './components/FloatingBottomBar';
import SideMenu from './components/SideMenu';
import ShopPage from './pages/ShopPage';
import ExplorePage from './pages/ExplorePage';
import BrandsPage from './pages/BrandsPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [activeTab, setActiveTab] = useState('shop');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      gsap.fromTo('.main-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Page transition animation
    gsap.fromTo('.page-content',
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activeTab]);

  const renderPage = () => {
    switch (activeTab) {
      case 'shop':
        return <ShopPage />;
      case 'explore':
        return <ExplorePage />;
      case 'brands':
        return <BrandsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <ShopPage />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#F4F2EE] flex flex-col items-center justify-center z-50">
        <div className="animate-[fade-in_0.6s_ease-out_forwards]">
          <h1 className="text-6xl font-serif font-semibold text-cora-black tracking-tighter select-none">
            Cora<span className="text-cora-red">.</span>
          </h1>
          <p className="text-center text-cora-gray text-xs uppercase tracking-[0.35em] mt-3">
            Bijoux d'exception
          </p>
        </div>
        <div className="absolute bottom-16 flex gap-1.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cora-black/20 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="main-content min-h-screen bg-cora-white">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Header */}
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      
      {/* Side Menu */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onNavigate={setActiveTab}
      />
      
      {/* Main Content — padding bottom accounts for floating bar height + safe area */}
      <main
        className="page-content"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }}
      >
        {renderPage()}
      </main>
      
      {/* Floating Bottom Bar */}
      <FloatingBottomBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
