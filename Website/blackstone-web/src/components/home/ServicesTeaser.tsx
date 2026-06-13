import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hammer, Cog, Sparkles, Wrench, PencilRuler, ShieldCheck, ArrowRight } from 'lucide-react';

const TEASERS = [
  { icon: Hammer,        title: 'New Installation', body: 'Custom design through commissioning — every step in-house.' },
  { icon: Cog,           title: 'Maintenance & AMC', body: 'Quarterly preventive service. Same-day response in Chennai.' },
  { icon: Sparkles,      title: 'Modernization', body: 'Upgrade older lifts without ripping out the shaft.' },
  { icon: Wrench,        title: 'Servicing & Repairs', body: 'Out-of-contract breakdown calls and genuine spares.' },
  { icon: PencilRuler,   title: 'Custom Design', body: 'Talk to us before the architect locks shaft drawings.' },
  { icon: ShieldCheck,   title: 'Safety Audits', body: 'Independent checks against IS 14665 / EN 81 norms.' },
];

export default function ServicesTeaser() {
  return (
    <section className="relative py-24 md:py-32 border-t border-bs-shaft bg-bs-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">End to End</p>
            <h2 className="font-display italic text-4xl md:text-6xl leading-[0.95] text-bs-bone">
              Every step <br />
              under one roof.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold hover:text-bs-champagne transition-colors group whitespace-nowrap"
          >
            All services
            <ArrowRight size={12} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-bs-shaft/60 border border-bs-shaft/60 rounded-sm overflow-hidden">
          {TEASERS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-bs-ink p-7 md:p-9 hover:bg-bs-black transition-colors relative overflow-hidden"
            >
              {/* Hover accent line on the left */}
              <span className="absolute left-0 top-7 bottom-7 w-px bg-bs-gold/0 group-hover:bg-bs-gold/70 transition-colors" />

              <s.icon size={20} strokeWidth={1.4} className="text-bs-gold mb-5" />
              <h3 className="font-display italic text-2xl md:text-3xl text-bs-bone mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-bs-bone/65 leading-relaxed">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
