import React, { useEffect } from 'react';
import { X, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { gsap } from 'gsap';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.menu-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [isOpen]);

  const menuItems = [
    { label: 'Shop All', page: 'shop' },
    { label: 'New Arrivals', page: 'explore' },
    { label: 'Collections', page: 'explore' },
    { label: 'Brands', page: 'brands' },
    { label: 'Gift Cards', page: 'shop' },
    { label: 'About Us', page: 'profile' },
    { label: 'Contact', page: 'profile' },
  ];

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-full max-w-sm bg-cora-white shadow-none transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cora-black/5">
            <h2 className="text-2xl font-serif font-semibold">Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-cora-black/5 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 p-6">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      onNavigate(item.page);
                      onClose();
                    }}
                    className="menu-item w-full text-left px-4 py-4 rounded-none text-lg font-medium text-cora-black hover:bg-cora-cream hover:text-cora-red transition-all duration-300 group"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cora-red transition-all duration-300 group-hover:w-full" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-6 border-t border-cora-black/5 bg-cora-cream/30">
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-cora-gray">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@cora.jewelry</span>
              </div>
              <div className="flex items-center gap-3 text-cora-gray">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (212) 555-0138</span>
              </div>
              <div className="flex items-center gap-3 text-cora-gray">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="p-3 rounded-none bg-cora-black/5 hover:bg-cora-red hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-none bg-cora-black/5 hover:bg-cora-red hover:text-white transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-none bg-cora-black/5 hover:bg-cora-red hover:text-white transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
