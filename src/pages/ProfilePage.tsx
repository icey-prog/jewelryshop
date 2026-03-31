import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight,
  Edit3,
  Star,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ProfilePage: React.FC = () => {
  const { wishlist } = useStore();
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'Sophie Anderson',
    email: 'sophie@email.com',
    avatar: '/hero-model.jpg',
    memberSince: '2023',
    tier: 'Gold Member',
    points: 2450,
  };

  const orders = [
    { id: 'ORD-2024-001', date: 'Jan 15, 2024', total: 1290, status: 'Delivered', items: 2 },
    { id: 'ORD-2024-002', date: 'Feb 3, 2024', total: 420, status: 'Shipped', items: 1 },
    { id: 'ORD-2023-089', date: 'Dec 20, 2023', total: 780, status: 'Delivered', items: 3 },
  ];

  const addresses = [
    { id: 1, label: 'Home', address: '123 Park Avenue, New York, NY 10001', default: true },
    { id: 2, label: 'Office', address: '456 Madison Ave, New York, NY 10022', default: false },
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div
      className="min-h-screen px-4 sm:px-[7vw]"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 80px)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white border border-cora-black/8 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Square portrait avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden border border-cora-black/10">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-cora-red text-white flex items-center justify-center hover:bg-cora-black transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-serif font-semibold mb-1">
                {user.name}
              </h1>
              <p className="text-cora-gray mb-4">{user.email}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 border border-yellow-600/30 bg-yellow-50 text-yellow-700 text-xs uppercase tracking-widest font-medium flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-yellow-500" />
                  {user.tier}
                </span>
                <span className="px-3 py-1 border border-cora-black/10 bg-cora-cream text-cora-black text-xs uppercase tracking-widest">
                  {user.points} pts
                </span>
              </div>
            </div>
            
            <button className="hidden sm:flex items-center gap-2 px-6 py-3 border border-cora-black/10 text-sm uppercase tracking-widest hover:bg-cora-black hover:text-white hover:border-cora-black transition-all duration-300">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-none rounded-none p-4 shadow-sm">
              <nav className="space-y-1">
                {menuItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-300 ${
                      activeTab === id
                        ? 'bg-cora-red text-white shadow-none shadow-cora-red/20'
                        : 'text-cora-gray hover:bg-cora-cream hover:text-cora-black'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                    {id === 'wishlist' && wishlist.length > 0 && (
                      <span className={`ml-auto text-xs px-2 py-0.5 ${
                        activeTab === id ? 'bg-white/20 text-white' : 'bg-cora-red/10 text-cora-red'
                      }`}>
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Orders', value: orders.length, icon: ShoppingBag },
                    { label: 'Wishlist', value: wishlist.length, icon: Heart },
                    { label: 'Points', value: user.points, icon: Star },
                    { label: 'Member Since', value: user.memberSince, icon: Clock },
                  ].map(({ label, value, icon: Icon }) => (
                    <div 
                      key={label}
                      className="bg-white border border-cora-black/8 p-4 sm:p-6 text-center hover:border-cora-red/20 transition-colors"
                    >
                      <div className="w-10 h-10 mx-auto mb-3 bg-cora-cream border border-cora-black/8 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-cora-red" />
                      </div>
                      <p className="text-2xl font-serif font-bold mb-1">{value}</p>
                      <p className="text-cora-gray text-xs uppercase tracking-widest">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-none rounded-none p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif font-semibold">Recent Orders</h2>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-cora-red text-sm font-medium flex items-center gap-1 hover:underline"
                    >
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {orders.slice(0, 2).map((order) => (
                      <div 
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-cora-cream/50 rounded-none"
                      >
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-cora-gray">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total.toLocaleString()}</p>
                          <span className={`text-[10px] px-2 py-1 uppercase tracking-widest ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-none rounded-none p-6 shadow-sm">
                <h2 className="text-xl font-serif font-semibold mb-6">My Orders</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className="p-4 border border-cora-black/5 rounded-none hover:border-cora-red/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-lg">{order.id}</p>
                          <p className="text-cora-gray text-sm">{order.date}</p>
                          <p className="text-sm text-cora-gray">{order.items} items</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 text-xs uppercase tracking-widest ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                          <p className="font-semibold text-lg">${order.total.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-none rounded-none p-6 shadow-sm">
                <h2 className="text-xl font-serif font-semibold mb-6">My Wishlist</h2>
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-cora-gray/30 mx-auto mb-4" />
                    <p className="text-cora-gray">Your wishlist is empty</p>
                  </div>
                ) : (
                  <p className="text-cora-gray">{wishlist.length} items saved</p>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-none rounded-none p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-semibold">Saved Addresses</h2>
                  <button className="cora-btn text-sm">
                    Add New
                  </button>
                </div>
                
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      className={`p-4 border rounded-none ${
                        addr.default ? 'border-cora-red bg-cora-red/5' : 'border-cora-black/5'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-cora-red mt-0.5" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{addr.label}</p>
                              {addr.default && (
                                <span className="px-2 py-0.5 bg-cora-red text-white text-[10px] uppercase tracking-widest">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-cora-gray text-sm mt-1">{addr.address}</p>
                          </div>
                        </div>
                        <button className="text-cora-gray hover:text-cora-red transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="bg-white rounded-none rounded-none p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-semibold">Payment Methods</h2>
                  <button className="cora-btn text-sm">
                    Add Card
                  </button>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-cora-black to-gray-800 text-white">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-8 bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-xs">VISA</span>
                    </div>
                    <span className="text-white/60 text-sm">Default</span>
                  </div>
                  <p className="text-2xl font-mono tracking-wider mb-4">
                    •••• •••• •••• 4242
                  </p>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white/60 text-xs">Card Holder</p>
                      <p className="text-sm">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Expires</p>
                      <p className="text-sm">12/26</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-none rounded-none p-6 shadow-sm space-y-6">
                <h2 className="text-xl font-serif font-semibold">Account Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-cora-gray mb-2">Full Name</label>
                    <input 
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-3 rounded-none border border-cora-black/10 focus:border-cora-red focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-cora-gray mb-2">Email</label>
                    <input 
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-3 rounded-none border border-cora-black/10 focus:border-cora-red focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-cora-gray mb-2">Phone</label>
                    <input 
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-none border border-cora-black/10 focus:border-cora-red focus:outline-none"
                    />
                  </div>
                </div>
                
                <button className="cora-btn w-full">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
