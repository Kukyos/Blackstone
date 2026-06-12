import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';

type FAQItem = { q: string; a: string };

const CATEGORIES: { id: string; label: string; faqs: FAQItem[] }[] = [
  {
    id: 'lineup',
    label: 'Our Lineup',
    faqs: [
      {
        q: 'What types of lifts does Black Stone Elevators install?',
        a: 'Passenger lifts, hospital elevators, goods and freight lifts, panoramic glass elevators, dumbwaiters, stainless-steel cabins, and modular home lifts for villas. Every category is available in both standard and custom configurations.',
      },
      {
        q: 'Do you design custom cabins?',
        a: 'Yes. We design every cabin around the building it goes into — stainless-steel finishes, wood inlays, tempered-glass walls, and bespoke ceiling and lighting layouts. Show us your interior architect\'s mood-board and we will match it.',
      },
      {
        q: 'What capacities do you support?',
        a: 'Standard configurations range from 4-person (272 kg) to 13-person (884 kg) passenger lifts. Freight lifts can be specified up to several tonnes depending on shaft dimensions. Custom capacities are quoted on request.',
      },
      {
        q: 'How many floors can a single lift serve?',
        a: 'Our standard installations comfortably serve up to G+15 floors. Beyond that, traffic-study based configurations and twin-lift layouts are available — talk to our design team before the architect locks the shaft drawings.',
      },
    ],
  },
  {
    id: 'install',
    label: 'Installation',
    faqs: [
      {
        q: 'How long does a typical installation take?',
        a: 'For a standard villa home lift with the shaft already built: roughly 3–4 weeks from materials arrival to commissioning. Larger commercial installations vary based on civil work and lift specification. The exact timeline is given in writing with the quote.',
      },
      {
        q: 'Do I need to build the shaft before you arrive?',
        a: 'Not necessarily. We offer modular self-supporting shaft options for retrofits and villa installations where civil construction is impractical. For new buildings, we coordinate directly with your architect on shaft dimensions and load points.',
      },
      {
        q: 'What power supply does the lift need?',
        a: 'Standard configurations run on a 3-phase, 415V supply. Smaller residential lifts can run on single-phase 230V. All installations include a battery backup as a standard safety feature so the cabin lands safely on power loss.',
      },
      {
        q: 'Do you handle the civil work and electricals?',
        a: 'We coordinate with your civil contractor and electrician but do not undertake civil construction ourselves. We provide complete drawings, load specs, and electrical requirements as part of the design phase — and our engineers are on-site through commissioning.',
      },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Standards',
    faqs: [
      {
        q: 'What safety systems are standard on every lift?',
        a: 'Door interlocks, overload sensors with audio-visual alerts, automatic rescue device (ARD) that lowers the cabin during power loss, emergency battery backup, emergency lowering, and intercom with the ground floor. All standard — never an upsell.',
      },
      {
        q: 'Do your lifts meet Indian and international codes?',
        a: 'Yes. Our installations are built to current Indian Standards (IS 14665 series) and reference EN 81 safety norms. Documentation and compliance certificates are part of the handover package.',
      },
      {
        q: 'What happens if the power fails while someone is inside?',
        a: 'The auto-rescue device immediately moves the cabin to the nearest floor and opens the doors using the battery backup. The cabin will not move further until power is restored or the system is manually reset by a service technician.',
      },
    ],
  },
  {
    id: 'service',
    label: 'Service & Support',
    faqs: [
      {
        q: 'Do you offer annual maintenance contracts (AMC)?',
        a: 'Yes — quarterly preventive maintenance, emergency call-outs, and a service-history log. AMC enrollment is offered at handover and can be renewed yearly. We service installations from any manufacturer, not just our own.',
      },
      {
        q: 'How fast is your service response?',
        a: 'Same-day response for AMC customers within the Chennai metropolitan area; next-day for other South Indian cities. Out-of-contract calls are quoted on receipt and prioritized by safety impact.',
      },
      {
        q: 'What warranty do you provide?',
        a: 'A standard one-year comprehensive warranty on new installations covering parts and labour, with extended-warranty options available. Spare-part availability is guaranteed for the life of the installation.',
      },
      {
        q: 'Can you modernize a lift from another manufacturer?',
        a: 'Yes. Modernization is a major part of our practice — drive system upgrades, microprocessor controllers, cabin refurbishment, and bringing legacy installations into current safety compliance without rebuilding the shaft.',
      },
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    faqs: [
      {
        q: 'What are your payment terms?',
        a: 'Typically 50% advance with the purchase order, 40% on material delivery to site, and 10% on commissioning and handover. Custom terms are negotiable for large or staged commercial projects.',
      },
      {
        q: 'Which payment modes do you accept?',
        a: 'Bank transfer (NEFT/RTGS/IMPS), cheque, pay-order, online payment, and cash. We bank with IndusInd Bank. All transactions are fully invoiced with our GST: 33AAVFB2091D1ZK.',
      },
      {
        q: 'Do you serve cities outside Chennai?',
        a: 'Yes — primarily across South India. We currently operate in Chennai, Bangalore, and other Tamil Nadu / Karnataka cities. For projects outside this footprint, talk to us first about logistics and on-site support before placing an order.',
      },
    ],
  },
];

export default function FAQ() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const [openIdx, setOpenIdx] = useState<string | null>(`${CATEGORIES[0].id}-0`);
  const current = CATEGORIES.find(c => c.id === active)!;

  return (
    <PageShell
      eyebrow="Common Questions"
      title={<>Frequently<br /><span className="not-italic text-bs-bone/70 text-3xl md:text-5xl font-sans tracking-widest-plus uppercase">Asked</span></>}
      intro={
        <>
          Quick answers to the questions every Chennai lift buyer asks us first. If your
          question isn't here, the <Link to="/contact" className="text-bs-gold hover:underline">enquiry form</Link> reaches our design team
          directly — most replies go out within a day.
        </>
      }
    >
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-12 md:mb-16 border-b border-bs-shaft pb-4 -mx-1">
        {CATEGORIES.map(c => {
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActive(c.id);
                setOpenIdx(`${c.id}-0`);
              }}
              className={`relative px-4 md:px-5 py-2 md:py-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-widest-plus transition-colors
                ${isActive ? 'text-bs-gold' : 'text-bs-bone/55 hover:text-bs-bone/90'}`}
            >
              {c.label}
              {isActive && (
                <motion.span
                  layoutId="faq-active"
                  className="absolute -bottom-[18px] left-0 right-0 h-px bg-bs-gold shadow-[0_0_10px_rgba(212,175,106,0.6)]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Accordion */}
      <div className="space-y-2 max-w-4xl">
        {current.faqs.map((item, i) => {
          const id = `${current.id}-${i}`;
          const open = openIdx === id;
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className={`border border-bs-shaft/80 rounded-sm overflow-hidden transition-colors
                ${open ? 'bg-bs-ink/80' : 'bg-bs-ink/40 hover:bg-bs-ink/60'}`}
            >
              <button
                onClick={() => setOpenIdx(open ? null : id)}
                className="w-full flex items-start gap-4 md:gap-6 text-left p-5 md:p-7"
                aria-expanded={open}
              >
                <span className="shrink-0 mt-1 font-mono text-[10px] uppercase tracking-widest text-bs-gold/70">
                  Q{String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-display text-lg md:text-2xl text-bs-bone leading-tight">
                  {item.q}
                </span>
                <span
                  className={`shrink-0 mt-1 w-7 h-7 rounded-full border flex items-center justify-center transition-all
                    ${open ? 'bg-bs-gold border-bs-gold text-bs-black' : 'border-bs-shaft text-bs-bone/70'}`}
                >
                  {open ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-7 pb-6 md:pb-8 pl-14 md:pl-20 font-sans text-sm md:text-[15px] text-bs-bone/75 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Still wondering CTA */}
      <section className="mt-32 md:mt-40 relative border border-bs-shaft p-10 md:p-16 rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bs-gold/[0.06] via-transparent to-bs-gold/[0.04] pointer-events-none" />
        <div className="relative max-w-2xl">
          <p className="eyebrow mb-5">Still Wondering?</p>
          <h2 className="font-display italic text-3xl md:text-5xl leading-tight text-bs-bone mb-6">
            Talk to a real engineer.
          </h2>
          <p className="font-sans text-base text-bs-bone/70 mb-8 leading-relaxed">
            Lift decisions are full of details — capacity, traffic, code, finishes. Send us
            the specifics and you'll hear back from someone who actually installs them, not a
            sales rep.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bs-gold text-bs-black font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-champagne transition-colors"
          >
            Ask a Question <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
