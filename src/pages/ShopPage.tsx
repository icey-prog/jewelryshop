import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useStore } from '../context/StoreContext';
import { products, categories } from '../data/products';

// Components
import ShopHero from '../components/shop/ShopHero';
import CategoryTabs from '../components/shop/CategoryTabs';
import ProductCard from '../components/shop/ProductCard';
import FilterPanel from '../components/shop/FilterPanel';
import Notification from '../components/shop/Notification';

const ShopPage: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic entrance animate
    gsap.fromTo('.shop-hero-content',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    gsap.fromTo('.product-card',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.product-card',
          start: 'top 90%'
        }
      }
    );
  }, [selectedCategory]); // Re-run when category changes

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setShowNotification(`${product.name} ajouté au panier !`);
    setTimeout(() => setShowNotification(null), 3500);
  };

  const handleToggleWishlist = (productId: number, productName: string) => {
    toggleWishlist(productId);
    const isAdding = !isInWishlist(productId);
    setShowNotification(
      isAdding ? `${productName} ajouté aux favoris !` : `${productName} retiré des favoris`
    );
    setTimeout(() => setShowNotification(null), 3500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Notification message={showNotification} />

      <ShopHero heroRef={heroRef} />

      <CategoryTabs 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <FilterPanel 
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        onPriceFilter={() => {}} // Placeholder logic
      />

      <div ref={productsRef} className="pb-12 px-4 sm:px-[7vw] safe-area-x">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isHovered={hoveredProduct === product.id}
              isInWishlist={isInWishlist(product.id)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onAddToCart={() => handleAddToCart(product)}
              onToggleWishlist={() => handleToggleWishlist(product.id, product.name)}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-serif italic text-cora-gray text-xl">Aucun bijou trouvé dans cette catégorie</p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-6 text-cora-red font-medium border-b border-cora-red pb-1 uppercase tracking-widest text-xs"
            >
              Voir toute la collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
