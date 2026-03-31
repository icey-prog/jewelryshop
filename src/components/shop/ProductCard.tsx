import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../data/products';
import type { Product } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  isHovered?: boolean;
  isInWishlist: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  onMouseEnter,
  onMouseLeave,
  onAddToCart,
  onToggleWishlist
}) => {
  return (
    <div
      className="product-card group relative bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/[0.04] transition-all duration-500 active:scale-[0.97]"
      style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cora-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {product.isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-cora-red text-white text-[9px] font-semibold uppercase tracking-[0.18em] rounded-full">
            Nouveau
          </span>
        )}

        {/* Heart — always visible on mobile, hover-revealed on desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 active:scale-90 border border-black/[0.06] sm:opacity-0 sm:group-hover:opacity-100 sm:-translate-y-1 sm:group-hover:translate-y-0 ${
            isInWishlist ? 'opacity-100' : 'opacity-100 sm:opacity-0'
          } hover:bg-cora-red hover:text-white hover:border-cora-red`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          aria-label={isInWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isInWishlist ? 'fill-cora-red text-cora-red' : ''}`}
          />
        </button>
      </div>

      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cora-gray mb-0.5">
          {product.category === 'Rings' ? 'Bague' :
           product.category === 'Earrings' ? 'Boucles d\'oreilles' :
           product.category === 'Necklaces' ? 'Collier' :
           product.category === 'Bracelets' ? 'Bracelet' : product.category}
        </p>
        <h3 className="font-serif text-base sm:text-lg font-medium text-cora-black leading-tight mb-3 group-hover:text-cora-red transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <p className="text-cora-black font-semibold text-sm tracking-tight">
            {formatPrice(product.price)}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-cora-black text-white hover:bg-cora-red active:scale-90 transition-all duration-300"
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
