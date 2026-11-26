import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState } from '../types/cart';
import { mapProductToCartItem } from '../utils/mapProductToCartItem';
import { INITIAL_TOTALS, PROMO_CODES } from './promoCodes';
import { calculateTotals } from '../utils/calculateTotals';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discountPercent: 0,
      ...INITIAL_TOTALS,

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          const updatedItems = existingItem
            ? state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            : [...state.items, mapProductToCartItem(product, 1)];

          return {
            items: updatedItems,
            ...calculateTotals(updatedItems, state.discountPercent),
          };
        }),

      incrementQuantity: (id) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );

          return {
            items: updatedItems,
            ...calculateTotals(updatedItems, state.discountPercent),
          };
        }),

      decrementQuantity: (id) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
          );

          return {
            items: updatedItems,
            ...calculateTotals(updatedItems, state.discountPercent),
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          if (updatedItems.length === 0) {
            return {
              items: [],
              promoCode: null,
              discountPercent: 0,
              ...INITIAL_TOTALS,
            };
          }

          return {
            items: updatedItems,
            ...calculateTotals(updatedItems, state.discountPercent),
          };
        }),

      clearCart: () =>
        set({
          items: [],
          promoCode: null,
          discountPercent: 0,
          ...INITIAL_TOTALS,
        }),

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

        set((state) => ({
          promoCode: normalizedCode,
          discountPercent: discount,
          ...calculateTotals(state.items, discount),
        }));

        return {
          success: true,
          message: `Промокод ${normalizedCode} применён (−${discount}%)`,
        };
      },

      removePromoCode: () =>
        set((state) => ({
          promoCode: null,
          discountPercent: 0,
          ...calculateTotals(state.items, 0),
        })),
    }),
    {
      name: 'shopping-cart-storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discountPercent: state.discountPercent,
      }),
      // Пересчитываем totals при восстановлении данных из localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          Object.assign(state, calculateTotals(state.items, state.discountPercent));
        }
      },
    }
  )
);
