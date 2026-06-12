import { motion } from 'framer-motion';

interface Props {
  eyebrow: string;
  title: string;
}

export default function Placeholder({ eyebrow, title }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] flex items-center justify-center pt-16 px-6"
    >
      <div className="text-center max-w-2xl">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="font-display text-5xl md:text-7xl text-gold-sheen animate-shimmer leading-tight">
          {title}
        </h1>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-widest-plus text-bs-mist">
          Page under construction · check back soon
        </p>
      </div>
    </motion.section>
  );
}
