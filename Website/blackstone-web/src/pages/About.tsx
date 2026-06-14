import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, Users, Calendar, MapPin } from 'lucide-react';
import PageShell from '@/components/PageShell';
// A real Blackstone install — anchors the story with the actual workmanship.
import installHero from '@/assets/installations/modern-home-vestibule.jpg';

const STATS = [
  { value: '2019',     label: 'Established',           icon: Calendar },
  { value: '52+',      label: 'Villa Lifts · Chennai', icon: Building2 },
  { value: '11–25',    label: 'In-house Team',         icon: Users },
  { value: 'Partnership', label: 'Legal Entity',       icon: Award },
];

const PHILOSOPHY = [
  {
    title: 'Mission',
    body:
      'Provide advanced elevator systems with expert design, installation, modernization, and maintenance services — for every type of building, from a Mugalivakkam villa to a multi-storey hospital.',
  },
  {
    title: 'Vision',
    body:
      'A promising journey to the future of vertical mobility — engineered in Chennai, calibrated to Indian buildings, and held to international safety standards.',
  },
  {
    title: 'Values',
    body:
      'Customer-first design, transparency in every transaction, an uncompromising safety commitment, and continuous innovation in cabin, drive, and control technology.',
  },
];

const MILESTONES = [
  { year: '2019', title: 'Founded in Chennai',          body: 'Black Stone Elevators is established as a partnership firm in Manapakkam with a vision to redefine residential lift mobility in South India.' },
  { year: '2020', title: 'First Premium Installation',  body: 'Delivered our first premium home elevator with a modular shaft design — proving the engineering case for compact, design-led villa lifts.' },
  { year: '2021', title: '52 Villa Lifts in One Estate', body: 'Awarded the contract to install 52 home lifts across a single Chennai villa community. The project remains a reference point for the firm.' },
  { year: '2022', title: 'Expansion Across South India',body: 'Service operations expanded beyond Chennai into other South Indian cities, with dedicated technicians on AMC contracts.' },
  { year: '2024', title: 'Panorama Glass Series',       body: 'Launched the Panorama line — full-glass home elevators with advanced PMSM gearless drives and tempered, structurally bonded glazing.' },
];

const PARTNERS = [
  { name: 'Infant Savio',          role: 'Managing Partner · CEO' },
  { name: 'Shanmugam Venkatesan',  role: 'Partner · Operations' },
  { name: 'Charles Lillybai',      role: 'Partner · Finance' },
];

export default function About() {
  return (
    <PageShell
      eyebrow="The Firm"
      title={<>About<br /><span className="not-italic text-bs-bone/70 text-3xl md:text-5xl font-sans tracking-widest-plus uppercase">Black&nbsp;Stone&nbsp;Elevators</span></>}
      intro={
        <>
          Established in 2019, Black Stone Elevators is a Chennai-based partnership firm
          that designs, manufactures, installs, and services elevators across South India.
          From a single villa lift to a 52-unit residential estate, we deliver the entire
          project under one roof — no middlemen, no outsourced installations.
        </>
      }
    >
      {/* Stats strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bs-shaft/60 border border-bs-shaft/60 rounded-sm overflow-hidden mb-32 md:mb-40">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="bg-bs-ink p-6 md:p-8"
          >
            <s.icon size={16} strokeWidth={1.5} className="text-bs-gold/80 mb-4" />
            <div className="font-display italic text-3xl md:text-4xl text-bs-bone leading-tight mb-1">
              {s.value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-bs-mist">
              {s.label}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Workshop / install image band — proves the work */}
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-32 md:mb-40 -mx-6 md:-mx-12 lg:-mx-20"
      >
        <div className="aspect-[16/8] md:aspect-[16/6] overflow-hidden">
          <img
            src={installHero}
            alt="Recent Blackstone residential install — Chennai"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="absolute bottom-4 md:bottom-6 left-6 md:left-12 lg:left-20 font-mono text-[10px] uppercase tracking-widest-plus text-bs-bone bg-bs-black/70 backdrop-blur-sm px-3 py-1.5 rounded-sm border border-bs-gold/30">
          Residential install · Chennai
        </figcaption>
      </motion.figure>

      {/* Narrative block */}
      <section className="grid md:grid-cols-12 gap-8 md:gap-16 mb-32 md:mb-40">
        <div className="md:col-span-5">
          <p className="eyebrow mb-5">Our Story</p>
          <h2 className="font-display italic text-4xl md:text-6xl leading-[0.95] text-bs-bone">
            Built on transparency.<br />Run by engineers.
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6 font-sans text-base text-bs-bone/75 leading-relaxed">
          <p>
            We started in a small workshop in Manapakkam with a simple idea: an elevator should
            be designed for the building it goes into — not pulled from a catalogue. Six years
            later, that's still how we work. Every project begins with a site visit and ends with
            the same team of engineers handing over the keys.
          </p>
          <p>
            From passenger lifts and stainless-steel cabins to hospital elevators and freight
            lifts, our work spans residential, commercial, and industrial buildings. We follow
            moral business policies and crystal-clear transparency in every transaction — the
            same way the firm was set up on day one.
          </p>
          <p className="text-bs-gold/90 font-display italic text-xl md:text-2xl border-l-2 border-bs-gold/40 pl-6 mt-8">
            "Promising Journey To Future" — the line under our logo. It's also the standard
            we hold every lift to before it ships.
          </p>
        </div>
      </section>

      {/* Philosophy — mission/vision/values */}
      <section className="mb-32 md:mb-40">
        <header className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">Our Philosophy</p>
          <h2 className="font-display italic text-4xl md:text-5xl text-bs-bone leading-tight">
            Mission, Vision &amp; Values
          </h2>
        </header>
        <div className="grid md:grid-cols-3 gap-px bg-bs-shaft/60 border border-bs-shaft/60 rounded-sm overflow-hidden">
          {PHILOSOPHY.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bs-ink p-8 md:p-10"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display italic text-3xl md:text-4xl text-bs-bone mb-4">
                {p.title}
              </h3>
              <p className="font-sans text-sm md:text-[15px] text-bs-bone/70 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-32 md:mb-40">
        <header className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">Our Journey</p>
          <h2 className="font-display italic text-4xl md:text-5xl text-bs-bone leading-tight">
            Key milestones in our evolution.
          </h2>
        </header>
        <ol className="relative space-y-12 md:space-y-16 max-w-3xl">
          <div className="absolute left-3 md:left-5 top-1 bottom-1 w-px bg-bs-shaft" />
          {MILESTONES.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pl-12 md:pl-20"
            >
              <span className="absolute left-0 top-2 w-6 h-6 md:w-10 md:h-10 rounded-full bg-bs-black border border-bs-gold/60 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-bs-gold shadow-[0_0_10px_rgba(212,175,106,0.7)]" />
              </span>
              <div className="font-mono text-[11px] md:text-xs uppercase tracking-widest-plus text-bs-gold mb-2">
                {m.year}
              </div>
              <h3 className="font-display italic text-2xl md:text-3xl text-bs-bone leading-tight mb-2">
                {m.title}
              </h3>
              <p className="font-sans text-sm md:text-base text-bs-bone/70 leading-relaxed">
                {m.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Partners */}
      <section className="mb-32 md:mb-40">
        <header className="mb-10 max-w-2xl">
          <p className="eyebrow mb-4">Partners</p>
          <h2 className="font-display italic text-4xl md:text-5xl text-bs-bone leading-tight">
            The firm behind every project.
          </h2>
        </header>
        <div className="grid md:grid-cols-3 gap-px bg-bs-shaft/60 border border-bs-shaft/60 rounded-sm overflow-hidden">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-bs-ink p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-full bg-bs-gold/10 border border-bs-gold/40 flex items-center justify-center mb-6">
                <span className="font-display italic text-2xl text-bs-gold">
                  {p.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </span>
              </div>
              <h3 className="font-display italic text-2xl text-bs-bone mb-1">
                {p.name}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bs-mist">
                {p.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative border border-bs-shaft p-10 md:p-16 rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bs-gold/[0.06] via-transparent to-bs-gold/[0.04] pointer-events-none" />
        <div className="relative max-w-2xl">
          <p className="eyebrow mb-5">Visit Us</p>
          <h2 className="font-display italic text-3xl md:text-5xl leading-tight text-bs-bone mb-6">
            Walk into the workshop.
          </h2>
          <p className="font-sans text-base text-bs-bone/70 mb-8 leading-relaxed">
            Our manufacturing facility in Manapakkam is open by appointment. Come see the cabins
            being built, meet the engineers, and ask the difficult questions in person.
          </p>
          <p className="flex items-start gap-2 font-mono text-[10px] uppercase tracking-widest text-bs-mist mb-8">
            <MapPin size={12} strokeWidth={1.5} className="mt-0.5" />
            <span>
              Plot No. 6, T V Nagar, Mugalivakkam,<br />
              Manapakkam, Chennai – 600125, Tamil Nadu
            </span>
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bs-gold text-bs-black font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-champagne transition-colors"
          >
            Schedule a Visit <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
