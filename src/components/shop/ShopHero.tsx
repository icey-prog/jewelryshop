import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ShopHeroProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
}

const ShopHero: React.FC<ShopHeroProps> = ({ heroRef }) => {
  return (
    <div ref={heroRef} className="relative h-[58vh] sm:h-[70vh] min-h-[400px] overflow-hidden">
      <img
        src="/hero-model.jpg"
        alt="Collection Cora"
        className="w-full h-full object-cover scale-[1.02]"
      />
      {/* Layered gradient: dark bottom + directional */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="shop-hero-content absolute inset-0 flex flex-col justify-end px-5 sm:px-[7vw] pb-10 sm:pb-14">
        <div className="max-w-lg">
          <span className="inline-flex items-center px-3 py-1 bg-cora-red/90 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-[0.25em] rounded-full mb-4">
            Nouvelle Collection
          </span>
          <h1 className="text-[clamp(2.2rem,8vw,4.5rem)] font-serif font-semibold text-white mb-3 leading-[1.08] tracking-tight">
            L'Élégance<br />du Burkina
          </h1>
          <p className="text-white/75 text-sm sm:text-base mb-6 max-w-sm text-balance leading-relaxed">
            Des bijoux uniques façonnés avec amour par nos artisans burkinabè
          </p>
          <button className="inline-flex items-center gap-2.5 bg-white text-cora-black px-5 py-3 rounded-full font-medium text-xs uppercase tracking-[0.18em] hover:bg-cora-red hover:text-white active:scale-95 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            Découvrir
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopHero;
