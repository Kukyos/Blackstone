import { motion } from 'framer-motion';

interface Props {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

// Animated SVG mark — a gold parallelogram frame that draws itself on mount,
// echoing the Blackstone logo's signature frame. The wordmark fades in after.
export default function BlackstoneMark({ size = 40, showWordmark = true, className = '' }: Props) {
  // Parallelogram path: slight slant on both sides, open feel like the logo frame.
  const framePath = 'M 12 8 L 220 8 L 232 56 L 24 56 Z';

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Blackstone Elevators">
      <svg
        width={size * 6}
        height={size * 1.6}
        viewBox="0 0 244 64"
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="bs-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B8923F" />
            <stop offset="35%" stopColor="#E6CFA0" />
            <stop offset="50%" stopColor="#D4AF6A" />
            <stop offset="70%" stopColor="#B8923F" />
            <stop offset="100%" stopColor="#E6CFA0" />
          </linearGradient>
        </defs>

        {/* Parallelogram frame — draws itself */}
        <motion.path
          d={framePath}
          stroke="url(#bs-gold)"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />

        {showWordmark && (
          <>
            <motion.text
              x="122"
              y="38"
              textAnchor="middle"
              fill="url(#bs-gold)"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontWeight: 500,
                fontSize: '24px',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
            >
              Blackstone
            </motion.text>
            <motion.text
              x="122"
              y="52"
              textAnchor="middle"
              fill="#F2EBDD"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '7.5px',
                letterSpacing: '0.5em',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
            >
              ELEVATORS
            </motion.text>
          </>
        )}
      </svg>
    </div>
  );
}
