import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Building2, Wrench, Info, HelpCircle, Phone, Menu, X } from 'lucide-react';

type NavLink = { to: string; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> };

const LINKS: NavLink[] = [
  { to: '/',          label: 'Home',     icon: HomeIcon },
  { to: '/models',    label: 'Models',   icon: Building2 },
  { to: '/services',  label: 'Services', icon: Wrench },
  { to: '/about',     label: 'About',    icon: Info },
  { to: '/faq',       label: 'FAQ',      icon: HelpCircle },
  { to: '/contact',   label: 'Contact',  icon: Phone },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 inset-x-0 z-[100] flex justify-center items-start p-3 md:p-5 pointer-events-none">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          pointer-events-auto flex items-center gap-1 md:gap-1.5
          rounded-full border backdrop-blur-xl transition-all duration-500
          ${scrolled ? 'bg-bs-black/85 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]' : 'bg-bs-black/60'}
          ${hovered ? 'border-bs-gold/40 scale-[1.01]' : 'border-bs-shaft/80 scale-100'}
          p-1 md:p-1.5 max-w-[96vw]
        `}
      >
        {/* Brand wordmark on the left — clean and readable at navbar scale */}
        <Link
          to="/"
          aria-label="Blackstone Elevators home"
          className="flex items-baseline gap-1.5 md:gap-2 h-10 md:h-11 px-3 md:px-5 border-r border-bs-shaft/80 group"
        >
          <span className="font-display italic text-xl md:text-2xl leading-none text-bs-gold group-hover:text-bs-champagne transition-colors">
            Blackstone
          </span>
          <span className="hidden md:inline font-sans text-[8px] uppercase tracking-widest-plus text-bs-bone/60 group-hover:text-bs-bone/80 transition-colors">
            Elevators
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`
                  relative group flex items-center justify-center w-11 h-11 rounded-full
                  transition-all duration-300
                  ${active ? 'bg-bs-gold/10 text-bs-gold' : 'text-bs-bone/75 hover:text-bs-bone'}
                `}
              >
                <Icon size={15} strokeWidth={1.25} />
                <span className="pointer-events-none absolute top-14 px-3 py-1 rounded-sm bg-bs-ink border border-bs-shaft text-bs-gold font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-bs-gold"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Open navigation"
          className="md:hidden flex items-center justify-center w-10 h-10 text-bs-bone/80 hover:text-bs-gold"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X size={18} strokeWidth={1.25} /> : <Menu size={18} strokeWidth={1.25} />}
        </button>

        {/* CTA pill — desktop */}
        <Link
          to="/contact"
          className="hidden md:flex items-center gap-2 ml-1 px-4 h-11 rounded-full bg-bs-gold text-bs-black font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-champagne transition-colors"
        >
          Enquire
        </Link>
      </motion.div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto md:hidden absolute top-20 left-3 right-3 rounded-2xl border border-bs-shaft bg-bs-black/95 backdrop-blur-xl p-2"
        >
          {LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                  ${active ? 'bg-bs-gold/10 text-bs-gold' : 'text-bs-bone/80'}`}
              >
                <Icon size={16} strokeWidth={1.25} />
                {label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-bs-gold text-bs-black font-mono text-[11px] uppercase tracking-widest-plus"
          >
            Enquire
          </Link>
        </motion.div>
      )}
    </div>
  );
}
