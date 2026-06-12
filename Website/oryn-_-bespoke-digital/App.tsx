import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewState, User, Order, Product } from './types';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Store from './components/Store';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import Settings from './components/Settings';
import { backend } from './services/backend';

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load Session on Mount
  useEffect(() => {
    // Attempt session init regardless of config (backend handles mock mode)
    const initSession = async () => {
      try {
        const sessionUser = await backend.getSession();
        if (sessionUser) {
          setUser(sessionUser);
          // If we have a user, fetch their orders in background
          loadOrders(sessionUser.email);
        }
      } catch (e) {
        console.error("Session init failed", e);
      } finally {
        setIsInitializing(false);
      }
    };
    initSession();
  }, []);

  const loadOrders = async (email: string) => {
    try {
      const userOrders = await backend.getOrders(email);
      setOrders(userOrders);
    } catch (e) {
      console.error("Failed to load orders");
    }
  };

  const handleLogin = async (userData: User) => {
    setUser(userData);
    await loadOrders(userData.email);
    setView('DASHBOARD');
  };

  const handleLogout = async () => {
    await backend.logout();
    setUser(null);
    setOrders([]);
    setCart([]);
    setView('HOME');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      // Check limits
      const existingCount = prev.filter(p => p.id === product.id).length;
      const max = product.maxQuantity || 1;
      
      if (existingCount >= max) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const index = prev.findIndex(p => p.id === productId);
      if (index === -1) return prev;
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const replaceCart = (products: Product[]) => {
    setCart(products);
  };

  const checkout = async () => {
    if (!user) return;
    try {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      const newOrder = await backend.createOrder(user.email, cart, total);
      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
      setView('DASHBOARD');
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-lux-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border border-lux-white/10 relative animate-spin">
             <div className="absolute top-0 left-0 w-2 h-2 bg-lux-gold" />
           </div>
           <p className="font-mono text-[9px] uppercase tracking-widest text-lux-gold animate-pulse">System Boot</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-lux-black text-lux-white selection:bg-lux-gold selection:text-white">
      
      {/* Fixed Navigation - Always Top Center */}
      <Navbar 
        currentView={view} 
        setView={setView} 
        user={user} 
        cartCount={cart.length}
      />

      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          {view === 'HOME' && (
            <motion.div key="home" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
              <Home setView={setView} />
            </motion.div>
          )}

          {(view === 'LOGIN' || view === 'SIGNUP') && (
            <motion.div key="auth" initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}}>
              <Auth mode={view} onAuth={handleLogin} setView={setView} />
            </motion.div>
          )}

          {view === 'STORE' && (
            <motion.div key="store" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
              <Store 
                cart={cart} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart}
                replaceCart={replaceCart}
                checkout={checkout}
                user={user}
                setView={setView}
              />
            </motion.div>
          )}

          {view === 'DASHBOARD' && user && (
            <motion.div key="dashboard" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
              <Dashboard user={user} orders={orders} setView={setView} />
            </motion.div>
          )}

          {view === 'SETTINGS' && (
            <motion.div key="settings" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
              <Settings user={user} onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;