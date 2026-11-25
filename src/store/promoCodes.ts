import type { CartTotals } from '../types/cart';

export const PROMO_CODES: Record<string, number> = {
  SALE10: 10,
  SAVE20: 20,
};

export const INITIAL_TOTALS: CartTotals = {
  totalItems: 0,
  subtotalPrice: 0,
  discountAmount: 0,
  totalPrice: 0,
};
