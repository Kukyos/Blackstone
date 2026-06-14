import { useEffect, useState } from 'react';

/**
 * useDevicePerf — single source of truth for "should I run the heavy version?"
 *
 * We tier the experience into three classes so animation work doesn't punish
 * weak devices:
 *
 *   - `isDesktop`     true if viewport ≥ 1024px (lg breakpoint)
 *   - `isMobile`      true if viewport < 768px
 *   - `prefersReducedMotion` honours user OS-level setting
 *   - `isHeavyOk`     convenience: desktop AND not reduced-motion AND not low-DPR low-mem device
 *
 * Use `isHeavyOk` to gate canvas animations, big parallax, and motion-heavy
 * components. Mobile users still see the layout — just without the GPU spend.
 */
export type DevicePerf = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  isHeavyOk: boolean;
  width: number;
};

const SSR_DEFAULT: DevicePerf = {
  isDesktop: true,
  isTablet: false,
  isMobile: false,
  prefersReducedMotion: false,
  isHeavyOk: true,
  width: 1280,
};

function read(): DevicePerf {
  if (typeof window === 'undefined') return SSR_DEFAULT;

  const w = window.innerWidth;
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const isDesktop = w >= 1024;

  const prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  // Detect under-powered devices: low DPR + very small viewport + few logical cores.
  // We never block heavy on a desktop just for cores, but we never run heavy on
  // mobile/tablet, period.
  const lowMem =
    // @ts-expect-error -- deviceMemory is a non-standard but widely-supported hint
    typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory <= 2;

  const isHeavyOk = isDesktop && !prefersReducedMotion && !lowMem;

  return {
    isDesktop,
    isTablet,
    isMobile,
    prefersReducedMotion,
    isHeavyOk,
    width: w,
  };
}

export default function useDevicePerf(): DevicePerf {
  const [perf, setPerf] = useState<DevicePerf>(read);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const update = () => {
      // Debounce so resize-drag doesn't thrash react renders.
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setPerf(read()), 120);
    };

    window.addEventListener('resize', update);
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    mql.addEventListener?.('change', update);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('resize', update);
      mql.removeEventListener?.('change', update);
    };
  }, []);

  return perf;
}
