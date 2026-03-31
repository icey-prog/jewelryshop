import React from 'react';

interface CategoryTabsProps {
  categories: Array<{ name: string; count: number }>;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="py-5 sm:py-7 border-b border-cora-black/[0.06]">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 px-4 sm:px-[7vw]">
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 active:scale-95 whitespace-nowrap ${
            selectedCategory === null
              ? 'bg-cora-black text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
              : 'bg-white text-cora-gray border border-black/10 hover:border-black/30 hover:text-cora-black'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 active:scale-95 whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === cat.name
                ? 'bg-cora-black text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
                : 'bg-white text-cora-gray border border-black/10 hover:border-black/30 hover:text-cora-black'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            {cat.name === 'Rings' ? 'Bagues' :
             cat.name === 'Earrings' ? 'Boucles' :
             cat.name === 'Necklaces' ? 'Colliers' :
             cat.name === 'Bracelets' ? 'Bracelets' :
             cat.name === 'Watches' ? 'Montres' : 'Cadeaux'}
            <span className={`text-[10px] ${selectedCategory === cat.name ? 'opacity-60' : 'opacity-50'}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
