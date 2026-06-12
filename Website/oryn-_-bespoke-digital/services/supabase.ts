import { createClient } from '@supabase/supabase-js';

const CONFIG_KEY = 'ORYN_SUPABASE_CONFIG';

export interface SupabaseConfig {
  url: string;
  key: string;
}

export const getSupabaseConfig = (): SupabaseConfig | null => {
  const stored = localStorage.getItem(CONFIG_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const saveSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify({ url, key }));
  window.location.reload(); // Reload to initialize with new keys
};

export const clearSupabaseConfig = () => {
    localStorage.removeItem(CONFIG_KEY);
    window.location.reload();
}

export const initSupabase = () => {
  const config = getSupabaseConfig();
  if (!config) return null;
  try {
    return createClient(config.url, config.key);
  } catch (e) {
    console.error("Failed to init Supabase client", e);
    return null;
  }
};

export const supabase = initSupabase();