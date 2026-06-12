
import React, { useState } from 'react';
import { saveSupabaseConfig } from '../services/supabase';
import { Database, Key, Globe, Check, Copy, Terminal, X, AlertTriangle } from 'lucide-react';

const SETUP_SQL = `
-- ⚠️ WARNING: THIS WILL RESET YOUR ORDER TABLES TO INSTALL THE NEW SCHEMA
-- USE WITH CAUTION IF YOU HAVE IMPORTANT PRODUCTION DATA

-- 0. Cleanup Old Schema
DROP TABLE IF EXISTS public.order_events CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TYPE IF EXISTS public.order_status CASCADE;

-- 1. Create Order Status Enum
create type public.order_status as enum (
  'draft',
  'pending_review',
  'awaiting_payment',
  'paid',
  'processing',
  'partially_shipped',
  'shipped',
  'deployed',
  'completed',
  'cancelled',
  'refunded',
  'failed'
);

-- 2. Create Orders Table
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  user_id uuid, -- Optional link to auth.users if needed
  total_cents integer not null,
  currency text not null default 'INR',
  status order_status not null default 'pending_review',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  metadata jsonb,
  payload jsonb -- Full snapshot of original request
);

-- 3. Create Order Items Table (Normalized)
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  sku text not null,
  title text not null,
  unit_price_cents integer not null,
  quantity integer not null default 1,
  line_total_cents integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Order Events Table (Audit Log)
create table public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  actor text default 'system',
  event_type text not null,
  data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable Row Level Security (RLS)
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_events enable row level security;

-- 6. Create RLS Policies
-- Users can view their own orders
create policy "Users can view own orders" 
on orders for select 
using (auth.jwt() ->> 'email' = user_email);

create policy "Users can view own order items" 
on order_items for select 
using (
  exists (
    select 1 from orders 
    where orders.id = order_items.order_id 
    and orders.user_email = (auth.jwt() ->> 'email')
  )
);

create policy "Users can view own order events" 
on order_events for select 
using (
  exists (
    select 1 from orders 
    where orders.id = order_events.order_id 
    and orders.user_email = (auth.jwt() ->> 'email')
  )
);

-- Users can insert orders
create policy "Users can insert own orders" 
on orders for insert 
with check (auth.jwt() ->> 'email' = user_email);

create policy "Users can insert own order items" 
on order_items for insert 
with check (
  exists (
    select 1 from orders 
    where orders.id = order_items.order_id 
    and orders.user_email = (auth.jwt() ->> 'email')
  )
);

create policy "Users can insert own order events" 
on order_events for insert 
with check (
  exists (
    select 1 from orders 
    where orders.id = order_events.order_id 
    and orders.user_email = (auth.jwt() ->> 'email')
  )
);

-- 7. Triggers for updated_at
create or replace function public.handle_updated_at() 
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_order_updated
  before update on public.orders
  for each row execute procedure public.handle_updated_at();
`;

interface SetupProps {
    onClose?: () => void;
}

const Setup: React.FC<SetupProps> = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [activeTab, setActiveTab] = useState<'CONFIG' | 'SQL'>('CONFIG');
  const [copied, setCopied] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && key) {
      saveSupabaseConfig(url, key);
    }
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(SETUP_SQL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] text-lux-white flex items-center justify-center p-0 md:p-6 font-sans overflow-y-auto">
      <div className="w-full md:max-w-4xl min-h-screen md:min-h-0 md:h-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-0 md:border border-lux-white/10 bg-[#0a0a0a] shadow-2xl relative">
        
        {onClose && (
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-50 text-lux-white/30 hover:text-lux-gold transition-colors"
            >
                <X size={24} />
            </button>
        )}

        {/* Left Side: Info */}
        <div className="p-8 md:p-12 relative overflow-hidden bg-lux-black pt-20 md:pt-12">
           <div className="absolute inset-0 bg-noise-overlay opacity-20" />
           <div className="relative z-10">
               <h1 className="text-3xl md:text-4xl font-serif mb-6 text-lux-gold">System <br/> Initialization</h1>
               <p className="font-mono text-xs opacity-60 leading-relaxed mb-8">
                   This application requires a Supabase backend to function. 
                   Supabase provides a free, production-grade Postgres database and authentication suite.
               </p>

               <div className="space-y-6">
                   <div className="flex gap-4">
                       <div className="w-8 h-8 rounded-full bg-lux-white/5 flex items-center justify-center border border-lux-white/10 shrink-0">
                           <span className="font-mono text-xs">01</span>
                       </div>
                       <div>
                           <h3 className="font-bold text-sm mb-1">Create Project</h3>
                           <p className="text-xs opacity-50">Go to <a href="https://supabase.com" target="_blank" className="text-lux-gold underline">supabase.com</a> and create a free project.</p>
                       </div>
                   </div>
                   <div className="flex gap-4">
                       <div className="w-8 h-8 rounded-full bg-lux-white/5 flex items-center justify-center border border-lux-white/10 shrink-0">
                           <span className="font-mono text-xs">02</span>
                       </div>
                       <div>
                           <h3 className="font-bold text-sm mb-1">Get Credentials</h3>
                           <p className="text-xs opacity-50">Find your Project URL and Anon Key in Project Settings &gt; API.</p>
                       </div>
                   </div>
                   <div className="flex gap-4">
                       <div className="w-8 h-8 rounded-full bg-lux-white/5 flex items-center justify-center border border-lux-white/10 shrink-0">
                           <span className="font-mono text-xs">03</span>
                       </div>
                       <div>
                           <h3 className="font-bold text-sm mb-1">Run SQL</h3>
                           <p className="text-xs opacity-50">Copy the schema provided in the SQL tab to your project's SQL Editor.</p>
                       </div>
                   </div>
               </div>
           </div>
        </div>

        {/* Right Side: Input */}
        <div className="p-8 md:p-12 bg-[#0C0C0C] relative">
            
            <div className="flex gap-6 mb-8 border-b border-lux-white/10">
                <button 
                  onClick={() => setActiveTab('CONFIG')}
                  className={`pb-4 font-mono text-[10px] uppercase tracking-widest transition-colors ${activeTab === 'CONFIG' ? 'text-lux-gold border-b border-lux-gold' : 'opacity-40'}`}
                >
                    Connection
                </button>
                <button 
                  onClick={() => setActiveTab('SQL')}
                  className={`pb-4 font-mono text-[10px] uppercase tracking-widest transition-colors ${activeTab === 'SQL' ? 'text-lux-gold border-b border-lux-gold' : 'opacity-40'}`}
                >
                    Database Schema
                </button>
            </div>

            {activeTab === 'CONFIG' ? (
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest opacity-50 mb-2">Project URL</label>
                        <div className="relative group">
                            <Globe className="absolute top-3 left-3 opacity-30 group-focus-within:opacity-100 group-focus-within:text-lux-gold transition-all" size={16} />
                            <input 
                                type="text" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://xyz.supabase.co"
                                className="w-full bg-lux-black border border-lux-white/10 p-3 pl-10 text-sm focus:border-lux-gold focus:outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest opacity-50 mb-2">API Key (Anon/Public)</label>
                        <div className="relative group">
                            <Key className="absolute top-3 left-3 opacity-30 group-focus-within:opacity-100 group-focus-within:text-lux-gold transition-all" size={16} />
                            <input 
                                type="password" 
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="eyJhbGciOiJIUzI1NiIsInR5..."
                                className="w-full bg-lux-black border border-lux-white/10 p-3 pl-10 text-sm focus:border-lux-gold focus:outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-lux-gold text-lux-black font-bold uppercase tracking-[0.2em] text-[10px] py-4 hover:bg-white transition-colors mt-8">
                        Connect System
                    </button>
                </form>
            ) : (
                <div className="relative h-[400px] md:h-full flex flex-col">
                    <div className="absolute top-0 right-0 z-10">
                        <button 
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 bg-lux-white/10 px-3 py-1.5 hover:bg-lux-white/20 transition-colors"
                        >
                            {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                            <span className="font-mono text-[9px] uppercase tracking-widest">{copied ? 'COPIED' : 'COPY'}</span>
                        </button>
                    </div>
                    
                    <div className="bg-orange-900/20 border border-orange-500/30 p-3 mb-3 flex items-start gap-2">
                        <AlertTriangle className="text-orange-500 shrink-0" size={14} />
                        <p className="font-mono text-[9px] text-orange-200">
                           Warning: This script includes DROP TABLE commands.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-lux-black p-4 border border-lux-white/5 font-mono text-[10px] text-lux-white/70 leading-relaxed custom-scrollbar">
                        <pre className="whitespace-pre-wrap">{SETUP_SQL}</pre>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-lux-white/30 shrink-0">
                        <Terminal size={12} />
                        <span className="font-mono text-[9px]">Run this in the SQL Editor to upgrade schema.</span>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Setup;
