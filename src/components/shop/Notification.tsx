import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NotificationProps {
  message: string | null;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div 
      className={`fixed top-24 right-4 z-[9999] transition-all duration-500 ease-in-out ${
        message ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-cora-black text-white px-6 py-4 shadow-2xl flex items-center gap-4 max-w-[90vw] border border-white/10 ring-1 ring-cora-black/50">
        <div className="w-10 h-10 bg-cora-red flex items-center justify-center flex-shrink-0 animate-pulse">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/50 mb-0.5">Succès</span>
          <span className="font-serif italic text-sm sm:text-base text-white tracking-wide">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;
