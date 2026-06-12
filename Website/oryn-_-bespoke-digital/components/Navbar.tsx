
import React, { useState } from 'react';
import { ViewState, User } from '../types';
import { Home, Grid, User as UserIcon, Hexagon, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: User | null;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user, cartCount }) => {
  const [isHovered, setIsHovered] = useState(false);

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setView(view)}
        className={`relative group flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full transition-all duration-300 ${isActive ? 'bg-lux-gold/10 text-lux-gold' : 'opacity-70 hover:opacity-100 text-lux-white'}`}
      >
        <Icon size={16} strokeWidth={1} />
        
        {/* Tooltip - Desktop Only */}
        <span className={`
          hidden md:block absolute top-14 bg-lux-black border border-lux-border text-lux-gold text-[9px] uppercase tracking-[0.2em] px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50
        `}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-start z-[100] p-3 md:p-6 pointer-events-none">
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          pointer-events-auto flex items-center gap-0 md:gap-1 p-1 md:p-1.5 rounded-full transition-all duration-500 ease-out
          ${isHovered ? 'scale-[1.02] md:scale-105 border-lux-gold/30' : 'scale-100 border-lux-white/10'}
          border bg-[#030303]/80 backdrop-blur-xl shadow-2xl max-w-[98vw] md:max-w-none
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <div 
            onClick={() => setView('HOME')}
            className="flex items-center justify-center h-9 md:h-12 px-3 md:px-5 border-r border-lux-white/10 mr-1 cursor-pointer group"
        >
           <span className="text-sm md:text-xl font-light font-serif text-lux-white tracking-[0.2em] group-hover:text-lux-gold transition-colors">
             ORYN
           </span>
        </div>

        <NavItem view="HOME" icon={Home} label="Home" />
        <NavItem view="STORE" icon={Grid} label="Atelier" />
        {user && <NavItem view="DASHBOARD" icon={Hexagon} label="Lounge" />}

        <div className="w-px h-3 md:h-4 mx-0.5 md:mx-2 bg-lux-white/10" />

        <button 
          onClick={() => setView('STORE')}
          className="relative group flex flex-col items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full opacity-70 hover:opacity-100 transition-opacity text-lux-white hover:text-lux-gold"
        >
          <ShoppingBag size={16} strokeWidth={1} />
          {cartCount > 0 && (
            <span className="absolute top-2 right-2 md:top-3 md:right-3 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-lux-gold animate-pulse" />
          )}
        </button>

        <button 
          onClick={() => setView(user ? 'SETTINGS' : 'LOGIN')}
          className="relative group flex flex-col items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full opacity-70 hover:opacity-100 transition-opacity text-lux-white hover:text-lux-gold"
        >
          <UserIcon size={16} strokeWidth={1} />
        </button>

      </motion.div>
    </div>
  );
};

export default Navbar;
