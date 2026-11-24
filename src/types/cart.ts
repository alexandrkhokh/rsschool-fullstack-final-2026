import type { Product } from './product';

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  currency: string;
  image?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  incrementQuantity: (id: CartItem['id']) => void;
  decrementQuantity: (id: CartItem['id']) => void;
  removeItem: (id: CartItem['id']) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
