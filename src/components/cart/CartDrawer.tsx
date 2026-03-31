import React from 'react';
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
  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-cora-black/30 backdrop-blur-sm transition-all duration-700" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute right-0 top-0 bottom-0 w-full max-w-full sm:max-w-md bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        <div className="flex flex-col h-full bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-cora-black/5">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-semibold tracking-tighter">Votre Panier</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-cora-red" />
                <p className="text-cora-gray text-[10px] uppercase tracking-[0.2em]">
                  {cartCount} article{cartCount > 1 ? 's' : ''} selectionné{cartCount > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-cora-cream hover:bg-cora-black hover:text-white transition-all duration-300 border border-cora-black/5"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-6 sm:p-8 space-y-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="mb-6 opacity-20">
                  <ShoppingBag className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-serif font-semibold italic mb-3">Votre panier est vide</h3>
                <p className="text-cora-gray text-sm mb-8 max-w-[240px] leading-relaxed">
                  Découvrez nos collections uniques et trouvez le bijou qui vous ressemble.
                </p>
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-cora-black text-white text-xs uppercase tracking-[0.3em] font-medium hover:bg-cora-red transition-all duration-500"
                >
                  Continuer vos achats
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size || 'no-size'}`} className="flex gap-4 md:gap-6 group">
                    <div className="relative w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 overflow-hidden bg-cora-cream border border-cora-black/5">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-semibold text-base sm:text-lg leading-tight group-hover:text-cora-red transition-all truncate pr-4">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-cora-gray hover:text-cora-red transition-colors p-1"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {item.size && (
                        <p className="text-[10px] uppercase tracking-widest text-cora-gray mb-2">Taille: {item.size}</p>
                      )}
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1 border border-cora-black/5 bg-cora-cream/50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 sm:p-2 hover:bg-white hover:text-cora-red transition-all touch-target disabled:opacity-20"
                            aria-label="Diminuer"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 sm:p-2 hover:bg-white hover:text-cora-red transition-all touch-target"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                        <p className="font-medium text-sm sm:text-base">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 sm:p-8 border-t border-cora-black/5 bg-cora-cream/20">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-cora-gray uppercase tracking-widest text-[10px]">Sous-total</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-cora-gray uppercase tracking-widest text-[10px]">Livraison</span>
                  <span className="text-green-600 font-medium uppercase tracking-widest text-[10px]">Gratuite</span>
                </div>
                <div className="pt-4 border-t border-cora-black/5 flex justify-between items-center">
                  <span className="font-serif font-bold text-lg sm:text-xl leading-none">Total</span>
                  <span className="text-xl sm:text-2xl font-bold tracking-tighter text-cora-red">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <button 
                className="w-full py-4 sm:py-5 bg-cora-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-cora-red transition-all duration-500 shadow-xl shadow-cora-black/10 flex items-center justify-center gap-3 group"
              >
                Payer maintenant
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
              
              <p className="mt-4 text-center text-cora-gray text-[9px] uppercase tracking-[0.1em] opacity-60">
                Paiement sécurisé via Orange Money, Moov ou Carte Bancaire
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
