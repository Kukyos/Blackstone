import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';

interface Props {
  /** Image URL displayed behind the doors as they open. */
  revealImage: string;
  /** Optional overlay content layered on top of the image (e.g. headline + CTA). */
  children?: ReactNode;
  /** Pin duration as a multiple of the viewport height. 2 = 2 screens of scroll. */
  scrollLength?: number;
  /** Small caption shown above the doors before they open. */
  eyebrow?: string;
  /** Floor-indicator labels shown on the door header (e.g. ["G", "1", "2"]). */
  floors?: string[];
}

// Sticky scroll-triggered "elevator doors" — two metallic gold panels split apart
// as the user scrolls through the section, revealing the photo + child content behind.
//
// Mechanic: the outer wrapper is `scrollLength` viewport-heights tall. Inside, a
// sticky container holds the doors at the top of the viewport. As scroll progresses
// from 0 → 1 through the section, the doors slide apart from 0% to 50% each.
export default function LiftDoors({
  revealImage,
  children,
  scrollLength = 2,
  eyebrow = 'Step Inside',
  floors = ['G', '1', '2', '3'],
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the scroll so the doors don't feel jittery on trackpads.
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  // Doors hold closed for the first ~10% of scroll (anticipation), then open.
  const openRange: [number, number] = reduced ? [0, 0.001] : [0.08, 0.78];
  const leftX  = useTransform(progress, openRange, ['0%', '-100%']);
  const rightX = useTransform(progress, openRange, ['0%', '100%']);

  // Floor indicator light travels across as doors open.
  const floorIndex = useTransform(progress, [0.05, 0.75], [0, floors.length - 1]);

  // The interior image scales down slightly as it's revealed (depth effect).
  const imageScale = useTransform(progress, [0.05, 0.85], [1.18, 1.0]);
  const imageOpacity = useTransform(progress, [0.05, 0.35], [0.4, 1]);

  // Headline content fades in once doors are mostly open.
  const overlayOpacity = useTransform(progress, [0.6, 0.95], [0, 1]);
  const overlayY = useTransform(progress, [0.6, 0.95], [30, 0]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full bg-bs-black"
      style={{ height: `${scrollLength * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Reveal: photo + child content */}
        <div className="absolute inset-0">
          <motion.img
            src={revealImage}
            alt=""
            aria-hidden
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dim + warm vignette to keep the gold accents readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-bs-black/40 via-transparent to-bs-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(10,9,8,0.7)_100%)]" />

          {/* Overlay content — padded to clear the fixed navbar */}
          {children && (
            <motion.div
              style={{ opacity: overlayOpacity, y: overlayY }}
              className="absolute inset-0 flex items-start md:items-center justify-center px-6 pt-32 md:pt-28 pb-12 z-10"
            >
              {children}
            </motion.div>
          )}
        </div>

        {/* Door frame — top header with floor indicator, positioned below the navbar */}
        <div className="absolute top-20 md:top-24 inset-x-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-bs-black/70 backdrop-blur-md border border-bs-gold/30 rounded-full">
            <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-widest-plus text-bs-gold/70">
              {eyebrow}
            </span>
            <span className="w-px h-3 bg-bs-gold/30" />
            <div className="flex items-center gap-1.5">
              {floors.map((f, i) => (
                <FloorDot key={f} label={f} index={i} activeIndex={floorIndex} />
              ))}
            </div>
          </div>
        </div>

        {/* LEFT DOOR */}
        <motion.div
          style={{ x: leftX }}
          className="absolute top-0 bottom-0 left-0 w-1/2 z-20 will-change-transform"
        >
          <DoorPanel side="left" />
        </motion.div>

        {/* RIGHT DOOR */}
        <motion.div
          style={{ x: rightX }}
          className="absolute top-0 bottom-0 right-0 w-1/2 z-20 will-change-transform"
        >
          <DoorPanel side="right" />
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */

function DoorPanel({ side }: { side: 'left' | 'right' }) {
  const gradient =
    side === 'left'
      ? 'linear-gradient(to right, #1C1A18 0%, #2A241B 30%, #3A301F 55%, #2A241B 80%, #B8923F 100%)'
      : 'linear-gradient(to left, #1C1A18 0%, #2A241B 30%, #3A301F 55%, #2A241B 80%, #B8923F 100%)';

  // Vertical brushed-metal sheen lines.
  const sheen =
    'repeating-linear-gradient(to bottom, rgba(212,175,106,0) 0px, rgba(212,175,106,0) 3px, rgba(212,175,106,0.05) 3px, rgba(212,175,106,0.05) 4px)';

  return (
    <div className="relative w-full h-full" style={{ background: gradient }}>
      {/* Brushed sheen */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: sheen }} />

      {/* Subtle horizontal seam at top + bottom — door header / floor band */}
      <div className="absolute top-0 inset-x-0 h-px bg-bs-gold/40" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-bs-gold/40" />

      {/* Vertical seam where the two doors meet (on the inner edge) */}
      <div
        className={`absolute top-0 bottom-0 w-px bg-bs-gold/60 shadow-[0_0_12px_rgba(212,175,106,0.5)]
          ${side === 'left' ? 'right-0' : 'left-0'}`}
      />

      {/* Handle / control panel on the inside edge */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-2 md:w-2.5 h-24 md:h-32 rounded-full bg-bs-gold/80 shadow-[0_0_20px_rgba(212,175,106,0.6)]
          ${side === 'left' ? 'right-4 md:right-6' : 'left-4 md:left-6'}`}
      />

      {/* Decorative Blackstone monogram embossed on each panel */}
      <div
        className={`absolute top-1/3 ${side === 'left' ? 'left-6 md:left-12' : 'right-6 md:right-12'}
          font-display italic text-bs-gold/15 text-4xl md:text-7xl select-none pointer-events-none`}
      >
        B
      </div>
    </div>
  );
}

import type { MotionValue } from 'framer-motion';
function FloorDot({
  label,
  index,
  activeIndex,
}: {
  label: string;
  index: number;
  activeIndex: MotionValue<number>;
}) {
  // Highlight when active index is at or past this dot.
  const opacity = useTransform(activeIndex, v => (v >= index - 0.2 ? 1 : 0.25));
  const bg = useTransform(activeIndex, v => (v >= index - 0.2 ? '#D4AF6A' : 'rgba(212,175,106,0.25)'));
  return (
    <motion.span
      style={{ opacity, backgroundColor: bg }}
      className="inline-flex items-center justify-center min-w-[18px] md:min-w-[22px] h-[18px] md:h-[22px] rounded-sm px-1 font-mono text-[8px] md:text-[9px] text-bs-black font-bold"
    >
      {label}
    </motion.span>
  );
}
