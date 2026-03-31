import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import CartDrawer from './cart/CartDrawer';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-2xl border-b border-black/[0.06]'
            : 'bg-transparent'
        }`}
        style={{
          paddingTop: `calc(env(safe-area-inset-top, 0px) + ${isScrolled ? '12px' : '20px'})`,
          paddingBottom: isScrolled ? '12px' : '20px',
        }}
      >
        <div className="px-4 sm:px-[7vw] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 group ${
                isScrolled
                  ? 'bg-cora-cream border border-black/[0.06] hover:bg-cora-red hover:text-white hover:border-cora-red'
                  : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/40'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              aria-label="Menu"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
            <button
              className={`hidden sm:flex w-10 h-10 rounded-full items-center justify-center transition-all duration-300 active:scale-90 ${
                isScrolled
                  ? 'bg-cora-cream border border-black/[0.06] hover:bg-cora-red hover:text-white hover:border-cora-red'
                  : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/40'
              }`}
              aria-label="Recherche"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          <h1 className={`font-serif font-bold tracking-tighter select-none transition-all duration-500 ${
            isScrolled
              ? 'text-2xl text-cora-black'
              : 'text-3xl text-white'
          }`}>
            Cora<span className="text-cora-red">.</span>
          </h1>

          <div className="flex items-center gap-3">
            <button
              className={`sm:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${
                isScrolled
                  ? 'bg-cora-cream border border-black/[0.06]'
                  : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white'
              }`}
              aria-label="Recherche"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-cora-black text-white flex items-center justify-center hover:bg-cora-red active:scale-90 transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              aria-label={`Panier (${cartCount} articles)`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-cora-red text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartCount={cartCount}
        totalPrice={cartTotal}
      />
    </>
  );
};

export default Header;
