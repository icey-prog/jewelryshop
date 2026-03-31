import React, { useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../data/products';
import type { CartItem } from '../../context/StoreContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
  totalPrice: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  cartCount,
  totalPrice
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);
  const currentYRef = useRef(0);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Swipe-down-to-dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current === null) return;
    const delta = e.touches[0].clientY - startYRef.current;
    if (delta > 0 && sheetRef.current) {
      currentYRef.current = delta;
      sheetRef.current.style.transform = `translateY(${delta}px)`;
      sheetRef.current.style.transition = 'none';
    }
  };

  const handleTouchEnd = () => {
    if (!sheetRef.current) return;
    sheetRef.current.style.transition = '';
    if (currentYRef.current > 120) {
      onClose();
    } else {
      sheetRef.current.style.transform = '';
    }
    startYRef.current = null;
    currentYRef.current = 0;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end transition-all duration-500 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`relative w-full bg-white flex flex-col transition-transform duration-500 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          borderRadius: '28px 28px 0 0',
          maxHeight: '92dvh',
          boxShadow: '0 -8px 60px rgba(0,0,0,0.18), 0 -2px 8px rgba(0,0,0,0.06)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grabber handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-[5px] rounded-full bg-black/[0.13]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-3 pb-5 flex-shrink-0">
          <div>
            <h2 className="text-xl font-serif font-semibold tracking-tighter">Votre Panier</h2>
            <p className="text-cora-gray text-[10px] uppercase tracking-[0.2em] mt-0.5">
              {cartCount} article{cartCount > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-cora-cream border border-black/[0.06] flex items-center justify-center hover:bg-cora-black hover:text-white active:scale-90 transition-all duration-300"
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-black/[0.05] flex-shrink-0 mx-6" />

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
              <div className="w-16 h-16 rounded-full bg-cora-cream flex items-center justify-center mb-5">
                <ShoppingBag className="w-7 h-7 text-cora-gray/50" />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-2">Panier vide</h3>
              <p className="text-cora-gray text-sm mb-8 max-w-[220px] leading-relaxed">
                Découvrez nos collections uniques et trouvez le bijou qui vous ressemble.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-cora-black text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-cora-red active:scale-95 transition-all duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                Continuer les achats
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size || 'no-size'}`} className="flex gap-4 group">
                {/* Product image */}
                <div className="relative w-[72px] h-[90px] flex-shrink-0 rounded-2xl overflow-hidden bg-cora-cream">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif font-semibold text-base leading-tight truncate group-hover:text-cora-red transition-colors">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-cora-gray hover:text-cora-red hover:bg-cora-red/10 active:scale-90 transition-all flex-shrink-0"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.size && (
                    <p className="text-[10px] uppercase tracking-widest text-cora-gray">
                      Taille: {item.size}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {/* Qty stepper */}
                    <div className="flex items-center gap-0 rounded-full bg-cora-cream border border-black/[0.07] overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center hover:text-cora-red active:scale-90 transition-all disabled:opacity-30"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold [font-variant-numeric:tabular-nums]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-cora-red active:scale-90 transition-all"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="font-semibold text-sm [font-variant-numeric:tabular-nums]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 px-6 pt-4 pb-3 border-t border-black/[0.05]">
            <div className="space-y-2.5 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-cora-gray text-xs uppercase tracking-[0.18em]">Sous-total</span>
                <span className="font-medium text-sm [font-variant-numeric:tabular-nums]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cora-gray text-xs uppercase tracking-[0.18em]">Livraison</span>
                <span className="text-green-600 font-medium text-xs uppercase tracking-wide">Gratuite</span>
              </div>
              <div className="pt-3 border-t border-black/[0.05] flex justify-between items-center">
                <span className="font-serif font-bold text-lg">Total</span>
                <span className="text-xl font-bold tracking-tighter text-cora-red [font-variant-numeric:tabular-nums]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl bg-cora-black text-white text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-cora-red active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              Payer maintenant
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="mt-3 text-center text-cora-gray text-[9px] uppercase tracking-[0.1em] opacity-50">
              Orange Money · Moov · Carte Bancaire
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
