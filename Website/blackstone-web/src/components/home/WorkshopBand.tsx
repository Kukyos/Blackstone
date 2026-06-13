import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import workshopImg from '@/assets/workshop-exterior.jpg';

// A wide, cinematic image band with a parallax-translated photo and a quote
// overlay. Sits between Process and the closing CTA — gives the homepage a
// "place" — the actual Manapakkam workshop.
export default function WorkshopBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} className="relative h-[80vh] md:h-[100vh] overflow-hidden border-t border-bs-shaft">
      <motion.div style={{ y }} className="absolute inset-[-10%]">
        <img
          src={workshopImg}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Layered darken */}
      <div className="absolute inset-0 bg-gradient-to-b from-bs-black/85 via-bs-black/55 to-bs-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(10,9,8,0.65)_100%)]" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6 md:px-12 text-center">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-7"
          >
            Manapakkam · Chennai
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display italic text-3xl md:text-6xl leading-[1.05] text-bs-bone"
          >
            "An elevator should be designed for the building it goes into —
            <span className="block mt-3 text-gold-sheen animate-shimmer">not pulled from a catalogue."</span>
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-bs-gold/60 text-bs-gold font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-gold/10 transition-colors"
            >
              The firm <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-bs-mist">
              <MapPin size={11} strokeWidth={1.5} className="text-bs-gold/70" />
              Walk-ins by appointment
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
