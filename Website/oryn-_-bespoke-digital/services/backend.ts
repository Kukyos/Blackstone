
import { User, Order, Product, OrderItem } from '../types';
import { supabase, clearSupabaseConfig } from './supabase';

// Mock Data Keys
const MOCK_SESSION_KEY = 'oryn_mock_session';
const MOCK_ORDERS_TABLE_KEY = 'oryn_mock_db_orders';
const MOCK_ITEMS_TABLE_KEY = 'oryn_mock_db_order_items';

class BackendService {
  
  isConfigured(): boolean {
    return !!supabase;
  }

  resetConfig() {
      clearSupabaseConfig();
  }

  // --- AUTHENTICATION ---

  async getSession(): Promise<User | null> {
    if (!supabase) {
        // Mock Session
        try {
            const stored = localStorage.getItem(MOCK_SESSION_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }
    
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) return null;

    return {
      id: session.user.id,
      name: session.user.user_metadata?.name || 'Client',
      email: session.user.email || '',
      role: 'CLIENT', 
      avatar: session.user.user_metadata?.avatar
    };
  }

  async login(email: string, pass: string): Promise<User> {
    if (!supabase) {
        // Mock Login
        const mockUser: User = {
            id: 'mock-user-uuid',
            name: 'Demo User',
            email: email,
            role: 'CLIENT'
        };
        localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(mockUser));
        
        // Init Mock DB if empty
        if (!localStorage.getItem(MOCK_ORDERS_TABLE_KEY)) {
             localStorage.setItem(MOCK_ORDERS_TABLE_KEY, '[]');
             localStorage.setItem(MOCK_ITEMS_TABLE_KEY, '[]');
        }

        return mockUser;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) throw error;
    if (!data.user) throw new Error("No user returned");

    return {
        id: data.user.id,
        name: data.user.user_metadata?.name || 'Client',
        email: data.user.email || '',
        role: 'CLIENT'
    };
  }

  async signup(name: string, email: string, pass: string): Promise<{ user: User, session: any | null }> {
    if (!supabase) {
        const mockUser: User = {
            id: 'mock-user-uuid-' + Date.now(),
            name: name,
            email: email,
            role: 'CLIENT'
        };
        localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(mockUser));
        return { user: mockUser, session: { user: mockUser } };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { name }
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error("Signup failed");

    const user: User = {
        id: data.user.id,
        name: name,
        email: data.user.email || '',
        role: 'CLIENT'
    };

    return { user, session: data.session };
  }

  async logout(): Promise<void> {
    if (!supabase) {
        localStorage.removeItem(MOCK_SESSION_KEY);
        return;
    }
    await supabase.auth.signOut();
  }

  // --- ORDERS (NORMALIZED) ---

  async getOrders(userEmail: string): Promise<Order[]> {
    if (!supabase) {
        // Mock Relational Query
        const rawOrders = JSON.parse(localStorage.getItem(MOCK_ORDERS_TABLE_KEY) || '[]');
        const rawItems = JSON.parse(localStorage.getItem(MOCK_ITEMS_TABLE_KEY) || '[]');
        
        const userOrders = rawOrders.filter((o: any) => o.user_email === userEmail);
        
        // Join Items
        return userOrders.map((o: any) => ({
             id: o.id,
             date: o.created_at,
             status: o.status,
             totalPrice: o.total_cents / 100,
             currency: o.currency,
             items: rawItems.filter((i: any) => i.order_id === o.id).map((i: any) => ({
                 id: i.id,
                 sku: i.sku,
                 title: i.title,
                 unit_price: i.unit_price_cents / 100,
                 quantity: i.quantity
             }))
        })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // Real Supabase Query
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            items:order_items(*)
        `)
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
        return [];
    }

    return data.map((d: any) => ({
        id: d.id,
        date: d.created_at,
        status: d.status,
        totalPrice: d.total_cents / 100,
        currency: d.currency,
        items: d.items.map((i: any) => ({
            id: i.id,
            sku: i.sku,
            title: i.title,
            unit_price: i.unit_price_cents / 100,
            quantity: i.quantity
        }))
    }));
  }

  async createOrder(userEmail: string, items: Product[], total: number): Promise<Order> {
    const totalCents = Math.round(total * 100);
    const orderPayload = {
         user_email: userEmail,
         total_cents: totalCents,
         status: 'pending_review',
         currency: 'INR',
         payload: { original_items: items } // Audit snapshot
    };

    if (!supabase) {
        // Mock Relational Insert
        const orderId = `MOCK-ORD-${Date.now()}`;
        const newOrderRow = {
            id: orderId,
            ...orderPayload,
            created_at: new Date().toISOString()
        };

        const existingOrders = JSON.parse(localStorage.getItem(MOCK_ORDERS_TABLE_KEY) || '[]');
        localStorage.setItem(MOCK_ORDERS_TABLE_KEY, JSON.stringify([...existingOrders, newOrderRow]));

        // Insert Items
        const newItemsRows = items.map((item, idx) => ({
            id: `MOCK-ITEM-${Date.now()}-${idx}`,
            order_id: orderId,
            sku: item.id,
            title: item.name,
            unit_price_cents: Math.round(item.price * 100),
            quantity: 1,
            line_total_cents: Math.round(item.price * 100),
            created_at: new Date().toISOString()
        }));

        const existingItems = JSON.parse(localStorage.getItem(MOCK_ITEMS_TABLE_KEY) || '[]');
        localStorage.setItem(MOCK_ITEMS_TABLE_KEY, JSON.stringify([...existingItems, ...newItemsRows]));

        // Return formatted object
        return {
            id: orderId,
            date: newOrderRow.created_at,
            status: 'pending_review',
            totalPrice: total,
            currency: 'INR',
            items: newItemsRows.map(i => ({
                id: i.id,
                sku: i.sku,
                title: i.title,
                unit_price: i.unit_price_cents / 100,
                quantity: i.quantity
            }))
        };
    }

    // 1. Insert Order
    const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select()
        .single();

    if (orderError) throw new Error("Failed to create order: " + orderError.message);

    // 2. Prepare Order Items
    const itemsPayload = items.map(item => ({
        order_id: orderData.id,
        sku: item.id,
        title: item.name,
        unit_price_cents: Math.round(item.price * 100),
        quantity: 1,
        line_total_cents: Math.round(item.price * 100)
    }));

    // 3. Insert Items
    const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsPayload)
        .select();

    if (itemsError) {
        console.error("Failed to insert items", itemsError);
        // Note: In a real backend, we'd rollback the order here.
    }

    // 4. Log Event
    await supabase.from('order_events').insert({
        order_id: orderData.id,
        event_type: 'created',
        data: { source: 'web_checkout' }
    });

    return {
        id: orderData.id,
        date: orderData.created_at,
        status: orderData.status,
        totalPrice: orderData.total_cents / 100,
        currency: orderData.currency,
        items: itemsData ? itemsData.map((i: any) => ({
            id: i.id,
            sku: i.sku,
            title: i.title,
            unit_price: i.unit_price_cents / 100,
            quantity: i.quantity
        })) : []
    };
  }
}

export const backend = new BackendService();
