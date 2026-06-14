import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, PackageOpen, Wrench, type LucideIcon } from 'lucide-react';
// Real install photo replaces the placeholder. Glass-walled residential lift —
// what most home-elevator enquiries actually look like.
import homeLiftImg from '@/assets/installations/glass-residential-lift.jpg';

type LineupCard = {
  name: string;
  tagline: string;
  spec: string;
  photo?: string;
  icon?: LucideIcon;
  accent: string;
  link: string;
};

// Editorial-style lineup teaser. One photographic card (the BIXI home lift)
// for visual anchor, three icon-driven gradient cards for variety — keeps
// the payload small (~140 KB total) and the rhythm interesting.

const LINEUP: LineupCard[] = [
  {
    name: 'Home Elevators',
    tagline: 'Compact. Glass-walled. Made for the modern villa.',
    spec: 'G+4 · 4–6 person · gearless',
    photo: homeLiftImg,
    accent: 'from-bs-gold/30 to-transparent',
    link: '/models',
  },
  {
    name: 'Hospital Lifts',
    tagline: 'Stretcher-capable cabins. Calibrated for clinical traffic.',
    spec: '1600 mm car · 13-person · auto-rescue',
    icon: Building2,
    accent: 'from-[#8FB4D8]/15 to-bs-gold/10',
    link: '/services',
  },
  {
    name: 'Freight & Goods',
    tagline: 'Tonne-class capacities. Reinforced doors, hardened guides.',
    spec: '1000 – 5000 kg · industrial-grade',
    icon: PackageOpen,
    accent: 'from-[#C9846A]/15 to-bs-gold/10',
    link: '/services',
  },
  {
    name: 'Modernization',
    tagline: 'Bring legacy lifts into compliance — without rebuilding the shaft.',
    spec: 'Drive · controls · cabin · safety',
    icon: Wrench,
    accent: 'from-[#A4B89C]/15 to-bs-gold/10',
    link: '/services',
  },
];

export default function FeaturedLineup() {
  return (
    <section className="relative py-24 md:py-32 border-t border-bs-shaft bg-gradient-to-b from-bs-black via-bs-ink to-bs-black overflow-hidden">
      {/* Faint vertical accents */}
      <div className="absolute inset-y-0 left-6 md:left-16 w-px bg-bs-bone/[0.04]" />
      <div className="absolute inset-y-0 right-6 md:right-16 w-px bg-bs-bone/[0.04]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">The Lineup</p>
            <h2 className="font-display italic text-4xl md:text-6xl leading-[0.95] text-bs-bone">
              Four categories. <br />
              One philosophy.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold hover:text-bs-champagne transition-colors group whitespace-nowrap"
          >
            Explore every service
            <ArrowRight size={12} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bs-shaft/60 border border-bs-shaft/60 rounded-sm overflow-hidden">
          {LINEUP.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={item.link}
                className="group relative block bg-bs-ink overflow-hidden h-[360px] md:h-[420px] lg:h-[460px]"
              >
                {/* Photo background (only for the first card) */}
                {item.photo && (
                  <div className="absolute inset-0">
                    <img
                      src={item.photo}
                      alt=""
                      aria-hidden
                      className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                )}

                {/* Gradient backdrop for icon cards */}
                {!item.photo && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-80`} />
                    <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(212,175,106,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,106,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
                  </>
                )}

                {/* Vignette + bottom gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-bs-black via-bs-black/40 to-transparent" />

                {/* Large centerpiece icon for non-photo cards */}
                {item.icon && (
                  <div className="absolute inset-0 flex items-center justify-center pt-4 pb-32 pointer-events-none">
                    <motion.div
                      whileInView={{ scale: [0.9, 1] }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="absolute inset-0 blur-3xl bg-bs-gold/15 scale-150" />
                      <item.icon
                        size={120}
                        strokeWidth={0.6}
                        className="relative text-bs-gold/85 drop-shadow-[0_0_30px_rgba(212,175,106,0.4)] transition-transform duration-[1.4s] group-hover:scale-[1.08]"
                      />
                    </motion.div>
                  </div>
                )}

                {/* Number badge */}
                <div className="absolute top-6 left-6 z-10 font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold/80">
                  0{i + 1} / 04
                </div>

                {/* Spec strip */}
                <div className="absolute top-6 right-6 z-10 font-mono text-[9px] uppercase tracking-widest text-bs-bone/55 text-right max-w-[55%]">
                  {item.spec}
                </div>

                {/* Hover affordance */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-bs-gold/40 flex items-center justify-center bg-bs-black/50 backdrop-blur-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all z-10">
                  <ArrowRight size={14} strokeWidth={1.5} className="text-bs-gold" />
                </div>

                {/* Title + tagline */}
                <div className="absolute bottom-0 inset-x-0 p-7 md:p-10 z-10">
                  <h3 className="font-display italic text-3xl md:text-5xl text-bs-bone leading-tight mb-3 group-hover:text-bs-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-bs-bone/70 max-w-md leading-relaxed">
                    {item.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
