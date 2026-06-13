import { motion } from 'framer-motion';
import { Building2, Calendar, Users, ShieldCheck } from 'lucide-react';

// Compact horizontal trust strip — the "credibility band" right after the
// LiftDoors reveal. Four hard facts, each a marquee-style entrance.
const STATS = [
  { value: '52+',   label: 'Villa lifts · single Chennai estate', icon: Building2 },
  { value: '2019',  label: 'Established in Manapakkam',           icon: Calendar },
  { value: 'In-house', label: 'Engineers · no subcontractors',    icon: Users },
  { value: 'IS 14665', label: 'Code-compliant · safety-first',    icon: ShieldCheck },
];

export default function TrustStrip() {
  return (
    <section className="relative py-20 md:py-28 border-t border-bs-shaft bg-bs-black">
      {/* Background hairline grid */}
      <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(to_right,rgba(212,175,106,0.04)_1px,transparent_1px)] [background-size:80px_100%]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <header className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">By the numbers</p>
          <h2 className="font-display italic text-3xl md:text-5xl text-bs-bone leading-tight">
            Seven years. South India. <br className="hidden md:inline" />
            One workshop.
          </h2>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bs-shaft/60 border border-bs-shaft/60 rounded-sm overflow-hidden">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-bs-ink p-6 md:p-9 hover:bg-bs-black transition-colors overflow-hidden"
            >
              {/* Hover gold glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-bs-gold/[0.08] to-transparent transition-opacity" />
              <s.icon size={18} strokeWidth={1.4} className="text-bs-gold/80 mb-5 relative" />
              <div className="font-display italic text-3xl md:text-5xl text-bs-bone leading-tight mb-2 relative">
                {s.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-bs-mist leading-relaxed relative">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
