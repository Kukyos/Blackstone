import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Hash, ArrowUpRight } from 'lucide-react';

const COLUMNS = [
  {
    heading: 'Lineup',
    links: [
      { to: '/services', label: 'Passenger Lifts' },
      { to: '/services', label: 'Home Elevators' },
      { to: '/services', label: 'Hospital Lifts' },
      { to: '/services', label: 'Goods & Freight' },
      { to: '/services', label: 'Panoramic Glass' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { to: '/services', label: 'New Installation' },
      { to: '/services', label: 'Maintenance & AMC' },
      { to: '/services', label: 'Modernization' },
      { to: '/services', label: 'Custom Design' },
      { to: '/services', label: 'Safety Audits' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/about',    label: 'Our Story' },
      { to: '/about',    label: 'Partners' },
      { to: '/about',    label: 'Visit the Workshop' },
      { to: '/faq',      label: 'FAQ' },
      { to: '/contact',  label: 'Enquire' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-bs-shaft bg-bs-black overflow-hidden">
      {/* Decorative top accent — gold gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-bs-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Top row: brand on left, columns on right */}
        <div className="grid lg:grid-cols-[1.3fr_2fr] gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Brand block */}
          <div>
            <Link to="/" className="inline-flex items-baseline gap-2 mb-6">
              <span className="font-display italic text-4xl md:text-5xl text-bs-gold">
                Blackstone
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest-plus text-bs-bone/60">
                Elevators
              </span>
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold mb-6">
              Promising Journey To Future
            </p>
            <p className="font-sans text-sm text-bs-bone/65 leading-relaxed max-w-md">
              Established 2019 in Manapakkam, Chennai. Designing, manufacturing, installing,
              and servicing lifts across South India — entirely in-house.
            </p>

            {/* Contact list */}
            <ul className="mt-8 space-y-3 max-w-md">
              <li className="flex items-start gap-3 font-sans text-sm text-bs-bone/80">
                <MapPin size={14} strokeWidth={1.5} className="mt-1 text-bs-gold/70 shrink-0" />
                <span>Plot No. 6, T V Nagar, Mugalivakkam,<br />Manapakkam, Chennai – 600125, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-3 font-sans text-sm">
                <Phone size={14} strokeWidth={1.5} className="text-bs-gold/70 shrink-0" />
                <a href="tel:+917942704796" className="text-bs-bone/80 hover:text-bs-gold transition-colors">
                  +91 79427 04796
                </a>
              </li>
              <li className="flex items-center gap-3 font-sans text-sm">
                <Mail size={14} strokeWidth={1.5} className="text-bs-gold/70 shrink-0" />
                <a href="mailto:blackstoneelevators@gmail.com" className="text-bs-bone/80 hover:text-bs-gold transition-colors">
                  blackstoneelevators@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 font-sans text-sm">
                <Hash size={14} strokeWidth={1.5} className="text-bs-gold/70 shrink-0" />
                <span className="text-bs-bone/80 font-mono text-xs tracking-widest">
                  GST 33AAVFB2091D1ZK
                </span>
              </li>
            </ul>
          </div>

          {/* Sitemap columns */}
          <nav className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {COLUMNS.map(col => (
              <div key={col.heading}>
                <h3 className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold mb-5">
                  {col.heading}
                </h3>
                <ul className="space-y-3">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="font-sans text-sm text-bs-bone/65 hover:text-bs-bone transition-colors inline-flex items-center gap-1.5 group"
                      >
                        {l.label}
                        <ArrowUpRight
                          size={11}
                          strokeWidth={1.5}
                          className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Oversized wordmark — decorative */}
        <div className="border-t border-bs-shaft/60 pt-12 md:pt-16">
          <div
            className="font-display italic leading-[0.85] tracking-tight text-transparent bg-clip-text
                       bg-gradient-to-b from-bs-gold/25 via-bs-gold/10 to-transparent
                       text-[18vw] md:text-[14vw] select-none -mb-2"
            aria-hidden
          >
            Blackstone
          </div>
        </div>

        {/* Legal strip */}
        <div className="border-t border-bs-shaft/60 pt-6 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-bs-mist">
            © {year} Black Stone Elevators · Partnership firm · All rights reserved
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-bs-mist/60">
            Made in Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}
