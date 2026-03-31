import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  onPriceFilter: (range: string | null) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  isFilterOpen, 
  setIsFilterOpen,
  onPriceFilter
}) => {
  return (
    <div className="py-6 sm:py-8 border-t border-cora-black/5 safe-area-x px-4 sm:px-[7vw]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-semibold">Tous nos bijoux</h2>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border transition-all duration-300 touch-target uppercase tracking-[0.2em] text-[10px] sm:text-xs ${
              isFilterOpen 
                ? 'bg-cora-black text-white border-cora-black' 
                : 'bg-transparent border-cora-black/20 hover:border-cora-black'
            }`}
          >
            <Filter className="w-3.5 h-3.5 sm:w-4 h-4" />
            <span className="hidden sm:inline">Filtrer</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isFilterOpen ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cora-cream border border-cora-black/5 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-cora-black mb-4">Prix</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Moins de 300K", range: "<300" },
                  { label: "300K - 600K", range: "300-600" },
                  { label: "Plus de 600K", range: ">600" }
                ].map((price) => (
                  <button 
                    key={price.range}
                    onClick={() => onPriceFilter(price.range)}
                    className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] border border-cora-black/10 hover:border-cora-black/40 hover:bg-white text-cora-gray hover:text-cora-black transition-all duration-300"
                  >
                    {price.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-cora-black mb-4">Trier par</p>
              <select className="bg-transparent border-b border-cora-black/10 w-full py-2 focus:outline-none focus:border-cora-red text-xs tracking-wider uppercase">
                <option>Plus récents</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
