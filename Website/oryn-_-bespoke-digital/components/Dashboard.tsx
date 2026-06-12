
import React from 'react';
import { User, Order, ViewState } from '../types';
import { Package, Crosshair, Cpu, Activity, Clock, CheckCircle, Truck, AlertTriangle, FileText } from 'lucide-react';

interface DashboardProps {
  user: User;
  orders: Order[];
  setView: (view: ViewState) => void;
}

const getStatusColor = (status: string) => {
    switch(status) {
        case 'paid':
        case 'completed':
        case 'shipped':
        case 'deployed':
            return 'text-green-500 border-green-500/50 bg-green-500/5';
        case 'pending_review':
        case 'awaiting_payment':
        case 'processing':
            return 'text-lux-gold border-lux-gold bg-lux-gold/5';
        case 'cancelled':
        case 'failed':
            return 'text-red-500 border-red-500/50 bg-red-500/5';
        default:
            return 'text-lux-white/50 border-lux-white/10 bg-lux-white/5';
    }
};

const getStatusIcon = (status: string) => {
    switch(status) {
        case 'completed': return <CheckCircle size={10} />;
        case 'shipped': return <Truck size={10} />;
        case 'processing': return <Activity size={10} />;
        case 'pending_review': return <Clock size={10} />;
        case 'failed': return <AlertTriangle size={10} />;
        default: return <FileText size={10} />;
    }
};

const Dashboard: React.FC<DashboardProps> = ({ user, orders, setView }) => {
  return (
    <div className="min-h-screen pt-24 md:pt-32 px-4 md:px-6 max-w-6xl mx-auto relative pb-20">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
        />

        <header className="mb-8 md:mb-16 border-b border-lux-white/10 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end relative gap-6">
            <div className="absolute -bottom-[5px] left-0 w-2 h-2 bg-lux-gold" />
            <div className="absolute -bottom-[5px] right-0 w-2 h-2 bg-lux-gold" />

            <div>
              <div className="flex items-center gap-3 mb-4 opacity-50">
                 <Cpu size={14} className="text-lux-gold" />
                 <span className="font-mono text-[10px] uppercase tracking-widest">System Interface</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl mb-2 font-light tracking-tight">Oryn Lounge</h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">Client ID: {user.name}</p>
            </div>
            <div className="text-left md:text-right w-full md:w-auto">
              <div className="flex items-center md:justify-end gap-2 mb-1">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <p className="font-mono text-[9px] uppercase tracking-widest opacity-40">Network Status</p>
              </div>
              <p className="text-lux-gold font-serif italic text-lg">Online</p>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Sidebar / Stats */}
          <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
             <div className="p-6 border border-lux-white/10 bg-lux-white/5 relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-20"><Crosshair size={16} /></div>
                <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-2">Total Invested</p>
                <p className="font-serif text-3xl text-lux-white">₹{orders.reduce((acc, o) => acc + o.totalPrice, 0).toLocaleString()}</p>
             </div>
             
             <div className="p-6 border border-lux-white/10 bg-lux-white/5 relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-20"><Activity size={16} /></div>
                <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-2">Active Projects</p>
                <p className="font-serif text-3xl text-lux-white">{orders.filter(o => !['completed', 'cancelled', 'failed'].includes(o.status)).length}</p>
             </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 opacity-60 border-b border-lux-white/10 pb-2 inline-block">Active Commissions</h3>
            
            {orders.length === 0 ? (
                <div className="p-12 md:p-16 text-center border border-dashed border-lux-border/50 bg-lux-charcoal/5 relative">
                <Package className="mx-auto text-lux-gold mb-6 opacity-50" size={32} strokeWidth={1} />
                <p className="font-serif italic text-2xl mb-4 opacity-70">No active commissions.</p>
                <button onClick={() => setView('STORE')} className="text-lux-gold underline text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">
                    Initiate Project
                </button>
                </div>
            ) : (
                <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="p-6 md:p-8 border border-lux-white/10 relative group bg-lux-black hover:border-lux-gold/50 transition-colors">
                    
                    {/* Decorative Corner Lines */}
                    <div className="absolute top-0 left-0 w-8 h-[1px] bg-lux-gold/50 transition-all group-hover:w-full" />
                    <div className="absolute top-0 left-0 w-[1px] h-8 bg-lux-gold/50 transition-all group-hover:h-full" />
                    
                    <div className="flex flex-col gap-6 relative z-10">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
                              <span className="font-mono text-[10px] opacity-40 tracking-wider">REF: {order.id.slice(0, 8)}...</span>
                              <span className={`px-3 py-1 border text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                  {getStatusIcon(order.status)}
                                  {order.status.replace(/_/g, ' ')}
                              </span>
                          </div>
                          <div className="space-y-3 pl-4 border-l border-lux-white/10">
                              {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm font-serif font-light text-lux-white/80">
                                  <div className="flex items-center gap-3">
                                      <span className="w-1.5 h-1.5 bg-lux-gold rounded-sm rotate-45 shrink-0" />
                                      {item.title}
                                  </div>
                                  <span className="text-xs font-mono opacity-40 shrink-0">₹{item.unit_price}</span>
                              </div>
                              ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-lux-white/5 flex justify-between items-end">
                          <div>
                             <p className="font-mono text-[9px] opacity-30">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                             <p className="font-mono text-[9px] uppercase opacity-50 tracking-widest mb-1">Value</p>
                             <p className="font-serif text-2xl md:text-3xl text-lux-white">₹{order.totalPrice.toLocaleString()}</p>
                          </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
