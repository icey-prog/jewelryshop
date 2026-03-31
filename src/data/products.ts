import type { Product } from '../context/StoreContext';

// Prix en FCFA (Franc CFA BCEAO)
// 1 EUR ≈ 655.957 FCFA
export const products: Product[] = [
  {
    id: 1,
    name: 'Wend Puisse',
    price: 275500, // ~420€
    image: '/wishlist-1.jpg',
    category: 'Earrings',
    description: 'Boucles d\'oreilles puces en or avec rubis burkinabè'
  },
  {
    id: 2,
    name: 'Naba Bracelet',
    price: 249200, // ~380€
    image: '/wishlist-2.jpg',
    category: 'Bracelets',
    description: 'Bracelet tennis en or 18K avec rubis authentiques'
  },
  {
    id: 3,
    name: 'Poko Pendant',
    price: 193500, // ~295€
    image: '/wishlist-3.jpg',
    category: 'Necklaces',
    description: 'Pendentif traditionnel avec rubis ovale'
  },
  {
    id: 4,
    name: 'Larlé Naaba',
    price: 846000, // ~1290€
    image: '/featured-ring.jpg',
    category: 'Rings',
    isNew: true,
    description: 'Bague royale en or avec rubis burkinabè'
  },
  {
    id: 5,
    name: 'Lumière du Sahel',
    price: 163300, // ~249€
    image: '/new-arrival.jpg',
    category: 'Necklaces',
    isNew: true,
    description: 'Pendentif goutte en or avec rubis'
  },
  {
    id: 6,
    name: 'Reflection Mogho',
    price: 8723000, // ~13300€
    image: '/detail-ring-1.jpg',
    category: 'Rings',
    description: 'Bague de fiançailles en or blanc avec diamant'
  },
  {
    id: 7,
    name: 'Roi des Mossi',
    price: 3411000, // ~5200€
    image: '/detail-ring-2.jpg',
    category: 'Rings',
    description: 'Bague trois pierres avec diamant et rubis'
  },
  {
    id: 8,
    name: 'Couronne Naaba',
    price: 5116000, // ~7800€
    image: '/detail-ring-3.jpg',
    category: 'Rings',
    description: 'Bague halo avec rubis ovale et diamants'
  },
  {
    id: 9,
    name: 'Collection Faso',
    price: 583800, // ~890€
    image: '/collection-rings.jpg',
    category: 'Rings',
    description: 'Collection de bagues rubis burkinabè'
  },
  {
    id: 10,
    name: 'Gouttes de Ouaga',
    price: 426400, // ~650€
    image: '/collection-earrings.jpg',
    category: 'Earrings',
    description: 'Boucles d\'oreilles pendantes avec rubis'
  },
  {
    id: 11,
    name: 'Collier Gourmantché',
    price: 786800, // ~1200€
    image: '/collection-necklaces.jpg',
    category: 'Necklaces',
    description: 'Collier majestueux en or avec rubis'
  },
  {
    id: 12,
    name: 'Bracelet Lobi',
    price: 622800, // ~950€
    image: '/collection-bracelets.jpg',
    category: 'Bracelets',
    description: 'Bracelet manchette avec rubis burkinabè'
  },
];

export const categories = [
  { name: 'Rings', image: '/collection-rings.jpg', count: 24 },
  { name: 'Earrings', image: '/collection-earrings.jpg', count: 18 },
  { name: 'Necklaces', image: '/collection-necklaces.jpg', count: 15 },
  { name: 'Bracelets', image: '/collection-bracelets.jpg', count: 12 },
  { name: 'Watches', image: '/collection-watches.jpg', count: 8 },
  { name: 'Gifts', image: '/collection-gifts.jpg', count: 20 },
];

export const brands = [
  { name: 'Cora Faso', image: '/hero-model.jpg', description: 'Notre collection signature burkinabè' },
  { name: 'Maison Naaba', image: '/featured-ring.jpg', description: 'Artisanat royal du Burkina' },
  { name: 'Or du Sahel', image: '/detail-ring-1.jpg', description: 'L\'élégance intemporelle' },
  { name: 'Lumière Ouaga', image: '/new-arrival.jpg', description: 'Designs contemporains africains' },
];

// Helper function to format price in FCFA
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};

// Helper function to format compact price (for small spaces)
export const formatCompactPrice = (price: number): string => {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + 'M FCFA';
  }
  if (price >= 1000) {
    return (price / 1000).toFixed(0) + 'K FCFA';
  }
  return price + ' FCFA';
};
