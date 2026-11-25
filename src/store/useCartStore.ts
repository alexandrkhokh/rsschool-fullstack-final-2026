import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState } from '../types/cart';
import { mapProductToCartItem } from '../utils/mapProductToCartItem';
import { PROMO_CODES } from './promoCodes';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discountPercent: 0,

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }

          return {
            items: [...state.items, mapProductToCartItem(product, 1)],
          };
        }),

      incrementQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
          ),
        })),

      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          if (updatedItems.length === 0) {
            return { items: [], promoCode: null, discountPercent: 0 };
          }
          return { items: updatedItems };
        }),

      clearCart: () => set({ items: [], promoCode: null, discountPercent: 0 }),

      applyPromoCode: (rawCode) => {
        const normalizedCode = rawCode.trim().toUpperCase();

        if (!normalizedCode) {
          return { success: false, message: 'Введите промокод' };
        }

        if (get().promoCode === normalizedCode) {
          return {
            success: false,
            message: `Промокод ${normalizedCode} уже применён`,
          };
        }

        const discount = PROMO_CODES[normalizedCode];

        if (!discount) {
          return { success: false, message: 'Неверный или недействительный промокод' };
        }

        set({ promoCode: normalizedCode, discountPercent: discount });

        return {
          success: true,
          message: `Промокод ${normalizedCode} применён (−${discount}%)`,
        };
      },

      removePromoCode: () => set({ promoCode: null, discountPercent: 0 }),

      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),

      getDiscountAmount: () => {
        const subtotal = get().getSubtotalPrice();
        const discount = get().discountPercent;
        return Number(((subtotal * discount) / 100).toFixed(2));
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotalPrice();
        const discountAmount = get().getDiscountAmount();
        return Number((subtotal - discountAmount).toFixed(2));
      },
    }),
    {
      name: 'shopping-cart-storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discountPercent: state.discountPercent,
      }),
    }
  )
);
