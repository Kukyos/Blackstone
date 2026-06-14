import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import LiftDoors from '@/components/LiftDoors';
import TrustStrip from '@/components/home/TrustStrip';
import FeaturedLineup from '@/components/home/FeaturedLineup';
import ServicesTeaser from '@/components/home/ServicesTeaser';
import ProcessStrip from '@/components/home/ProcessStrip';
import WorkshopBand from '@/components/home/WorkshopBand';
import ClosingCTA from '@/components/home/ClosingCTA';
// Reveal photo for the lift-door scroll — a real Blackstone install,
// onyx surround + gold cabin doors + mandala light fixture. Replaces the
// low-resolution placeholder that was here before.
import onyxGoldEntrance from '@/assets/installations/onyx-gold-entrance.jpg';

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero />

      <LiftDoors
        revealImage={onyxGoldEntrance}
        eyebrow="Step Inside"
        floors={['G', '1', '2', '3', '4']}
      >
        <div className="text-center max-w-2xl">
          <p className="font-mono text-[9px] md:text-[11px] uppercase tracking-widest-plus text-bs-gold mb-4 md:mb-6">
            From a Blackstone Install · Chennai
          </p>
          <h2 className="font-display italic text-4xl md:text-8xl text-bs-bone leading-[0.95] mb-4 md:mb-10">
            A lift, <br className="md:hidden" /> reimagined.
          </h2>
          <p className="font-sans text-sm md:text-base text-bs-bone/80 max-w-md mx-auto mb-6 md:mb-10 leading-relaxed">
            Onyx surrounds. Gold cabin facings. Mandala light. Nothing pulled from a catalogue.
          </p>
          <Link
            to="/models"
            className="inline-flex items-center gap-2 px-8 py-3 border border-bs-gold/70 text-bs-gold font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-gold hover:text-bs-black transition-colors"
          >
            See the Portfolio <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </LiftDoors>

      <TrustStrip />
      <FeaturedLineup />
      <ServicesTeaser />
      <ProcessStrip />
      <WorkshopBand />
      <ClosingCTA />
    </motion.div>
  );
}
