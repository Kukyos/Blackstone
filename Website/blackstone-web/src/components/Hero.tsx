import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import CableField from './CableField';
import Crosshairs from './Crosshairs';

export default function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 80]);
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-bs-black">
        <div className="absolute inset-0 bg-shaft-grain" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bs-black/40 to-bs-black" />
      </div>

      <CableField />
      <Crosshairs />

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-30 flex flex-col items-center text-center px-4"
      >
        {/* Eyebrow with gold dividers */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-3 md:gap-6 mb-10 md:mb-14"
        >
          <div className="h-px w-10 md:w-20 bg-gradient-to-r from-transparent to-bs-gold/60" />
          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest-plus text-bs-gold drop-shadow-[0_0_12px_rgba(212,175,106,0.35)]">
            Promising Journey To Future
          </p>
          <div className="h-px w-10 md:w-20 bg-gradient-to-l from-transparent to-bs-gold/60" />
        </motion.div>

        {/* Wordmark — depth-stacked */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light italic leading-[0.85] tracking-tight
                       text-[18vw] md:text-[14vw]
                       text-transparent bg-clip-text bg-gradient-to-b from-bs-champagne via-bs-gold to-bs-ember
                       relative z-10"
          >
            Blackstone
          </motion.h1>
          <h1
            aria-hidden
            className="font-display font-light italic leading-[0.85] tracking-tight
                       text-[18vw] md:text-[14vw] text-bs-gold/10
                       absolute inset-0 blur-2xl scale-[1.04] z-0"
          >
            Blackstone
          </h1>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute top-1 right-0 md:-right-6 text-[10px] md:text-xs font-mono tracking-widest text-bs-gold/70"
          >
            ®
          </motion.span>
        </div>

        {/* ELEVATORS sub-wordmark */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.15em' }}
          animate={{ opacity: 1, letterSpacing: '0.55em' }}
          transition={{ duration: 1.4, delay: 1.0 }}
          className="mt-2 md:mt-4 font-sans text-bs-bone/90 text-sm md:text-2xl uppercase tracking-widest-plus pl-[0.55em]"
        >
          Elevators
        </motion.p>

        {/* Sub-line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 md:mt-16 max-w-2xl px-2 relative"
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 md:-top-8 w-px h-12 md:h-16 bg-gradient-to-b from-bs-gold/0 via-bs-gold/50 to-bs-gold/0" />
          <p className="font-sans font-light text-sm md:text-lg tracking-widest uppercase leading-loose text-bs-bone/80">
            Engineered in Chennai. <br className="md:hidden" />
            <span className="text-bs-gold font-normal">Lifting India, floor by floor.</span>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/models"
            className="group relative overflow-hidden px-10 py-4 border border-bs-gold/60 text-bs-gold font-mono text-[10px] uppercase tracking-widest-plus"
          >
            <span className="absolute inset-0 bg-bs-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-bs-black transition-colors duration-500">
              Explore Models <ArrowRight size={12} strokeWidth={1.5} />
            </span>
          </Link>
          <Link
            to="/contact"
            className="px-10 py-4 border border-bs-shaft text-bs-bone/80 font-mono text-[10px] uppercase tracking-widest-plus hover:border-bs-bone hover:text-bs-bone transition-colors flex items-center justify-center gap-2"
          >
            Request a Quote
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 md:bottom-12 z-30 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] uppercase tracking-widest-plus text-bs-bone/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-bs-gold/60" strokeWidth={1.25} />
        </motion.div>
      </motion.div>
    </section>
  );
}
