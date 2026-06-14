import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Phone } from 'lucide-react';
import PageShell from '@/components/PageShell';

// Real-installation imagery from the workshop. The full catalogue (with
// model names, capacities, drive specs) lands tomorrow — this is the
// foundation: a curated portfolio gallery that proves the workmanship
// without making the page feel empty.
import onyxGoldEntrance     from '@/assets/installations/onyx-gold-entrance.jpg';
import goldCabinMandala     from '@/assets/installations/gold-cabin-mandala.jpg';
import goldDoorMedallion    from '@/assets/installations/gold-door-medallion.jpg';
import ornateMedallionDoor  from '@/assets/installations/ornate-medallion-door.jpg';
import floralScreenPanel    from '@/assets/installations/floral-screen-panel.jpg';
import glassResidentialLift from '@/assets/installations/glass-residential-lift.jpg';
import floralVaseLasercut   from '@/assets/installations/floral-vase-lasercut.jpg';
import floralCabinHero      from '@/assets/installations/floral-cabin-hero.jpg';
import modernHomeVestibule  from '@/assets/installations/modern-home-vestibule.jpg';
import bronzeCabinLight     from '@/assets/installations/bronze-cabin-light.jpg';
import mirrorPerforatedCabin from '@/assets/installations/mirror-perforated-cabin.jpg';
import brassCabinClean      from '@/assets/installations/brass-cabin-clean.jpg';
import stainlessUtilityCabin from '@/assets/installations/stainless-utility-cabin.jpg';
import glassHomeStairs      from '@/assets/installations/glass-home-stairs.jpg';

type Category = 'All' | 'Residential' | 'Premium' | 'Cabin Detail';

type Install = {
  id: string;
  img: string;
  title: string;
  caption: string;
  category: Exclude<Category, 'All'>;
  /** Card height variant for the masonry grid */
  height: 'tall' | 'std' | 'wide';
};

const INSTALLS: Install[] = [
  { id: 'onyx',      img: onyxGoldEntrance,      title: 'Onyx & Gold Entrance',    caption: 'Black onyx surround, polished gold cabin doors, mandala ceiling light.',     category: 'Premium',      height: 'tall' },
  { id: 'glass-res', img: glassResidentialLift,  title: 'Glass Residential Lift',  caption: 'Compact glass-walled home lift, integrated with marble stair.',              category: 'Residential',  height: 'std' },
  { id: 'gold-med',  img: goldDoorMedallion,     title: 'Engraved Gold Medallion', caption: 'Mirror-finish gold landing door with central engraved medallion.',           category: 'Premium',      height: 'std' },
  { id: 'floral-h',  img: floralCabinHero,       title: 'Floral Lasercut Cabin',   caption: 'Hand-detailed floral-vase lasercut panels in champagne gold.',               category: 'Premium',      height: 'tall' },
  { id: 'gold-mand', img: goldCabinMandala,      title: 'Mandala-Lit Cabin',       caption: 'Onyx-walled cabin interior with mandala fixture and reflected light.',      category: 'Cabin Detail', height: 'wide' },
  { id: 'ornate',    img: ornateMedallionDoor,   title: 'Ornate Landing Door',     caption: 'Carved medallion engraving on polished gold facia — palatial entry.',       category: 'Premium',      height: 'std' },
  { id: 'glass-st',  img: glassHomeStairs,       title: 'Glass Home, Tower Glass', caption: 'Full glass cabin tower retrofitted alongside an existing staircase.',        category: 'Residential',  height: 'std' },
  { id: 'mod-vest',  img: modernHomeVestibule,   title: 'Modern Vestibule',        caption: 'Brushed steel cabin set into a warm wood-and-marble vestibule.',             category: 'Residential',  height: 'std' },
  { id: 'floral-vp', img: floralVaseLasercut,    title: 'Floral Vase Panel',       caption: 'Single-panel lasercut vase motif over patterned marble inlay floor.',       category: 'Cabin Detail', height: 'tall' },
  { id: 'floral-sc', img: floralScreenPanel,     title: 'Screen-Embedded Door',    caption: 'Lasercut floral panel with embedded digital floor-display screen.',         category: 'Cabin Detail', height: 'std' },
  { id: 'bronze',    img: bronzeCabinLight,      title: 'Bronze Cabin Light',      caption: 'Champagne-bronze cabin with reflected fixture light.',                       category: 'Cabin Detail', height: 'std' },
  { id: 'mirror',    img: mirrorPerforatedCabin, title: 'Mirror & Perforation',    caption: 'Mirror-finish cabin walls with perforated stainless inserts.',               category: 'Cabin Detail', height: 'std' },
  { id: 'brass',     img: brassCabinClean,       title: 'Brass Cabin, Clean Lines', caption: 'Champagne-brass with crisp panel divisions — minimalist premium.',          category: 'Premium',      height: 'wide' },
  { id: 'stainless', img: stainlessUtilityCabin, title: 'Utility Cabin',           caption: 'Stainless steel utility cabin — service and goods configuration.',           category: 'Residential',  height: 'std' },
];

const CATEGORIES: Category[] = ['All', 'Residential', 'Premium', 'Cabin Detail'];

export default function Models() {
  const [filter, setFilter] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<Install | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? INSTALLS : INSTALLS.filter(i => i.category === filter)),
    [filter]
  );

  return (
    <PageShell
      eyebrow="The Portfolio"
      title={
        <>
          Lifts we have <br />
          <em className="text-bs-gold">actually built.</em>
        </>
      }
      intro={
        <>
          A curated selection of recent Blackstone installations across South India —
          residential glass cabins, premium ornate cabins, and finer cabin details.
          The full model catalogue with capacity, drive type, and pricing lands here
          shortly. For now: photographs, taken on site.
        </>
      }
    >
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
        {CATEGORIES.map(cat => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest-plus border transition-all
                ${active
                  ? 'bg-bs-gold text-bs-black border-bs-gold'
                  : 'border-bs-shaft text-bs-bone/70 hover:border-bs-gold/60 hover:text-bs-gold'}
              `}
            >
              {cat}
            </button>
          );
        })}
        <span className="ml-auto self-center font-mono text-[10px] uppercase tracking-widest text-bs-bone/40">
          {visible.length} shown
        </span>
      </div>

      {/* Masonry gallery — CSS columns. Cheap, fluid, mobile-friendly. */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
        {visible.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setLightbox(item)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block w-full mb-4 md:mb-6 overflow-hidden rounded-sm bg-bs-ink break-inside-avoid border border-bs-shaft/60 hover:border-bs-gold/40 transition-colors text-left"
          >
            <div className={
              item.height === 'tall' ? 'aspect-[3/4]' :
              item.height === 'wide' ? 'aspect-[4/3]' :
              'aspect-[3/4]'
            }>
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
            </div>
            {/* Bottom gradient + caption */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-bs-black via-bs-black/70 to-transparent">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-bs-gold/80 mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-display italic text-xl md:text-2xl text-bs-bone leading-tight">
                    {item.title}
                  </h3>
                </div>
                <span className="w-8 h-8 rounded-full border border-bs-gold/40 flex items-center justify-center bg-bs-black/60 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <ArrowRight size={12} strokeWidth={1.5} className="text-bs-gold" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Closing strip — catalogue notice + call-to-action */}
      <section className="mt-24 md:mt-32 border-t border-bs-shaft pt-16 md:pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-5">Catalogue · arriving</p>
            <h2 className="font-display italic text-3xl md:text-5xl leading-[1.05] text-bs-bone mb-6">
              The full model breakdown — capacities, drives, cabin finishes — lands here next.
            </h2>
            <p className="font-sans text-bs-bone/70 leading-relaxed max-w-md">
              Every Blackstone lift is built to the brief, not to a template. Tell us the
              shaft, the floors, the people who'll ride it — we'll quote you a cabin.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              to="/contact"
              className="group flex items-center justify-between gap-6 p-6 md:p-8 rounded-sm border border-bs-gold/40 bg-gradient-to-br from-bs-gold/[0.08] to-transparent hover:from-bs-gold/[0.14] transition-all"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold mb-2">
                  Start an enquiry
                </p>
                <p className="font-display italic text-2xl md:text-3xl text-bs-bone leading-tight">
                  Tell us about your building.
                </p>
              </div>
              <ArrowRight size={20} className="text-bs-gold group-hover:translate-x-1 transition-transform shrink-0" strokeWidth={1.25} />
            </Link>
            <a
              href="tel:+917942704796"
              className="flex items-center gap-4 p-5 rounded-sm border border-bs-shaft hover:border-bs-bone/40 transition-colors"
            >
              <Phone size={16} strokeWidth={1.5} className="text-bs-gold" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-bs-bone/50">Or call</p>
                <p className="font-sans text-bs-bone">+91 79427 04796</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] bg-bs-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[88vh] flex flex-col cursor-default"
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-10 w-10 h-10 rounded-full bg-bs-black border border-bs-gold/50 text-bs-gold hover:bg-bs-gold hover:text-bs-black transition-colors flex items-center justify-center"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
              <img
                src={lightbox.img}
                alt={lightbox.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-sm"
              />
              <div className="mt-4 md:mt-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-bs-gold/80 mb-2">
                  {lightbox.category}
                </p>
                <h3 className="font-display italic text-3xl md:text-4xl text-bs-bone mb-2">
                  {lightbox.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-bs-bone/70 max-w-2xl">
                  {lightbox.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
