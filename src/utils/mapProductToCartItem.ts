import type { Product } from '../types/product';
import type { CartItem } from '../types/cart';

export const mapProductToCartItem = (product: Product, quantity = 1): CartItem => {
  const featuredMedia = product._embedded?.['wp:featuredmedia']?.[0];
  const image =
    featuredMedia?.media_details?.sizes?.woocommerce_thumbnail?.source_url ||
    featuredMedia?.source_url ||
    undefined;

  const parsedPrice = Number(product.price_data?.price);
  const price = Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : 0;

  return {
    id: product.id,
    title: product.title?.rendered ?? '',
    price,
    currency: product.price_data?.currency ?? 'BYN',
    image,
    quantity: Math.max(1, quantity),
  };
};
