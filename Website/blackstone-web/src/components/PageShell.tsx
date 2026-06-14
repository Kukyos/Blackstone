import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import AmbientField from './AmbientField';

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  /** Set false on pages that supply their own backdrop (e.g. Contact's panel). */
  ambient?: boolean;
}

// Standard interior-page wrapper: top spacing to clear the floating navbar,
// animated header, then the page's main content. An AmbientField sits behind
// content by default — interior pages used to feel "too static" without it.
export default function PageShell({ eyebrow, title, intro, children, ambient = true }: Props) {
  return (
    <div className="relative">
      {ambient && (
        <div className="fixed inset-0 -z-10">
          <AmbientField />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
      >
      <header className="mb-16 md:mb-24 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow mb-6"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display italic text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-gold-sheen animate-shimmer"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 md:mt-14 font-sans text-base md:text-lg text-bs-bone/75 leading-relaxed max-w-2xl"
          >
            {intro}
          </motion.div>
        )}
      </header>
      {children}
      </motion.div>
    </div>
  );
}
