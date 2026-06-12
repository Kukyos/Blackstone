import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import LiftDoors from '@/components/LiftDoors';
import liftBixi from '@/assets/lift-bixi.jpg';

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero />

      <LiftDoors
        revealImage={liftBixi}
        eyebrow="Step Inside"
        floors={['G', '1', '2', '3', '4']}
      >
        <div className="text-center max-w-2xl">
          <p className="font-mono text-[9px] md:text-[11px] uppercase tracking-widest-plus text-bs-gold mb-4 md:mb-6">
            Featured · BIXI Compact Premium
          </p>
          <h2 className="font-display italic text-4xl md:text-8xl text-bs-bone leading-[0.95] mb-4 md:mb-10">
            A lift, <br className="md:hidden" /> reimagined.
          </h2>
          <p className="font-sans text-sm md:text-base text-bs-bone/80 max-w-md mx-auto mb-6 md:mb-10 leading-relaxed">
            Glass-walled. Compact. Built for the modern home — without ripping out a wall.
          </p>
          <Link
            to="/models"
            className="inline-flex items-center gap-2 px-8 py-3 border border-bs-gold/70 text-bs-gold font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-gold hover:text-bs-black transition-colors"
          >
            See the Lineup <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </LiftDoors>

      <section className="min-h-[40vh] flex items-center justify-center border-t border-bs-shaft">
        <div className="text-center px-6">
          <p className="eyebrow mb-4">Up Next</p>
          <p className="font-display text-3xl text-bs-bone/60">
            Services, testimonials, contact
          </p>
        </div>
      </section>
    </motion.div>
  );
}
