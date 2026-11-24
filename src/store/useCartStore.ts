import { create } from 'zustand';
import type { CartState } from '../types/cart';

export const useCartStore = create<CartState>()(() => ({
  items: [],
  addItem: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
}));
