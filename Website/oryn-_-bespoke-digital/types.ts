
export type ViewState = 'HOME' | 'LOGIN' | 'SIGNUP' | 'STORE' | 'DASHBOARD' | 'SETTINGS';

export type OrderStatus = 
  | 'draft'
  | 'pending_review'
  | 'awaiting_payment'
  | 'paid'
  | 'processing'
  | 'partially_shipped'
  | 'shipped'
  | 'deployed'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed';

export type SiteMode = 'LUXURY' | 'MINIMAL' | 'BRUTAL' | 'CUSTOM';

export type ModuleCategory = 
  | 'PAGES' 
  | 'DESIGN' 
  | 'RESUME' 
  | 'FUNCTIONAL' 
  | 'PERFORMANCE' 
  | 'HOSTING';

export interface Product {
  id: string;
  name: string;
  type: 'TEMPLATE' | 'MODULE';
  category?: ModuleCategory;
  price: number;
  description: string;
  image?: string;
  features?: string[];
  modeTrigger?: SiteMode;
  maxQuantity?: number;
  requires?: string[]; // IDs of required modules to unlock this
  comingSoon?: boolean;
}

export interface OrderItem {
  id: string; // UUID in DB
  sku: string; // Product ID
  title: string;
  unit_price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  currency: string;
}

export interface User {
  id?: string; // Added ID for relational linking
  name: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
  avatar?: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
