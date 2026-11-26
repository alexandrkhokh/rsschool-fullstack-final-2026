import type { CartItem, CartTotals } from '../types/cart';

export const calculateTotals = (items: CartItem[], discountPercent: number): CartTotals => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = Number(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
  const discountAmount = Number(((subtotalPrice * discountPercent) / 100).toFixed(2));
  const totalPrice = Number((subtotalPrice - discountAmount).toFixed(2));

  return {
    totalItems,
    subtotalPrice,
    discountAmount,
    totalPrice,
  };
};
