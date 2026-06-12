
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ViewState } from '../types';
import { ArrowRight, Plus, ExternalLink } from 'lucide-react';
import { WORK_PROJECTS, SOCIAL_LINKS } from '../constants';

interface HomeProps {
  setView: (view: ViewState) => void;
}

// --- GOLDEN SERPENT ANIMATION ---
const GoldenSerpent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.002;

      const lines = window.innerWidth < 768 ? 6 : 12; // Fewer lines on mobile
      const amplitude = canvas.height * 0.15;
      const frequency = 0.001;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(230, 213, 184, 0)');
      gradient.addColorStop(0.2, 'rgba(230, 213, 184, 0.5)');
      gradient.addColorStop(0.5, 'rgba(255, 223, 120, 0.8)');
      gradient.addColorStop(0.8, 'rgba(230, 213, 184, 0.5)');
      gradient.addColorStop(1, 'rgba(230, 213, 184, 0)');

      ctx.strokeStyle = gradient;

      for (let j = 0; j < lines; j++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5; 
        
        const phaseOffset = j * 0.15; 
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 
            + Math.sin(x * frequency + time + phaseOffset) * amplitude 
            + Math.cos(x * frequency * 0.5 - time) * (amplitude * 0.5)
            + Math.sin(x * 0.005 + time * 2) * 50;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-70 mix-blend-screen" />;
};

// --- GEOMETRIC OVERLAYS ---
const GeometricDecorations = () => (
  <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
    {/* Vertical Lines */}
    <div className="absolute top-0 left-6 md:left-24 bottom-0 w-px bg-lux-white/5" />
    <div className="absolute top-0 right-6 md:right-24 bottom-0 w-px bg-lux-white/5" />
    
    {/* Crosshairs */}
    <div className="absolute top-32 left-6 md:left-24 w-4 h-4 -translate-x-1/2 -translate-y-1/2">
      <Plus size={16} className="text-lux-gold/30" />
    </div>
    <div className="absolute top-32 right-6 md:right-24 w-4 h-4 translate-x-1/2 -translate-y-1/2">
      <Plus size={16} className="text-lux-gold/30" />
    </div>
    <div className="absolute bottom-24 left-6 md:left-24 w-4 h-4 -translate-x-1/2 translate-y-1/2">
      <Plus size={16} className="text-lux-gold/30" />
    </div>
    <div className="absolute bottom-24 right-6 md:right-24 w-4 h-4 translate-x-1/2 translate-y-1/2">
      <Plus size={16} className="text-lux-gold/30" />
    </div>
  </div>
);

const Home: React.FC<HomeProps> = ({ setView }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // -- SCROLL HOOKS --
  const { scrollY } = useScroll();
  
  // -- HERO ANIMATIONS --
  const heroTextY = useTransform(scrollY, [0, 500], [0, 100]); 
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // -- STICKY GALLERY LOGIC --
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  // Adjusted for mobile to scroll less distance horizontally
  const galleryX = useTransform(smoothProgress, [0, 1], ["0%", "-300vw"]);

  const scrollToGalleryStart = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="w-full relative bg-lux-black text-lux-white snap-y snap-mandatory scroll-smooth">
      
      <GeometricDecorations />

      {/* --- SECTION 1: HERO --- */}
      <section className="min-h-[100dvh] relative z-10 w-full flex flex-col items-center justify-center overflow-hidden snap-start">
          
          <GoldenSerpent />

          <div className="absolute inset-0 z-0 bg-lux-black">
             <div className="absolute inset-0 bg-noise-overlay opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lux-black/50 to-lux-black" />
          </div>

          <motion.div 
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="z-30 flex flex-col items-center relative px-4 text-center"
          >
             <div className="flex items-center gap-3 md:gap-6 mb-8 md:mb-12">
                <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-lux-gold/50" />
                <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-lux-gold drop-shadow-[0_0_10px_rgba(230,213,184,0.3)]">
                  Est. 2025
                </p>
                <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-lux-gold/50" />
             </div>
             
             <div className="relative">
               <h1 className="text-[22vw] md:text-[18vw] leading-[0.8] font-serif font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-lux-white via-lux-white to-lux-white/40 filter drop-shadow-2xl relative z-10">
                 ORYN
               </h1>
               <h1 className="text-[22vw] md:text-[18vw] leading-[0.8] font-serif font-light tracking-tight text-lux-gold/10 absolute top-0 left-0 blur-xl z-0 scale-105">
                 ORYN
               </h1>
               <span className="absolute -top-1 md:-top-2 right-0 md:-right-8 text-[10px] md:text-xs font-mono tracking-widest text-lux-gold/70">®</span>
             </div>
             
             <div className="mt-12 md:mt-16 text-center max-w-2xl px-2 relative">
               <div className="absolute left-1/2 -translate-x-1/2 -top-6 md:-top-8 w-px h-12 md:h-16 bg-gradient-to-b from-lux-gold/0 via-lux-gold/40 to-lux-gold/0" />
               <p className="font-sans font-light text-sm md:text-xl tracking-[0.15em] md:tracking-[0.2em] text-lux-white/80 uppercase leading-loose">
                 Architecture for the<br/>
                 <span className="text-lux-gold font-normal">Digital Vanguard</span>
               </p>
             </div>
          </motion.div>

          <motion.div 
            style={{ opacity: heroOpacity }}
            className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-4 animate-float opacity-50 cursor-pointer z-30"
            onClick={scrollToGalleryStart}
          >
             <span className="text-[9px] uppercase tracking-widest text-lux-white/50">Initialize</span>
             <div className="h-12 md:h-16 w-px bg-gradient-to-b from-lux-white/0 via-lux-gold to-lux-white/0" />
          </motion.div>
      </section>

      {/* --- SECTION 2: GALLERY --- */}
      <section ref={galleryRef} className="h-[400vh] relative z-20 bg-lux-black snap-start">
         <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col justify-center">
            
            <div className="absolute inset-0 pointer-events-none opacity-5" 
                 style={{ backgroundImage: 'linear-gradient(#E6D5B8 1px, transparent 1px), linear-gradient(90deg, #E6D5B8 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
            />

            <div className="absolute top-16 md:top-32 left-6 md:left-24 z-30 pointer-events-none text-white mix-blend-difference">
                <h2 className="font-serif text-3xl md:text-7xl leading-[0.9] font-light">
                  Selected <br/>
                  <span className="italic ml-4 text-lux-gold opacity-80">
                    Commissions
                  </span>
                </h2>
            </div>

            <motion.div style={{ x: galleryX }} className="flex items-center pl-6 md:pl-24 h-full">
               {WORK_PROJECTS.map((project, i) => (
                 <div key={project.id} className="min-w-[90vw] md:min-w-[50vw] h-[55vh] md:h-[60vh] relative group pr-4 md:pr-16 flex items-center justify-start">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
                      <div className="w-full h-full relative overflow-hidden bg-lux-surface border border-lux-white/5 transition-all duration-700 hover:border-lux-gold/30">
                          {/* Corner Accents */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-lux-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-lux-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                          <img 
                            src={project.img}
                            alt={project.title} 
                            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000 transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex justify-between items-end">
                             <div>
                               <p className="font-mono text-[9px] uppercase tracking-widest mb-3 text-lux-gold">
                                 No. 00{project.id}
                               </p>
                               <h3 className="text-2xl md:text-4xl font-serif text-white mb-2">{project.title}</h3>
                               <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase opacity-50">{project.type}</p>
                             </div>
                             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-lux-white/10 flex items-center justify-center transition-all group-hover:bg-lux-gold group-hover:border-lux-gold group-hover:text-black">
                                <ExternalLink size={16} className="transition-transform duration-500" />
                             </div>
                          </div>
                      </div>
                    </a>
                 </div>
               ))}
               
               <div className="min-w-[50vw] md:min-w-[30vw] h-full flex items-center justify-center text-center px-12">
                  <div className="rotate-90 font-mono text-xs uppercase tracking-[0.3em] opacity-30 whitespace-nowrap">
                    End of Collection
                  </div>
               </div>
            </motion.div>
            
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-lux-white/10">
              <motion.div style={{ scaleX: smoothProgress }} className="h-full origin-left bg-lux-gold shadow-[0_0_15px_rgba(230,213,184,0.8)]" />
            </div>
         </div>
      </section>

      {/* --- SECTION 3: CTA / FOOTER --- */}
      <section className="min-h-[100dvh] relative z-30 pt-16 pb-0 flex flex-col justify-between snap-start bg-lux-white text-lux-black">
        
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />

        <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
             className="relative"
           >
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-lux-black/20" />
             
             <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-8 md:mb-10">System Architecture</p>
             <h2 className="text-5xl md:text-9xl leading-[0.9] mb-8 md:mb-12 tracking-tight font-serif font-light">
               Design Your <br/>
               <span className="italic text-lux-charcoal">
                 Legacy
               </span>
             </h2>
             
             <p className="max-w-md mx-auto font-sans text-xs md:text-sm opacity-60 mb-16 md:mb-20 leading-relaxed tracking-wide">
               Oryn Atelier. Where code meets craftsmanship. <br/>
               Select your archetype to begin the transformation.
             </p>

             <button 
               onClick={() => setView('STORE')}
               className="group relative px-16 md:px-20 py-5 md:py-6 overflow-hidden transition-all bg-lux-black text-lux-gold border border-lux-black"
             >
               <div className="absolute inset-0 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] bg-lux-gold" />
               <span className="relative z-10 font-bold uppercase tracking-[0.25em] text-[10px] transition-colors group-hover:text-lux-black flex items-center gap-2">
                 Enter Atelier <ArrowRight size={10} />
               </span>
             </button>
           </motion.div>
        </div>

        {/* FOOTER */}
        <div className="w-full px-6 md:px-24 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 pb-12 pt-16 md:pt-24 border-t border-lux-black/5 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-lux-black/10 hidden md:block" />
            
            <div className="text-center md:text-left w-full md:w-auto">
                <p className="text-4xl mb-2 font-serif tracking-tight">ORYN</p>
                <div className="flex justify-center md:justify-start gap-6 font-mono text-[9px] uppercase tracking-widest opacity-50">
                   <a href={SOCIAL_LINKS.instagram} className="hover:text-black hover:opacity-100 transition-opacity">Instagram</a>
                   <a href={SOCIAL_LINKS.twitter} className="hover:text-black hover:opacity-100 transition-opacity">Twitter</a>
                   <a href={SOCIAL_LINKS.linkedin} className="hover:text-black hover:opacity-100 transition-opacity">LinkedIn</a>
                </div>
            </div>
            
            <div className="text-center md:text-right font-mono text-[9px] uppercase tracking-widest space-y-2 opacity-50 w-full md:w-auto">
                <p>Digital Atelier © 2025</p>
                <p>Config: <span className="font-bold">LUXURY</span></p>
            </div>
        </div>

      </section>

    </div>
  );
};

export default Home;
