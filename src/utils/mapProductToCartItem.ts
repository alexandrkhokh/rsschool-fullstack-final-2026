import type { Product } from '../types/product';
import type { CartItem } from '../types/cart';

export const mapProductToCartItem = (product: Product, quantity = 1): CartItem => {
  void product;
  return {
    id: 0,
    title: '',
    price: 0,
    currency: '',
    image: '',
    quantity,
  };
};
