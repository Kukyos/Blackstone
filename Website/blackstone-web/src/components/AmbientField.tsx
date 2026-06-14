import useDevicePerf from '@/hooks/useDevicePerf';

/**
 * AmbientField — CSS-only fluid backdrop used on interior pages to keep the
 * site feeling alive without the GPU spend of CableField (canvas-based).
 *
 * Two tiers:
 *   - Desktop / heavy-ok: three drifting gold "orbs" (blurred radial gradients)
 *     animated via CSS `@keyframes` defined inline so the component is
 *     drop-in anywhere. Plus a faint hairline grid that pulses opacity.
 *   - Mobile / reduced-motion: a static gradient backdrop only. Zero JS, zero
 *     animation cost. Still gives the page warmth.
 *
 * Lives behind your content as `absolute inset-0`. Always renders inside a
 * `relative` parent.
 */
export default function AmbientField() {
  const { isHeavyOk } = useDevicePerf();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base gradient — always on */}
      <div className="absolute inset-0 bg-gradient-to-b from-bs-black via-bs-ink to-bs-black" />

      {/* Soft top vignette so navbar reads */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bs-black/90 to-transparent" />

      {isHeavyOk && (
        <>
          {/* Inject keyframes once per mount. Scoped via unique animation names. */}
          <style>{KEYFRAMES}</style>

          {/* Three drifting orbs — different sizes, speeds, positions. */}
          <div className="absolute w-[60vw] h-[60vw] max-w-[820px] max-h-[820px] -left-[10vw] top-[5vh] rounded-full bg-bs-gold/[0.07] blur-[120px]"
               style={{ animation: 'bs-orb-a 28s ease-in-out infinite' }} />
          <div className="absolute w-[45vw] h-[45vw] max-w-[640px] max-h-[640px] -right-[8vw] top-[40vh] rounded-full bg-[#C9846A]/[0.05] blur-[110px]"
               style={{ animation: 'bs-orb-b 34s ease-in-out infinite' }} />
          <div className="absolute w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] left-[20vw] bottom-[-10vh] rounded-full bg-[#8FB4D8]/[0.04] blur-[140px]"
               style={{ animation: 'bs-orb-c 40s ease-in-out infinite' }} />

          {/* Hairline grid that breathes opacity. CSS-only — cheap. */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(212,175,106,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,106,0.5) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              animation: 'bs-grid-pulse 12s ease-in-out infinite',
            }}
          />

          {/* Single slow vertical sheen — like a passing lift car */}
          <div
            className="absolute inset-x-0 h-[40vh] bg-gradient-to-b from-transparent via-bs-gold/[0.025] to-transparent"
            style={{ animation: 'bs-sheen 18s linear infinite' }}
          />
        </>
      )}

      {/* Bottom fade so content sits on a clean stop */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bs-black to-transparent" />
    </div>
  );
}

const KEYFRAMES = `
@keyframes bs-orb-a {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(8vw, 6vh); }
}
@keyframes bs-orb-b {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-6vw, -8vh); }
}
@keyframes bs-orb-c {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-4vw, -10vh); }
}
@keyframes bs-grid-pulse {
  0%, 100% { opacity: 0.04; }
  50%      { opacity: 0.08; }
}
@keyframes bs-sheen {
  0%   { transform: translateY(-50%); opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translateY(150vh); opacity: 0; }
}
`;
