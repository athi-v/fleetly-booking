import { create } from 'zustand';
import type { Equipment } from '../data/equipment';

export interface CartItem {
  equipment: Equipment;
  qty: number;   // units hired (1 – equipment.stock)
  days: number;  // hire duration in days
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  checkoutOpen: boolean;
  addItem: (equipment: Equipment) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  updateDays: (id: string, days: number) => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  clearCart: () => void;
  totalItems: () => number;
  totalCost: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  checkoutOpen: false,

  addItem: (equipment) => {
    if (equipment.stock === 0) return;
    const exists = get().items.find((i) => i.equipment.id === equipment.id);
    if (exists) return;
    set((s) => ({ items: [...s.items, { equipment, qty: 1, days: 1 }] }));
  },

  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.equipment.id !== id) })),

  updateQty: (id, qty) =>
    set((s) => ({
      items: s.items.map((i) =>
        i.equipment.id === id
          ? { ...i, qty: Math.min(Math.max(1, qty), i.equipment.stock) }
          : i
      ),
    })),

  updateDays: (id, days) =>
    set((s) => ({
      items: s.items.map((i) =>
        i.equipment.id === id ? { ...i, days: Math.max(1, days) } : i
      ),
    })),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  openCheckout: () => set({ checkoutOpen: true, isOpen: false }),
  closeCheckout: () => set({ checkoutOpen: false }),
  clearCart: () => set({ items: [], checkoutOpen: false }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),

  totalCost: () =>
    get().items.reduce((sum, i) => sum + i.equipment.dailyRate * i.qty * i.days, 0),
}));
