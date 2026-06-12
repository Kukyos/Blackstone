import React, { useState } from 'react';
import { User } from '../types';
import { LogOut, Settings as SettingsIcon, Shield, CreditCard, Bell, User as UserIcon, Lock, Globe, Database, WifiOff, Wifi } from 'lucide-react';
import { backend } from '../services/backend';
import Setup from './Setup';

interface SettingsProps {
  user: User | null;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onLogout }) => {
  const [showSetup, setShowSetup] = useState(false);
  const isConfigured = backend.isConfigured();

  if (showSetup) {
      return (
          <div className="fixed inset-0 z-[200] bg-lux-black/90 backdrop-blur-md overflow-y-auto">
              <Setup onClose={() => setShowSetup(false)} />
          </div>
      )
  }

  return (
    <div className="min-h-screen pt-32 px-6 bg-lux-black text-lux-white relative overflow-hidden selection:bg-lux-gold selection:text-lux-black">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise-overlay opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-lux-charcoal/30 via-lux-black to-lux-black" />
      
      {/* Technical Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-16 border-b border-lux-white/10 pb-8 flex justify-between items-end">
           <div>
             <div className="flex items-center gap-3 mb-4 opacity-50">
                 <SettingsIcon size={14} className="text-lux-gold" />
                 <span className="font-mono text-[10px] uppercase tracking-widest">System Preferences</span>
             </div>
             <h2 className="font-serif text-5xl font-light tracking-tight">User <span className="text-lux-gold italic">Configuration</span></h2>
           </div>
           <div className="hidden md:block text-right">
              <p className="font-mono text-[9px] uppercase tracking-widest opacity-40">Session ID</p>
              <p className="font-mono text-xs text-lux-gold">#{Math.floor(Math.random() * 999999)}</p>
           </div>
        </header>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
             
             {/* Left Column: Digital Identity Card */}
             <div className="md:col-span-4">
                <div className="border border-lux-white/10 bg-lux-white/5 relative overflow-hidden group">
                   {/* Card Decor */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-lux-gold/50" />
                   <div className="absolute top-4 right-4 text-lux-white/20"><UserIcon size={24} strokeWidth={1} /></div>
                   
                   <div className="p-8 text-center pt-12">
                     <div className="w-28 h-28 mx-auto bg-lux-charcoal border border-lux-white/10 rounded-full flex items-center justify-center mb-6 relative">
                        <span className="font-serif text-5xl text-lux-gold">{user.name.charAt(0)}</span>
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-lux-black" />
                     </div>
                     
                     <h3 className="font-serif text-2xl mb-2">{user.name}</h3>
                     <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-8">{user.email}</p>
                     
                     <div className="flex items-center justify-center gap-4 py-4 border-t border-b border-lux-white/10">
                        <div className="text-center">
                           <p className="font-mono text-[9px] uppercase opacity-40 mb-1">Plan</p>
                           <p className="font-serif text-lux-gold">Bespoke</p>
                        </div>
                        <div className="w-px h-8 bg-lux-white/10" />
                        <div className="text-center">
                           <p className="font-mono text-[9px] uppercase opacity-40 mb-1">Role</p>
                           <p className="font-serif text-lux-white">{user.role}</p>
                        </div>
                     </div>
                   </div>
                   
                   <div className="p-4 bg-lux-black/50 text-center">
                      <p className="font-mono text-[8px] text-lux-white/30 tracking-[0.3em]">ID: 8849-22-ALPHA</p>
                   </div>
                </div>
             </div>

             {/* Right Column: Settings Matrix */}
             <div className="md:col-span-8 space-y-px bg-lux-white/10 border border-lux-white/10">
                
                {/* Connection Status (NEW) */}
                <div className="p-8 bg-lux-black hover:bg-lux-white/5 transition-colors group flex items-center justify-between">
                   <div className="flex items-start gap-6">
                      <div className={`p-3 border border-lux-white/10 ${isConfigured ? 'bg-green-900/10 text-green-500' : 'bg-orange-900/10 text-orange-500'}`}>
                         {isConfigured ? <Wifi size={20} strokeWidth={1} /> : <WifiOff size={20} strokeWidth={1} />}
                      </div>
                      <div>
                        <h4 className="font-serif text-xl mb-1 group-hover:text-lux-gold transition-colors">Backend Connection</h4>
                        <p className="font-mono text-[10px] text-lux-white/50 max-w-sm leading-relaxed">
                           {isConfigured 
                             ? "System Connected. Data persistence active." 
                             : "Demo Mode Active. Data is local to this browser session."}
                        </p>
                      </div>
                   </div>
                   
                   <button 
                     onClick={() => setShowSetup(true)}
                     className={`px-4 py-2 border font-mono text-[9px] uppercase tracking-widest transition-colors ${isConfigured ? 'border-lux-white/10 text-lux-white/50 hover:text-white' : 'bg-orange-500 text-black border-orange-500 hover:bg-white hover:border-white'}`}
                   >
                     {isConfigured ? "Reconfigure" : "Connect Database"}
                   </button>
                </div>

                {/* Setting Item */}
                <div className="p-8 bg-lux-black hover:bg-lux-white/5 transition-colors cursor-pointer group flex items-center justify-between">
                   <div className="flex items-start gap-6">
                      <div className="p-3 bg-lux-white/5 border border-lux-white/10 text-lux-gold">
                         <Shield size={20} strokeWidth={1} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl mb-1 group-hover:text-lux-gold transition-colors">Security Protocol</h4>
                        <p className="font-mono text-[10px] text-lux-white/50 max-w-sm leading-relaxed">
                           Manage 2FA, password rotation, and active session termination.
                        </p>
                      </div>
                   </div>
                   <button className="px-4 py-2 border border-lux-white/20 font-mono text-[9px] uppercase tracking-widest hover:bg-lux-white hover:text-lux-black transition-colors">
                     Configure
                   </button>
                </div>

                {/* Setting Item */}
                <div className="p-8 bg-lux-black hover:bg-lux-white/5 transition-colors cursor-pointer group flex items-center justify-between">
                   <div className="flex items-start gap-6">
                      <div className="p-3 bg-lux-white/5 border border-lux-white/10 text-lux-gold">
                         <CreditCard size={20} strokeWidth={1} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl mb-1 group-hover:text-lux-gold transition-colors">Financial Assets</h4>
                        <p className="font-mono text-[10px] text-lux-white/50 max-w-sm leading-relaxed">
                           View invoices, transaction history, and payment gateways.
                        </p>
                      </div>
                   </div>
                   <button className="px-4 py-2 border border-lux-white/20 font-mono text-[9px] uppercase tracking-widest hover:bg-lux-white hover:text-lux-black transition-colors">
                     Access
                   </button>
                </div>

                {/* Setting Item */}
                <div className="p-8 bg-lux-black hover:bg-lux-white/5 transition-colors cursor-pointer group flex items-center justify-between">
                   <div className="flex items-start gap-6">
                      <div className="p-3 bg-lux-white/5 border border-lux-white/10 text-lux-gold">
                         <Globe size={20} strokeWidth={1} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl mb-1 group-hover:text-lux-gold transition-colors">Domain Configuration</h4>
                        <p className="font-mono text-[10px] text-lux-white/50 max-w-sm leading-relaxed">
                           DNS settings, SSL certificates, and deployment zones.
                        </p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-mono text-[9px] opacity-50">ACTIVE</span>
                   </div>
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-lux-black flex justify-end">
                   <button 
                     onClick={onLogout} 
                     className="flex items-center gap-2 text-red-400 hover:text-red-500 font-mono text-[10px] uppercase tracking-widest transition-colors opacity-70 hover:opacity-100"
                   >
                     <Lock size={12} /> Terminate Session
                   </button>
                </div>

             </div>
          </div>
        ) : (
           <div className="h-64 flex items-center justify-center border border-dashed border-lux-white/10 bg-lux-white/5">
              <p className="font-mono text-xs opacity-50 tracking-widest">NO ACTIVE SESSION DETECTED</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Settings;