import type { Product } from './product';

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  currency: string;
  image?: string;
  quantity: number;
}

export interface PromoCodeResult {
  success: boolean;
  message: string;
}

export interface CartTotals {
  totalItems: number;
  subtotalPrice: number;
  discountAmount: number;
  totalPrice: number;
}

export interface CartState extends CartTotals {
  items: CartItem[];
  promoCode: string | null;
  discountPercent: number;
  addItem: (product: Product) => void;
  incrementQuantity: (id: CartItem['id']) => void;
  decrementQuantity: (id: CartItem['id']) => void;
  removeItem: (id: CartItem['id']) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => PromoCodeResult;
  removePromoCode: () => void;
}

export interface CartSummaryProps {
  totalItems: number;
  subtotalPrice: number;
  discountAmount: number;
  discountPercent: number;
  appliedPromoCode: string | null;
  totalPrice: number;
  currency?: string;
  onApplyPromoCode: (code: string) => PromoCodeResult;
  onRemovePromoCode: () => void;
  onClearCart?: () => void;
}
