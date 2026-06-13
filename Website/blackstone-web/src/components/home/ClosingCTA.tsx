import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

export default function ClosingCTA() {
  return (
    <section className="relative py-28 md:py-44 border-t border-bs-shaft bg-bs-black overflow-hidden">
      {/* Decorative oversized gold word in the back */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.05] pointer-events-none"
      >
        <span className="font-display italic text-[28vw] leading-none text-bs-gold whitespace-nowrap">
          Blackstone
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-7"
        >
          Ready to begin
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display italic text-5xl md:text-8xl leading-[0.95] text-bs-bone mb-8"
        >
          Call the lift.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans text-base md:text-lg text-bs-bone/70 leading-relaxed mb-12 max-w-xl mx-auto"
        >
          A free site visit anywhere in Chennai. A real quote within a week —
          not a brochure, not a sales call.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-10 py-5 bg-bs-gold text-bs-black font-mono text-[11px] uppercase tracking-widest-plus shadow-[0_0_40px_-10px_rgba(212,175,106,0.6)] hover:shadow-[0_0_60px_-8px_rgba(212,175,106,0.8)] transition-shadow"
          >
            <span className="relative z-10">Send an Enquiry</span>
            <ArrowRight size={14} strokeWidth={1.75} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-bs-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </Link>
          <a
            href="tel:+917942704796"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-bs-shaft text-bs-bone/85 font-mono text-[11px] uppercase tracking-widest-plus hover:border-bs-gold hover:text-bs-gold transition-colors"
          >
            <Phone size={13} strokeWidth={1.5} />
            +91 79427 04796
          </a>
        </motion.div>
      </div>
    </section>
  );
}
