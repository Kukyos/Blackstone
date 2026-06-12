import React, { useState } from 'react';
import { ViewState, User } from '../types';
import { motion } from 'framer-motion';
import { ScanFace, ArrowRight, ShieldCheck, Fingerprint, AlertCircle, Mail, CheckCircle } from 'lucide-react';
import { backend } from '../services/backend';

interface AuthProps {
  mode: 'LOGIN' | 'SIGNUP';
  onAuth: (user: User) => void;
  setView: (view: ViewState) => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onAuth, setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  
  const isMock = !backend.isConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'LOGIN') {
        const user = await backend.login(email, password);
        onAuth(user);
      } else {
        const { user, session } = await backend.signup(name, email, password);
        
        if (session) {
            // Auto-login if session exists (Email verification disabled)
            onAuth(user);
        } else {
            // Email verification required
            setNeedsVerification(true);
            setIsLoading(false);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication Protocol Failed");
      setIsLoading(false);
    }
  };

  // --- Verification Sent View ---
  if (needsVerification) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-lux-black relative overflow-hidden">
             <div className="absolute inset-0 bg-noise-overlay opacity-30" />
             <div className="w-full max-w-[440px] relative z-10 px-6">
                <div className="bg-[#050505]/80 backdrop-blur-xl border border-lux-white/10 p-10 text-center relative shadow-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-lux-gold/10 text-lux-gold border border-lux-gold/20">
                        <Mail size={24} />
                    </div>
                    <h2 className="text-3xl font-serif text-lux-white mb-4">Verify Identity</h2>
                    <p className="font-mono text-xs text-lux-white/60 mb-8 leading-relaxed">
                        A secure link has been sent to <span className="text-lux-gold">{email}</span>. 
                        Please confirm your digital signature to access the Atelier.
                    </p>
                    <button 
                        onClick={() => setView('LOGIN')}
                        className="w-full py-4 bg-lux-white text-lux-black font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-lux-gold transition-colors"
                    >
                        Return to Access Point
                    </button>
                </div>
             </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-lux-black overflow-hidden selection:bg-lux-gold selection:text-lux-black">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise-overlay opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lux-charcoal/40 via-lux-black to-lux-black" />
      
      {/* Geometric Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      {/* Animated Decoration Lines */}
      <div className="absolute top-0 left-12 h-full w-px bg-lux-white/5 hidden md:block" />
      <div className="absolute top-0 right-12 h-full w-px bg-lux-white/5 hidden md:block" />
      <div className="absolute top-12 left-0 w-full h-px bg-lux-white/5 hidden md:block" />
      <div className="absolute bottom-12 left-0 w-full h-px bg-lux-white/5 hidden md:block" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[440px] relative z-10 px-6"
      >
        {/* Main Card */}
        <div className="bg-[#050505]/80 backdrop-blur-xl border border-lux-white/10 relative overflow-hidden shadow-2xl">
           
           {/* Scanning Light Effect */}
           <motion.div 
             className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-lux-gold to-transparent opacity-50 z-20"
             animate={{ top: ['0%', '100%'] }}
             transition={{ duration: 4, ease: "linear", repeat: Infinity }}
           />

           {/* Corner Decorations */}
           <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-lux-gold/60" />
           <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-lux-gold/60" />
           <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-lux-gold/60" />
           <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-lux-gold/60" />

           {/* Header Section */}
           <div className="p-10 pb-0 text-center relative">
             <div className="inline-flex items-center justify-center w-14 h-14 mb-8 relative">
                <div className="absolute inset-0 border border-lux-white/10 rotate-45" />
                <div className="absolute inset-2 border border-lux-white/20" />
                {mode === 'LOGIN' ? <ScanFace className="text-lux-gold relative z-10" size={20} strokeWidth={1} /> : <Fingerprint className="text-lux-gold relative z-10" size={20} strokeWidth={1} />}
             </div>
             
             <h2 className="text-4xl font-serif font-light text-lux-white mb-2 tracking-tight">
               {mode === 'LOGIN' ? "System Access" : "Protocol Initiate"}
             </h2>
             
             {isMock && (
                <div className="mb-6 p-2 bg-lux-gold/10 border border-lux-gold/20 text-center mx-auto max-w-[280px]">
                    <p className="font-mono text-[9px] text-lux-gold uppercase tracking-widest">
                        DEMO MODE ACTIVE: USE ANY CREDENTIALS
                    </p>
                </div>
             )}

             <div className="flex items-center justify-center gap-2 opacity-50 mb-8">
               <div className="w-1 h-1 bg-lux-gold rounded-full" />
               <p className="font-mono text-[9px] uppercase tracking-[0.25em]">
                 {mode === 'LOGIN' ? "Authorized Personnel Only" : "New Identity Creation"}
               </p>
               <div className="w-1 h-1 bg-lux-gold rounded-full" />
             </div>
           </div>

           {/* Form Section */}
           <form onSubmit={handleSubmit} className="p-10 pt-4 space-y-6">
             {error && (
                <div className="flex items-center gap-2 bg-red-900/10 border border-red-500/20 p-4 text-red-200 text-xs font-mono">
                   <AlertCircle size={14} className="shrink-0" />
                   <span>{error}</span>
                </div>
             )}

             <div className="space-y-6">
                {mode === 'SIGNUP' && (
                  <div className="group">
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-lux-gold/60 mb-2 group-focus-within:text-lux-gold transition-colors">
                      Identity // Full Name
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-lux-white/10 px-4 py-3 text-sm font-mono text-lux-white focus:outline-none focus:border-lux-gold/50 focus:bg-white/10 transition-all placeholder:text-transparent"
                      placeholder="FULL NAME"
                      required
                    />
                  </div>
                )}

                <div className="group">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-lux-gold/60 mb-2 group-focus-within:text-lux-gold transition-colors">
                    Identification // Email
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-lux-white/10 px-4 py-3 text-sm font-mono text-lux-white focus:outline-none focus:border-lux-gold/50 focus:bg-white/10 transition-all placeholder:text-transparent"
                    placeholder="ENTER ID"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-lux-gold/60 mb-2 group-focus-within:text-lux-gold transition-colors">
                    Security Key // Password
                  </label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-lux-white/10 px-4 py-3 text-sm font-mono text-lux-white focus:outline-none focus:border-lux-gold/50 focus:bg-white/10 transition-all placeholder:text-transparent"
                    placeholder="ENTER KEY"
                    required
                  />
                </div>
             </div>

             <button 
                type="submit"
                disabled={isLoading}
                className="w-full group relative h-12 overflow-hidden bg-lux-white hover:bg-lux-gold transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                   {isLoading ? (
                     <div className="flex items-center gap-2">
                        <span className="w-1 h-3 bg-lux-black animate-pulse" />
                        <span className="w-1 h-3 bg-lux-black animate-pulse delay-75" />
                        <span className="w-1 h-3 bg-lux-black animate-pulse delay-150" />
                     </div>
                   ) : (
                     <span className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-[0.25em] text-lux-black group-hover:pr-2 transition-all">
                       {mode === 'LOGIN' ? "Authenticate" : "Initialize"} <ArrowRight size={12} />
                     </span>
                   )}
                </div>
             </button>
           </form>

           {/* Footer Section */}
           <div className="bg-lux-white/5 p-4 border-t border-lux-white/10 flex justify-between items-center">
              <button 
                onClick={() => {
                   setError(null);
                   setView(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
                }}
                className="text-[9px] font-mono uppercase tracking-widest text-lux-white/50 hover:text-lux-white transition-colors"
              >
                {mode === 'LOGIN' ? "[ Register New ID ]" : "[ Existing User ]"}
              </button>
              
              <div className="flex items-center gap-2 text-lux-gold/40">
                <ShieldCheck size={10} />
                <span className="text-[9px] font-mono uppercase tracking-widest">TLS 1.3 // SECURE</span>
              </div>
           </div>
        </div>
        
        {/* Bottom ID */}
        <div className="absolute -bottom-8 left-0 w-full text-center">
             <p className="font-mono text-[8px] text-lux-white/20 tracking-[0.4em]">SYS.ID: 884-29-X</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;