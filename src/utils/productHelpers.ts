import type { Product } from '../types/product';

export interface ProductPricing {
  currentPrice: number;
  regularPrice: number;
  hasDiscount: boolean;
  currency: string;
}

export const getProductImage = (product: Product, fallback: string): string => {
  const media = product._embedded?.['wp:featuredmedia']?.[0];
  const sizes = media?.media_details.sizes;

  return (
    sizes?.woocommerce_single?.source_url ??
    sizes?.large?.source_url ??
    sizes?.medium_large?.source_url ??
    media?.source_url ??
    fallback
  );
};

export const getProductPricing = (product: Product): ProductPricing => {
  const currentPrice = Number(product.price_data.price || product.price_data.regular_price);
  const regularPrice = Number(product.price_data.regular_price);
  const hasDiscount = Boolean(product.price_data.sale_price) && regularPrice > currentPrice;

  return {
    currentPrice,
    regularPrice,
    hasDiscount,
    currency: product.price_data.currency,
  };
};
