import { useEffect, useRef } from 'react';

// Animated background — slow, vertical "elevator cable" lines with a gold sheen,
// drifting and rippling. Re-flavored from ORYN's serpent for the elevator brief.
export default function CableField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let time = 0;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.003;

      const cables = w < 768 ? 7 : 14;
      const gap = w / (cables + 1);

      for (let i = 0; i < cables; i++) {
        const x = gap * (i + 1);
        const phase = i * 0.4 + time * 2;
        const sway = Math.sin(time + i * 0.6) * (w < 768 ? 10 : 20);

        const grad = ctx.createLinearGradient(x, 0, x, h);
        grad.addColorStop(0, 'rgba(212, 175, 106, 0)');
        grad.addColorStop(0.3, 'rgba(212, 175, 106, 0.18)');
        grad.addColorStop(0.5, 'rgba(230, 207, 160, 0.32)');
        grad.addColorStop(0.7, 'rgba(212, 175, 106, 0.18)');
        grad.addColorStop(1, 'rgba(212, 175, 106, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let y = 0; y <= h; y += 6) {
          const ripple = Math.sin(y * 0.005 + phase) * 4;
          const px = x + sway + ripple;
          if (y === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.stroke();
      }

      // Subtle floating "car" — a soft horizontal band that drifts up slowly
      const carY = (h * 1.2 - ((time * 80) % (h * 1.4)));
      const carGrad = ctx.createLinearGradient(0, carY - 30, 0, carY + 30);
      carGrad.addColorStop(0, 'rgba(212, 175, 106, 0)');
      carGrad.addColorStop(0.5, 'rgba(212, 175, 106, 0.05)');
      carGrad.addColorStop(1, 'rgba(212, 175, 106, 0)');
      ctx.fillStyle = carGrad;
      ctx.fillRect(0, carY - 30, w, 60);

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-90 mix-blend-screen"
      aria-hidden
    />
  );
}
