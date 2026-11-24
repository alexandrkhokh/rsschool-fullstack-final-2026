import { describe, it, expect } from 'vitest';
import type { Product } from '../types/product';
import { mapProductToCartItem } from '../utils/mapProductToCartItem';
import { mockProductFull } from './mockData';

describe('mapProductToCartItem', () => {
  it('1. преобразует Product в CartItem и берет woocommerce_thumbnail', () => {
    const result = mapProductToCartItem(mockProductFull);

    expect(result).toEqual({
      id: 101,
      title: 'Насос циркуляционный Grundfos',
      price: 150.5,
      currency: 'BYN',
      image: 'https://example.com',
      quantity: 1,
    });
  });

  it('2. берет основной source_url, если миниатюра woocommerce_thumbnail отсутствует', () => {
    const productWithoutThumb: Product = {
      ...mockProductFull,
      _embedded: {
        'wp:featuredmedia': [
          {
            id: 1,
            source_url: 'https://example.com',
            media_details: { sizes: {} },
          },
        ],
      },
    };

    const result = mapProductToCartItem(productWithoutThumb, 3);

    expect(result.image).toBe('https://example.com');
    expect(result.quantity).toBe(3);
  });

  it('3. возвращает image: undefined и price: 0, если данные пустые', () => {
    const emptyProduct: Product = {
      ...mockProductFull,
      _embedded: { 'wp:featuredmedia': [] },
      price_data: {
        currency: 'BYN',
        price: '',
        regular_price: '',
      },
    };

    const result = mapProductToCartItem(emptyProduct);

    expect(result.image).toBeUndefined();
    expect(result.price).toBe(0);
  });

  it('4. берет актуальную цену price, а не перечеркнутую regular_price при наличии скидки', () => {
    const saleProduct: Product = {
      ...mockProductFull,
      price_data: {
        currency: 'BYN',
        price: '120.00',
        regular_price: '150.50',
        sale_price: '120.00',
      },
    };

    const result = mapProductToCartItem(saleProduct);

    expect(result.price).toBe(120);
  });

  it('5. защищает от NaN и возвращает 0, если в price_data.price пришла нечисловая строка', () => {
    const invalidPriceProduct: Product = {
      ...mockProductFull,
      price_data: {
        currency: 'BYN',
        price: 'по запросу',
        regular_price: '',
      },
    };

    const result = mapProductToCartItem(invalidPriceProduct);

    expect(result.price).toBe(0);
    expect(Number.isNaN(result.price)).toBe(false);
  });

  it('6. устанавливает минимальное quantity = 1, если передано 0 или отрицательное число', () => {
    const resultZero = mapProductToCartItem(mockProductFull, 0);
    const resultNegative = mapProductToCartItem(mockProductFull, -5);

    expect(resultZero.quantity).toBe(1);
    expect(resultNegative.quantity).toBe(1);
  });
});
