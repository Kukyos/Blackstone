import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Wrench, Cog, Sparkles, ShieldCheck, Hammer, Phone, ArrowRight,
  MapPin, PencilRuler, Factory, KeyRound,
} from 'lucide-react';
import PageShell from '@/components/PageShell';

const SERVICES = [
  {
    icon: Hammer,
    title: 'New Lift Installation',
    body:
      'A wide range of premium elevator solutions for residential, commercial, and industrial spaces. Every install combines advanced technology, superior safety, smooth performance, and elegant cabin design — tailored to your architecture.',
    bullets: ['Site survey & feasibility', 'Custom cabin design', 'Civil & shaft coordination', 'Commissioning & handover'],
  },
  {
    icon: Cog,
    title: 'Maintenance & AMC',
    body:
      'Keep your lifts safe and silent with our scheduled maintenance contracts. Expert technicians, planned inspections, preventive repairs, and rapid emergency response — for new and existing installations alike.',
    bullets: ['Quarterly inspections', 'Preventive part replacement', 'Emergency response', 'Service history reports'],
  },
  {
    icon: Sparkles,
    title: 'Modernization & Retrofits',
    body:
      'Bring older lifts up to modern standards without ripping out the shaft. Upgrade drive systems, controls, cabins, and safety devices — improving efficiency, ride comfort, and code compliance.',
    bullets: ['Gearless drive upgrades', 'Microprocessor controllers', 'Cabin refurbishment', 'Code-compliant safety retrofits'],
  },
  {
    icon: Wrench,
    title: 'Servicing & Repairs',
    body:
      'Out-of-contract servicing, breakdown calls, spare-part replacements, and cabin refurbishment — handled by the same engineers who build new installations.',
    bullets: ['Breakdown response', 'Genuine spare parts', 'Cabin re-finishing', 'Door & sensor recalibration'],
  },
  {
    icon: PencilRuler,
    title: 'Custom Design & Planning',
    body:
      'Our solutions are designed to meet the unique requirements of every client — delivering superior quality, safety, and aesthetics across every project. Talk to our design team before the architect locks the shaft drawings.',
    bullets: ['Capacity & traffic planning', 'Stainless-steel cabin design', 'Glass & panoramic options', 'Drawings handover to the architect'],
  },
  {
    icon: ShieldCheck,
    title: 'Safety Audits & Compliance',
    body:
      'Independent safety audits of your existing lifts against current standards. Door interlocks, overload sensors, auto-rescue devices, emergency lowering — verified, documented, and brought into compliance.',
    bullets: ['Door & interlock check', 'Load test & overload alerts', 'Auto-rescue device verification', 'Compliance documentation'],
  },
];

const PROCESS = [
  { step: '01', icon: Phone,     title: 'Consultation & Site Inspection', body: 'A free site visit. We measure the shaft, understand the building, and listen to what you need the lift to do.' },
  { step: '02', icon: PencilRuler, title: 'Custom Design & Planning',     body: 'Capacity, cabin, finishes, and controls — designed around your space and your traffic, not a catalogue page.' },
  { step: '03', icon: Factory,   title: 'Manufacturing & Installation',  body: 'Fabrication in our Manapakkam facility. On-site civil coordination, installation, and commissioning by our own engineers.' },
  { step: '04', icon: KeyRound,  title: 'Handover & After-Sales Support', body: 'Training your operator, AMC enrollment, and a service team that picks up the phone after the lift is running.' },
];

export default function Services() {
  return (
    <PageShell
      eyebrow="What We Do"
      title={<>Services<br /><span className="not-italic text-bs-bone/70 text-3xl md:text-5xl font-sans tracking-widest-plus uppercase">end&nbsp;to&nbsp;end</span></>}
      intro={
        <>
          Black Stone Elevators is a Chennai-based partnership that designs, manufactures,
          installs, and maintains lifts for residences, commercial buildings, hospitals, and
          industrial sites. Every service below is delivered by our own engineers — no
          outsourcing, no middlemen.
        </>
      }
    >
      {/* Services grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bs-shaft/60 border border-bs-shaft/60 rounded-sm overflow-hidden">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative bg-bs-ink p-8 md:p-10 hover:bg-bs-black transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 w-11 h-11 rounded-sm border border-bs-gold/40 flex items-center justify-center text-bs-gold group-hover:border-bs-gold group-hover:bg-bs-gold/5 transition-colors">
                <s.icon size={18} strokeWidth={1.5} />
              </div>
              <h2 className="font-display italic text-3xl md:text-4xl text-bs-bone leading-tight">
                {s.title}
              </h2>
            </div>
            <p className="font-sans text-sm md:text-[15px] text-bs-bone/70 leading-relaxed mb-6">
              {s.body}
            </p>
            <ul className="space-y-2">
              {s.bullets.map(b => (
                <li key={b} className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-widest text-bs-mist">
                  <span className="mt-1.5 h-[1px] w-3 bg-bs-gold/60 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </section>

      {/* Process / How it works */}
      <section className="mt-32 md:mt-40">
        <header className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">How It Works</p>
          <h2 className="font-display italic text-4xl md:text-6xl leading-tight text-bs-bone">
            Your journey from enquiry to installation, simplified.
          </h2>
        </header>
        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-bs-shaft" />
          {PROCESS.map((p, i) => (
            <motion.li
              key={p.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative md:px-6"
            >
              <div className="relative z-10 w-14 h-14 rounded-full bg-bs-black border border-bs-gold/60 flex items-center justify-center text-bs-gold mb-5">
                <p.icon size={20} strokeWidth={1.4} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold mb-2">
                Step {p.step}
              </div>
              <h3 className="font-display italic text-2xl text-bs-bone mb-2 leading-tight">
                {p.title}
              </h3>
              <p className="font-sans text-sm text-bs-bone/65 leading-relaxed">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mt-32 md:mt-40 relative border border-bs-shaft p-10 md:p-16 rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bs-gold/[0.06] via-transparent to-bs-gold/[0.04] pointer-events-none" />
        <div className="relative max-w-2xl">
          <p className="eyebrow mb-5">Ready to Begin</p>
          <h2 className="font-display italic text-3xl md:text-5xl leading-tight text-bs-bone mb-6">
            A free site visit in Chennai — and a real quote, not a brochure.
          </h2>
          <p className="font-sans text-base text-bs-bone/70 mb-8 leading-relaxed">
            Tell us what you're building. Our team will visit, measure, and design the right
            lift for your space within a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bs-gold text-bs-black font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-champagne transition-colors"
            >
              Request a Site Visit <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
            <a
              href="tel:+917942704796"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-bs-gold/60 text-bs-gold font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-gold/10 transition-colors"
            >
              <Phone size={12} strokeWidth={1.5} /> +91 79427 04796
            </a>
          </div>
          <p className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-bs-mist">
            <MapPin size={12} strokeWidth={1.5} /> Manapakkam · Mugalivakkam · Chennai 600125
          </p>
        </div>
      </section>
    </PageShell>
  );
}
