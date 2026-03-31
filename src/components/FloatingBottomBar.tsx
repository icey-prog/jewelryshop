import React, { useState, useEffect, useRef } from 'react';
import { Home, Compass, Tag, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FloatingBottomBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FloatingBottomBar: React.FC<FloatingBottomBarProps> = ({ activeTab, onTabChange }) => {
  const { cartCount } = useStore();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollYRef.current || currentScrollY <= 80);
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'shop', icon: Home, label: 'Boutique' },
    { id: 'explore', icon: Compass, label: 'Explorer' },
    { id: 'brands', icon: Tag, label: 'Marques' },
    { id: 'profile', icon: User, label: 'Profil' },
  ];

  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    /* Outer wrapper: fixed to bottom, handles safe-area padding, centers the pill */
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
    >
      {/* Pill — animated in/out as a unit */}
      <div
        className={`pointer-events-auto transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[140%] opacity-0 scale-95'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        <div
          className="relative bg-white/92 backdrop-blur-2xl rounded-[28px] border border-black/[0.06] overflow-hidden"
          style={{
            width: 'min(calc(100vw - 32px), 380px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          {/* Active tab sliding pill */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-[20px] bg-cora-red/[0.09] transition-all duration-[380ms]"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              left: `calc(${activeIndex * 25}% + 6px)`,
              width: 'calc(25% - 12px)',
            }}
          />

          <div className="flex relative px-1 py-1">
            {tabs.map(({ id, icon: Icon, label }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  className={`relative flex-1 flex flex-col items-center justify-center py-2.5 gap-[3px] select-none transition-all duration-300 active:scale-90 rounded-[20px] ${
                    isActive ? 'text-cora-red' : 'text-[#9A9691]'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  aria-label={label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="relative">
                    <Icon
                      className={`transition-all duration-300 ${
                        isActive ? 'w-[22px] h-[22px] stroke-[2.5px]' : 'w-[20px] h-[20px] stroke-[1.75px]'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    />
                    {id === 'shop' && cartCount > 0 && (
                      <span className="absolute -top-2 -right-2.5 w-[18px] h-[18px] bg-cora-red text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium tracking-wide transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-55'
                  }`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingBottomBar;
