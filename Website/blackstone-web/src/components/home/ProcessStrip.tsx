import { motion } from 'framer-motion';
import { Phone, PencilRuler, Factory, KeyRound } from 'lucide-react';

const STEPS = [
  { n: '01', icon: Phone,       title: 'Site Visit',          body: 'A free, no-commitment visit. We measure the shaft and listen to what the lift needs to do.' },
  { n: '02', icon: PencilRuler, title: 'Custom Design',       body: 'Capacity, cabin, finishes — designed around your space, not pulled from a catalogue.' },
  { n: '03', icon: Factory,     title: 'Build & Install',     body: 'Fabricated in Manapakkam. Coordinated on site. Commissioned by our own engineers.' },
  { n: '04', icon: KeyRound,    title: 'Handover & AMC',      body: 'Training, AMC enrolment, and a service team that picks up the phone after handover.' },
];

export default function ProcessStrip() {
  return (
    <section className="relative py-24 md:py-32 border-t border-bs-shaft bg-bs-ink overflow-hidden">
      {/* Background sheen */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(212,175,106,0.08),_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <header className="mb-16 md:mb-24 max-w-2xl">
          <p className="eyebrow mb-5">From Enquiry to Handover</p>
          <h2 className="font-display italic text-4xl md:text-6xl leading-[0.95] text-bs-bone">
            Four stops. <br />
            Eight to twelve weeks.
          </h2>
        </header>

        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-bs-gold/0 via-bs-gold/40 to-bs-gold/0" />

          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative md:px-5 text-center md:text-left"
            >
              {/* Numbered orb */}
              <div className="relative z-10 mx-auto md:mx-0 w-14 h-14 rounded-full bg-bs-black border border-bs-gold/60 flex items-center justify-center text-bs-gold mb-6 shadow-[0_0_30px_-8px_rgba(212,175,106,0.5)]">
                <s.icon size={20} strokeWidth={1.4} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold mb-2">
                Step {s.n}
              </div>
              <h3 className="font-display italic text-2xl md:text-3xl text-bs-bone mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-bs-bone/65 leading-relaxed max-w-xs mx-auto md:mx-0">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
