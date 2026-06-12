
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ViewState, User, ModuleCategory, SiteMode } from '../types';
import { Check, ArrowRight, Layers, Circle, Crosshair, Cpu, Layout, Code, Sparkles, Terminal, PenTool, FileText, Globe, Server, Zap, Lock, Minus, Plus } from 'lucide-react';

// --- DATA ---
const MODULES: Product[] = [
  // PAGES (ADD-ONS)
  { id: 'page_basic', name: 'Additional Basic Page', type: 'MODULE', category: 'PAGES', price: 50, description: 'Standard layout page.', maxQuantity: 8 },
  { id: 'page_adv', name: 'Advanced Page', type: 'MODULE', category: 'PAGES', price: 100, description: 'Animations, grids, custom layouts.', maxQuantity: 5 },
  { id: 'page_prem', name: 'Premium Page', type: 'MODULE', category: 'PAGES', price: 200, description: '3D, heavy motion.', maxQuantity: 1 },

  // DESIGN & AESTHETIC
  { id: 'des_theme', name: 'Custom Theme', type: 'MODULE', category: 'DESIGN', price: 50, description: 'Minimal / Brutalist / Luxury presets.' },
  { id: 'des_template', name: 'Full Custom Template', type: 'MODULE', category: 'DESIGN', price: 200, description: 'Built from scratch.' },
  { id: 'des_anim', name: 'Advanced Animations', type: 'MODULE', category: 'DESIGN', price: 150, description: 'GSAP, smooth scrolling.', requires: ['page_adv'] },
  { id: 'des_trans', name: 'Page Transitions', type: 'MODULE', category: 'DESIGN', price: 100, description: 'Seamless navigation effects.', requires: ['page_adv'] },
  { id: 'des_icons', name: 'Custom Icon Pack', type: 'MODULE', category: 'DESIGN', price: 50, description: 'Bespoke iconography.' },
  { id: 'des_cursor', name: 'Fluid Cursor', type: 'MODULE', category: 'DESIGN', price: 40, description: 'Micro-interactions.', requires: ['page_adv'] },
  { id: 'des_3d', name: '3D Elements', type: 'MODULE', category: 'DESIGN', price: 200, description: 'R3F interactive objects.', requires: ['page_prem'] },
  { id: 'des_logo', name: 'Logo Design', type: 'MODULE', category: 'DESIGN', price: 120, description: 'Vector brand mark.' },
  { id: 'des_brand', name: 'Brand Kit', type: 'MODULE', category: 'DESIGN', price: 100, description: 'Colors & typography.' },
  { id: 'des_toggle', name: 'Theme Toggle', type: 'MODULE', category: 'DESIGN', price: 40, description: 'Dark/Light mode switch.' },

  // RESUME SPECIFIC
  { id: 'res_hero', name: 'Premium Hero', type: 'MODULE', category: 'RESUME', price: 120, description: 'High-impact introduction.' },
  { id: 'res_time', name: 'Interactive Timeline', type: 'MODULE', category: 'RESUME', price: 80, description: 'Experience visualizer.' },
  { id: 'res_skills', name: 'Skills Section', type: 'MODULE', category: 'RESUME', price: 40, description: 'Tech stack grid.' },
  { id: 'res_grid', name: 'Projects Grid', type: 'MODULE', category: 'RESUME', price: 80, description: 'Portfolio showcase.' },
  { id: 'res_proj', name: 'Project Details', type: 'MODULE', category: 'RESUME', price: 30, description: 'Deep dive case study (per page).', maxQuantity: 10 },
  { id: 'res_test', name: 'Testimonials Section', type: 'MODULE', category: 'RESUME', price: 50, description: 'Social proof.' },
  { id: 'res_blog', name: 'Blog Integration', type: 'MODULE', category: 'RESUME', price: 100, description: 'List and read view.' },
  { id: 'res_cms', name: 'Blog Editor (CMS)', type: 'MODULE', category: 'RESUME', price: 150, description: 'Manage your own posts.' },
  { id: 'res_full', name: 'Full Resume Page', type: 'MODULE', category: 'RESUME', price: 80, description: 'Standard CV layout.' },
  { id: 'res_pdf', name: 'PDF Download', type: 'MODULE', category: 'RESUME', price: 40, description: 'Auto-generated PDF button.' },
  { id: 'res_sync', name: 'Live Sync', type: 'MODULE', category: 'RESUME', price: 80, description: 'GitHub / LeetCode / Behance.' },
  { id: 'res_social', name: 'Social Styling', type: 'MODULE', category: 'RESUME', price: 30, description: 'Custom social links.' },
  { id: 'res_sig', name: '3D Signature', type: 'MODULE', category: 'RESUME', price: 150, description: 'Motion branding element.', requires: ['page_prem'] },

  // FUNCTIONAL
  { id: 'func_form', name: 'Contact Form', type: 'MODULE', category: 'FUNCTIONAL', price: 40, description: 'Standard inquiry form.' },
  { id: 'func_form_adv', name: 'Advanced Form', type: 'MODULE', category: 'FUNCTIONAL', price: 60, description: 'With file uploads.' },
  { id: 'func_cms_test', name: 'Testimonials CMS', type: 'MODULE', category: 'FUNCTIONAL', price: 60, description: 'Manage client reviews.' },
  { id: 'func_news', name: 'Newsletter', type: 'MODULE', category: 'FUNCTIONAL', price: 40, description: 'Subscription capture.' },
  { id: 'func_blog', name: 'Blog System', type: 'MODULE', category: 'FUNCTIONAL', price: 100, description: 'Standard blog.' },
  { id: 'func_cms_base', name: 'Basic CMS', type: 'MODULE', category: 'FUNCTIONAL', price: 120, description: 'Edit text content.' },
  { id: 'func_cms_full', name: 'Full CMS', type: 'MODULE', category: 'FUNCTIONAL', price: 200, description: 'Complete content control.' },
  { id: 'func_auth', name: 'Authentication', type: 'MODULE', category: 'FUNCTIONAL', price: 200, description: 'Login / Signup flows.' },
  { id: 'func_dash', name: 'User Dashboard', type: 'MODULE', category: 'FUNCTIONAL', price: 300, description: 'Private user area.' },
  { id: 'func_admin', name: 'Admin Panel', type: 'MODULE', category: 'FUNCTIONAL', price: 2000, description: 'Site management interface.', comingSoon: true },
  { id: 'func_ecom_base', name: 'Ecommerce (Basic)', type: 'MODULE', category: 'FUNCTIONAL', price: 200, description: 'Simple product listing.' },
  { id: 'func_ecom_full', name: 'Ecommerce (Full)', type: 'MODULE', category: 'FUNCTIONAL', price: 300, description: 'Cart, checkout, inventory.' },
  { id: 'func_book', name: 'Booking System', type: 'MODULE', category: 'FUNCTIONAL', price: 400, description: 'Calendar and appointments.' },
  { id: 'func_pay', name: 'Payment Gateway', type: 'MODULE', category: 'FUNCTIONAL', price: 500, description: 'Stripe/Razorpay setup.' },

  // PERFORMANCE & SEO
  { id: 'perf_seo', name: 'Basic SEO', type: 'MODULE', category: 'PERFORMANCE', price: 40, description: 'Meta tags and sitemap.' },
  { id: 'perf_seo_full', name: 'Full SEO Setup', type: 'MODULE', category: 'PERFORMANCE', price: 100, description: 'Schema, OG tags, audit.' },
  { id: 'perf_speed', name: 'Speed Opt.', type: 'MODULE', category: 'PERFORMANCE', price: 60, description: 'Asset compression & caching.' },
  { id: 'perf_lite', name: 'Lightweight Mode', type: 'MODULE', category: 'PERFORMANCE', price: 50, description: 'Low-bandwidth optimization.' },

  // HOSTING & MAINTENANCE
  { id: 'host_setup', name: 'Hosting Setup', type: 'MODULE', category: 'HOSTING', price: 30, description: 'Vercel/Netlify config.' },
  { id: 'host_domain', name: 'Domain Setup', type: 'MODULE', category: 'HOSTING', price: 30, description: 'DNS configuration.' },
  { id: 'host_maint', name: 'Monthly Maint.', type: 'MODULE', category: 'HOSTING', price: 50, description: 'Updates and monitoring.' },
  { id: 'host_pack', name: '6-Month Pack', type: 'MODULE', category: 'HOSTING', price: 250, description: 'Long-term support.' },
];

const FOUNDATIONS: Product[] = [
  { id: 'base_mini', name: 'Minimalist', type: 'TEMPLATE', price: 300, description: 'Base Build (1 Page) + Minimal.', features: ['Includes Main Page', 'Mobile Ready', 'Hosting Setup'], modeTrigger: 'MINIMAL' },
  { id: 'base_brutal', name: 'Brutalist', type: 'TEMPLATE', price: 300, description: 'Base Build (1 Page) + Brutal.', features: ['Includes Main Page', 'Mobile Ready', 'Hosting Setup'], modeTrigger: 'BRUTAL' },
  { id: 'base_lux', name: 'Luxury', type: 'TEMPLATE', price: 300, description: 'Base Build (1 Page) + Luxury.', features: ['Includes Main Page', 'Mobile Ready', 'Hosting Setup'], modeTrigger: 'LUXURY' },
  { id: 'base_custom', name: 'Architect', type: 'TEMPLATE', price: 300, description: 'Base Build (1 Page) + Blueprint.', features: ['Includes Main Page', 'Mobile Ready', 'Hosting Setup'], modeTrigger: 'CUSTOM' },
];

const PRESETS: Record<string, string[]> = {
  'base_mini': [],
  'base_brutal': [],
  'base_lux': [],
  'base_custom': []
};

const CATEGORIES: { id: ModuleCategory; label: string; icon: any }[] = [
  { id: 'PAGES', label: 'Pages', icon: FileText },
  { id: 'DESIGN', label: 'Design', icon: Sparkles },
  { id: 'RESUME', label: 'Resume', icon: Layout },
  { id: 'FUNCTIONAL', label: 'Systems', icon: Code },
  { id: 'PERFORMANCE', label: 'Performance', icon: Zap },
  { id: 'HOSTING', label: 'Hosting', icon: Server },
];

// --- IMMERSIVE BACKGROUNDS ---

const LuxuryBackground = () => (
  <div className="absolute inset-0 bg-lux-black overflow-hidden pointer-events-none">
    {/* Deep Void Gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lux-gold/10 via-lux-black to-lux-black" />
    
    {/* Golden Particles */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-lux-gold rounded-full blur-[1px]"
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight, 
          opacity: 0 
        }}
        animate={{ 
          y: [null, Math.random() * -100],
          opacity: [0, 0.8, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{ 
          duration: Math.random() * 5 + 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: Math.random() * 5
        }}
      />
    ))}

    {/* Elegant Aura */}
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-lux-gold/5 rounded-full blur-[120px]" 
    />

    {/* Watermark */}
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
      <h1 className="font-serif text-[25vw] text-lux-gold tracking-widest select-none">ORYN</h1>
    </div>
  </div>
);

const MinimalBackground = () => (
  <div className="absolute inset-0 bg-[#FDFDFD] overflow-hidden pointer-events-none flex items-center justify-center">
    {/* Massive Cropped Typography */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
      <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-[30vw] leading-[0.8] font-black tracking-tighter text-black opacity-[0.04] select-none whitespace-nowrap"
      >
        PURE
      </motion.h1>
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-[30vw] leading-[0.8] font-black tracking-tighter text-black opacity-[0.04] select-none whitespace-nowrap"
      >
        FORM
      </motion.h1>
    </div>

    {/* Rotating Primitive - The only splash of "color" (Black) */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute right-[-10vw] bottom-[-10vw] w-[40vw] h-[40vw] border-[1px] border-black/10 rounded-full flex items-center justify-center"
    >
        <div className="w-[80%] h-[80%] border-[1px] border-black/5" />
    </motion.div>
    
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)]" />
  </div>
);

const BrutalBackground = () => (
  <div className="absolute inset-0 bg-black overflow-hidden pointer-events-none font-mono">
    {/* Matrix Rain */}
    <div className="absolute inset-0 flex justify-between opacity-30 select-none">
       {[...Array(40)].map((_, i) => (
         <motion.div 
           key={i}
           initial={{ y: -200, opacity: 0 }}
           animate={{ y: '120vh', opacity: [0, 1, 0] }}
           transition={{ 
             duration: Math.random() * 3 + 2, 
             repeat: Infinity, 
             delay: Math.random() * 5, 
             ease: 'linear' 
           }}
           className="text-[#00FF41] text-[10px] md:text-sm writing-vertical-rl font-bold"
           style={{ left: `${Math.random() * 100}%` }}
         >
           {Array.from({length: 20}, () => Math.random() > 0.5 ? '1' : '0').join('')}
         </motion.div>
       ))}
    </div>

    {/* Glitch Overlay */}
    <div className="absolute inset-0 bg-noise-overlay mix-blend-overlay opacity-20" />
    
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mix-blend-difference">
        <motion.div
           animate={{ 
             x: [-5, 5, -5],
             skewX: [0, 10, -10, 0]
           }}
           transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
           className="text-[12vw] font-bold text-[#00FF41] opacity-10 tracking-widest uppercase select-none"
        >
           SYSTEM_FAILURE
        </motion.div>
    </div>

    {/* Heavy Scanlines */}
    <div className="absolute inset-0 z-20 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-[0.02] bg-cover" />
    <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]" />
  </div>
);

const CustomBackground = () => {
    // Rotating Rings
    return (
      <div className="absolute inset-0 bg-[#0a192f] overflow-hidden pointer-events-none font-mono">
        {/* Technical Grid Scanning */}
        <motion.div 
          initial={{ top: '-100%' }}
          animate={{ top: '200%' }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-[#64ffda]/10 to-transparent"
        />
        
        {/* Central Architecture */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Outer Ring */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="w-[50vw] h-[50vw] border border-dashed border-[#64ffda]/20 rounded-full"
            />
            {/* Inner Ring */}
            <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute top-[10%] left-[10%] w-[80%] h-[80%] border border-[#64ffda]/20 rounded-full"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#64ffda]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#64ffda]" />
            </motion.div>
            
            {/* Crosshair Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-[#64ffda]/60">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-px bg-[#64ffda]/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[150vh] bg-[#64ffda]/10" />
            </div>
        </div>

        {/* HUD Elements */}
        <div className="absolute top-10 left-10 text-[#64ffda]/40 text-xs">
           <p className="border-b border-[#64ffda]/40 pb-1 mb-2 inline-block">PROJECT: ORYN_V3</p>
           <p>COORDINATES: 45.92, -12.01</p>
           <p>STATUS: DRAFTING</p>
        </div>
        
        {/* Moving Ruler */}
        <motion.div 
           animate={{ height: ['0%', '100%', '0%'] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute right-0 top-0 w-12 h-full border-l border-[#64ffda]/20 bg-[#64ffda]/5 flex flex-col justify-between items-end pr-1 py-2 text-[8px] text-[#64ffda]/50"
        >
           {[...Array(20)].map((_,i) => <span key={i}>-- {i * 5}</span>)}
        </motion.div>
      </div>
    );
}

// Background Manager
const ArchetypeBackground = ({ mode }: { mode: SiteMode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <AnimatePresence mode="popLayout" custom={mode}>
        {mode === 'MINIMAL' && (
          <motion.div key="minimal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-10">
             <MinimalBackground />
          </motion.div>
        )}
        {mode === 'BRUTAL' && (
          <motion.div key="brutal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-10">
             <BrutalBackground />
          </motion.div>
        )}
        {mode === 'CUSTOM' && (
          <motion.div key="custom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-10">
             <CustomBackground />
          </motion.div>
        )}
        {mode === 'LUXURY' && (
          <motion.div key="luxury" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-10">
             <LuxuryBackground />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface StoreProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  replaceCart: (products: Product[]) => void;
  checkout: () => void;
  user: User | null;
  setView: (view: ViewState) => void;
}

const Store: React.FC<StoreProps> = ({ cart, addToCart, removeFromCart, replaceCart, checkout, user, setView }) => {
  const [step, setStep] = useState<1 | 2>(1); 
  const [activeCategory, setActiveCategory] = useState<ModuleCategory>('PAGES');
  const [hoveredArchetype, setHoveredArchetype] = useState<SiteMode | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const effectiveMode: SiteMode = step === 1 ? (hoveredArchetype || 'LUXURY') : 'LUXURY';
  const currentFoundation = cart.find(p => p.type === 'TEMPLATE');

  useEffect(() => {
    const body = document.body;
    const modes: SiteMode[] = ['LUXURY', 'MINIMAL', 'BRUTAL', 'CUSTOM'];
    modes.forEach(m => body.classList.remove(`mode-${m.toLowerCase()}`));
    body.classList.add(`mode-${effectiveMode.toLowerCase()}`);
    
    return () => {
       modes.forEach(m => body.classList.remove(`mode-${m.toLowerCase()}`));
       body.classList.add('mode-luxury');
    };
  }, [effectiveMode]);

  const selectFoundation = (product: Product) => {
    const newCartItems: Product[] = [product];
    const presetIds = PRESETS[product.id] || [];
    presetIds.forEach(id => {
      const module = MODULES.find(m => m.id === id);
      if (module) newCartItems.push(module);
    });
    replaceCart(newCartItems);
    setStep(2);
    setHoveredArchetype(null);
  };

  const handleCheckout = async () => {
    if (!user) {
      setView('LOGIN');
      return;
    }
    setIsProcessing(true);
    await checkout();
    setIsProcessing(false);
  };

  // CHECK LOCKS & DEPENDENCIES
  const isModuleLocked = (item: Product) => {
    if (item.comingSoon) return { locked: true, reason: 'Coming Soon' };

    // Dependency Check for 3D
    if (item.requires && item.requires.includes('page_prem')) {
         const hasPrem = cart.some(c => c.id === 'page_prem');
         if (!hasPrem) return { locked: true, reason: 'Requires Premium Page' };
    }
    
    // Design items interactive locking
    const interactiveDesign = ['des_anim', 'des_trans', 'des_cursor'];
    if (interactiveDesign.includes(item.id)) {
        const hasAdv = cart.some(c => c.id === 'page_adv' || c.id === 'page_prem');
        if (!hasAdv) return { locked: true, reason: 'Requires Advanced Page' };
    }

    return { locked: false, reason: '' };
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const activeModules = useMemo(() => MODULES.filter(m => m.category === activeCategory), [activeCategory]);
  
  return (
    <div className={`relative ${step === 1 ? 'min-h-[100dvh]' : 'min-h-screen'} text-current transition-colors duration-500 overflow-x-hidden`}>
      
      {/* BACKGROUND PREVIEW LAYER */}
      <ArchetypeBackground mode={effectiveMode} />

      {step === 1 ? (
        // --- STEP 1: ARCHETYPE SELECTION ---
        <div className="relative z-10 flex flex-col min-h-[100dvh] pt-20 md:pt-24 pb-12 px-4 md:px-6">
            
            {/* Header */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-center mb-8 md:mb-16 relative z-20 px-2 text-current mix-blend-normal"
            >
               <h1 className="text-3xl md:text-8xl font-serif font-light tracking-tight uppercase">
                  Select <span className="italic opacity-80">Archetype</span>
               </h1>
               <div className="w-12 md:w-24 h-px bg-current mx-auto mt-4 md:mt-6 opacity-50" />
            </motion.div>

            {/* Cards Container */}
            <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative z-20 pb-12 md:pb-0 flex-grow">
              {FOUNDATIONS.map((foundation, index) => {
                const Icon = foundation.modeTrigger === 'MINIMAL' ? Circle : 
                             foundation.modeTrigger === 'BRUTAL' ? Terminal :
                             foundation.modeTrigger === 'CUSTOM' ? PenTool : Layers;
                
                const isHovered = hoveredArchetype === foundation.modeTrigger;

                return (
                  <motion.div
                    key={foundation.id}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => selectFoundation(foundation)}
                    onMouseEnter={() => setHoveredArchetype(foundation.modeTrigger)}
                    onMouseLeave={() => setHoveredArchetype(null)}
                    className={`
                      group relative cursor-pointer overflow-hidden transition-all duration-500 ease-out
                      border flex flex-col justify-between min-h-[300px] md:min-h-[55vh]
                      ${isHovered ? 'border-current bg-current/5 shadow-2xl scale-[1.02]' : 'border-current/10 bg-current/0 opacity-70 hover:opacity-100'}
                      backdrop-blur-[2px]
                    `}
                  >
                     {/* Hover Glow Background */}
                     <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-current/10 to-transparent pointer-events-none`} />

                     {/* Top Section */}
                     <div className="p-6 md:p-8 relative z-10">
                        <div className="flex justify-between items-start mb-4 md:mb-6">
                           <span className="font-mono text-[10px] tracking-widest opacity-60">0{index + 1}</span>
                           <Icon 
                              size={24} 
                              strokeWidth={1} 
                              className={`transition-transform duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`} 
                           />
                        </div>
                        <h3 className="text-xl md:text-3xl font-serif uppercase tracking-wide mb-2">{foundation.name}</h3>
                        <div className={`h-[1px] bg-current transition-all duration-500 ease-out ${isHovered ? 'w-full opacity-100' : 'w-8 opacity-50'}`} />
                     </div>

                     {/* Bottom Section */}
                     <div className="p-6 md:p-8 relative z-10">
                        <p className="font-mono text-[10px] uppercase tracking-widest opacity-80 mb-4 md:mb-6 leading-relaxed md:h-12 line-clamp-2 md:line-clamp-none">
                           {foundation.description}
                        </p>
                        
                        <div className="space-y-2 mb-4 md:mb-6 hidden md:block">
                           {foundation.features?.map((f, i) => (
                             <div key={f} className="flex items-center gap-2">
                                <span className={`w-1 h-1 bg-current transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-30'}`} />
                                <span className="text-[9px] font-mono opacity-60">{f}</span>
                             </div>
                           ))}
                        </div>
                         
                        <div className="font-mono text-xl tracking-tighter">
                            ₹{foundation.price} <span className="text-[9px] opacity-50 tracking-widest align-middle">BASE</span>
                        </div>
                     </div>
                     
                     {/* Select Overlay */}
                     <div className={`
                        absolute inset-0 flex items-center justify-center bg-current/10 backdrop-blur-sm transition-all duration-300
                        ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        md:opacity-0 md:group-hover:opacity-100
                     `}>
                        <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold bg-current text-primary-inverse px-4 py-2 border border-current">
                           Initialize
                        </span>
                     </div>
                  </motion.div>
                );
              })}
            </div>
        </div>
      ) : (
        // --- STEP 2: BUILDER (ALWAYS LUXURY STYLE) ---
        <div className="min-h-screen pt-16 md:pt-32 pb-48 px-4 md:px-6 max-w-[1600px] mx-auto relative z-10 text-lux-white">
           
           {/* Builder Header */}
           <header className="mb-4 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-lux-white/10 pb-4 md:pb-8 relative bg-lux-surface/20 p-6 md:p-8 rounded-sm backdrop-blur-xl">
              <div className="w-full">
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-lux-white/50 hover:text-lux-white mb-4 transition-colors"
                >
                  <ArrowRight size={10} className="rotate-180" /> Change Archetype
                </button>
                <div className="flex flex-col md:flex-row justify-between items-end w-full gap-4">
                  <h2 className="text-3xl md:text-6xl font-serif font-light tracking-tight text-lux-white leading-none">
                    System <span className="italic text-lux-gold">Configuration</span>
                  </h2>
                  <div className="md:hidden flex items-center gap-2 text-lux-white opacity-80 bg-lux-black/20 px-3 py-1 rounded-full border border-lux-white/5 mt-2">
                    <span className="w-1.5 h-1.5 bg-lux-gold rotate-45" />
                    <p className="text-xs font-serif">{currentFoundation?.name}</p>
                  </div>
                </div>
              </div>
              <div className="text-right hidden md:block">
                 <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-1">Architecture</p>
                 <div className="flex items-center justify-end gap-2 text-lux-white">
                    <span className="w-1.5 h-1.5 bg-lux-gold rotate-45" />
                    <p className="text-xl font-serif">{currentFoundation?.name}</p>
                 </div>
              </div>
           </header>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16">
              
              {/* SIDEBAR NAVIGATION (Desktop: Vertical / Mobile: Horizontal Sticky) */}
              <div className="lg:col-span-3 relative z-30">
                 
                 {/* Mobile Sticky Nav */}
                 <div className="lg:hidden sticky top-[4.5rem] -mx-4 px-4 py-3 bg-lux-black/95 backdrop-blur-xl border-b border-lux-white/10 flex gap-3 overflow-x-auto no-scrollbar mask-gradient-right z-40">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                          flex-shrink-0 px-4 py-2 border rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all whitespace-nowrap
                          ${activeCategory === cat.id 
                            ? 'bg-lux-gold text-lux-black border-lux-gold font-bold shadow-glow' 
                            : 'bg-lux-white/5 text-lux-white/70 border-lux-white/10'}
                        `}
                      >
                        {cat.label}
                      </button>
                    ))}
                 </div>

                 {/* Desktop Vertical Nav */}
                 <div className="hidden lg:block sticky top-32 space-y-1">
                    <div className="flex items-center gap-2 mb-8 pl-4 opacity-40">
                       <Layout size={12} className="text-lux-gold" />
                       <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-lux-white">Modules</span>
                    </div>
                    
                    {CATEGORIES.map((cat, idx) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                          w-full text-left px-5 py-5 flex justify-between items-center group border-l transition-all duration-300
                          ${activeCategory === cat.id ? 'border-lux-gold bg-lux-gold/5' : 'border-lux-white/10 hover:border-lux-white/30 hover:bg-lux-white/5'}
                        `}
                      >
                        <div className="flex items-center gap-4 text-lux-white">
                           <span className="font-mono text-[9px] opacity-50">0{idx + 1}</span>
                           <span className={`font-serif text-lg tracking-wide ${activeCategory === cat.id ? 'text-lux-gold' : ''}`}>{cat.label}</span>
                        </div>
                        <ArrowRight size={12} className={`text-lux-gold transition-all duration-300 ${activeCategory === cat.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                      </button>
                    ))}
                 </div>
              </div>

              {/* MODULE GRID */}
              <div className="lg:col-span-9 min-h-[50vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   <AnimatePresence mode='wait'>
                     {activeModules.map((item) => {
                       const cartCount = cart.filter(p => p.id === item.id).length;
                       const { locked, reason } = isModuleLocked(item);
                       const max = item.maxQuantity || 1;
                       const maxReached = cartCount >= max;
                       
                       return (
                         <motion.div
                           layout
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           transition={{ duration: 0.3 }}
                           key={item.id}
                           onClick={() => {
                             if (locked) return;
                             if (max > 1) {
                                if (!maxReached) addToCart(item);
                             } else {
                                if (cartCount > 0) removeFromCart(item.id);
                                else addToCart(item);
                             }
                           }}
                           className={`
                             relative p-6 md:p-8 border transition-all duration-500 group min-h-[160px] md:min-h-[220px] flex flex-col justify-between
                             ${locked ? 'opacity-50 cursor-not-allowed border-lux-white/5 bg-lux-white/5' : 'cursor-pointer'}
                             ${cartCount > 0 && !locked ? 'border-lux-gold bg-lux-gold/5 shadow-[0_0_30px_rgba(230,213,184,0.05)]' : !locked && 'border-lux-white/10 bg-lux-surface/20 hover:bg-lux-surface/40 hover:border-lux-white/30'}
                           `}
                         >
                            <div className="relative z-10">
                               <div className="flex justify-between items-start mb-2 md:mb-4">
                                  <div className="flex-1 pr-4">
                                      <h3 className={`text-lg md:text-2xl font-serif font-light tracking-wide ${cartCount > 0 ? 'text-lux-gold' : 'text-lux-white'}`}>{item.name}</h3>
                                      {max > 1 && (
                                          <div className="mt-1 font-mono text-[9px] text-lux-gold/70">
                                              MAX: {max} UNITS
                                          </div>
                                      )}
                                  </div>
                                  <div className={`
                                    w-5 h-5 flex items-center justify-center transition-all duration-300 flex-shrink-0
                                    ${cartCount > 0 ? 'opacity-100 text-lux-gold' : 'opacity-20 text-lux-white group-hover:opacity-50'}
                                  `}>
                                     {locked ? <Lock size={16} /> : (cartCount > 0 ? <Check size={18} /> : <Crosshair size={18} />)}
                                  </div>
                               </div>
                               <p className="font-mono text-[10px] text-lux-white/60 leading-relaxed max-w-sm border-l border-lux-white/10 pl-3">
                                 {locked ? reason : item.description}
                               </p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4 md:mt-8 pt-4 md:pt-6 border-t border-lux-white/5 relative z-10 text-lux-white">
                               <div className="flex items-center gap-2">
                                  <span className={`w-1 h-1 rounded-full ${cartCount > 0 ? 'bg-lux-gold' : 'bg-lux-white/30'}`} />
                                  <span className="font-mono text-xs tracking-widest">₹{item.price}</span>
                               </div>
                               
                               {locked ? (
                                   <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">
                                       {item.comingSoon ? 'COMING SOON' : reason || 'LOCKED'}
                                   </span>
                               ) : (
                                   max > 1 ? (
                                       <div className="flex items-center gap-1 bg-lux-black border border-lux-white/10 rounded-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
                                           <button 
                                              onClick={() => removeFromCart(item.id)}
                                              disabled={cartCount === 0}
                                              className="p-2 hover:bg-lux-white/10 disabled:opacity-20 transition-colors"
                                           >
                                              <Minus size={12} />
                                           </button>
                                           <span className="font-mono text-[10px] w-6 text-center text-lux-gold">{cartCount}</span>
                                           <button 
                                              onClick={() => addToCart(item)}
                                              disabled={cartCount >= max}
                                              className="p-2 hover:bg-lux-white/10 disabled:opacity-20 transition-colors"
                                           >
                                              <Plus size={12} />
                                           </button>
                                       </div>
                                   ) : (
                                       <button 
                                          className={`font-mono text-[9px] uppercase tracking-widest transition-colors ${cartCount > 0 ? 'opacity-100 font-bold text-lux-gold' : 'opacity-40'}`}
                                       >
                                           {cartCount > 0 ? 'INSTALLED' : 'ADD MODULE'}
                                       </button>
                                   )
                               )}
                            </div>
                         </motion.div>
                       );
                     })}
                   </AnimatePresence>
                </div>
              </div>
           </div>

           {/* FLOATING COMMAND BAR */}
           <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
              <div className="flex justify-center p-4 md:p-8 pb-8 md:pb-8">
                 <motion.div 
                   initial={{ y: 100 }}
                   animate={{ y: 0 }}
                   className="pointer-events-auto w-full max-w-4xl bg-[#080808]/95 backdrop-blur-xl border border-lux-white/20 shadow-2xl flex items-stretch rounded-sm overflow-hidden flex-col md:flex-row pb-safe"
                 >
                    {/* Status Section */}
                    <div className="flex-1 px-6 py-4 md:px-8 border-b md:border-b-0 md:border-r border-lux-white/10 flex flex-row md:flex-col justify-between items-center md:items-start text-lux-white">
                       <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-1">Total Investment</p>
                       <div className="flex items-baseline gap-1">
                          <span className="font-serif text-lg opacity-70">₹</span>
                          <span className="text-2xl md:text-3xl font-serif tracking-tight text-lux-gold">{totalPrice.toLocaleString()}</span>
                       </div>
                    </div>

                    {/* Meta Section - Hidden on Mobile to save space */}
                    <div className="hidden md:flex flex-1 px-8 py-4 border-r border-lux-white/10 flex-col justify-center bg-lux-white/5 text-lux-white">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest opacity-50">Est. Timeline</span>
                          <span className="font-mono text-[9px]">3-5 DAYS</span>
                       </div>
                       <div className="w-full h-1 bg-lux-white/10 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-lux-gold" />
                       </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="px-6 py-4 md:px-10 bg-lux-white text-lux-black hover:bg-lux-gold transition-colors duration-300 font-bold text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 relative group disabled:opacity-50 disabled:cursor-wait"
                    >
                      {isProcessing ? (
                         <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-lux-black animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-lux-black animate-bounce delay-100" />
                            <span className="w-1.5 h-1.5 bg-lux-black animate-bounce delay-200" />
                         </div>
                      ) : (
                         <>
                           <span>{user ? 'Initialize Build' : 'Login Required'}</span>
                           <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                         </>
                      )}
                    </button>
                 </motion.div>
              </div>
           </div>

        </div>
      )}
    </div>
  );
};

export default Store;
