import { Plus } from 'lucide-react';

// Blueprint-style corner markers — industrial / engineering accent.
export default function Crosshairs() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="absolute top-0 left-6 md:left-16 bottom-0 w-px bg-bs-bone/[0.04]" />
      <div className="absolute top-0 right-6 md:right-16 bottom-0 w-px bg-bs-bone/[0.04]" />

      <div className="absolute top-28 left-6 md:left-16 -translate-x-1/2 -translate-y-1/2">
        <Plus size={14} className="text-bs-gold/30" strokeWidth={1.25} />
      </div>
      <div className="absolute top-28 right-6 md:right-16 translate-x-1/2 -translate-y-1/2">
        <Plus size={14} className="text-bs-gold/30" strokeWidth={1.25} />
      </div>
      <div className="absolute bottom-20 left-6 md:left-16 -translate-x-1/2 translate-y-1/2">
        <Plus size={14} className="text-bs-gold/30" strokeWidth={1.25} />
      </div>
      <div className="absolute bottom-20 right-6 md:right-16 translate-x-1/2 translate-y-1/2">
        <Plus size={14} className="text-bs-gold/30" strokeWidth={1.25} />
      </div>
    </div>
  );
}
