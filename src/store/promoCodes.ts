import type { Product } from '../types/product';

export const PROMO_CODES: Record<string, number> = {
  SALE10: 10,
  SAVE20: 20,
};

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 101,
    title: { rendered: 'Насос циркуляционный Grundfos UPS 25-60' },
    link: '/catalog/101',
    featured_media: 1,
    price_html: '320.00 BYN',
    acf: { pump_power: 60, pump_head: 6, pump_flow: 3.5 },
    _embedded: { 'wp:featuredmedia': [] },
    price_data: {
      currency: 'BYN',
      price: '320',
      regular_price: '320',
    },
  },
  {
    id: 102,
    title: { rendered: 'Насос скважинный Pedrollo 4SR 2/13' },
    link: '/catalog/102',
    featured_media: 2,
    price_html: '650.00 BYN',
    acf: { pump_power: 750, pump_head: 85, pump_flow: 3.6 },
    _embedded: { 'wp:featuredmedia': [] },
    price_data: {
      currency: 'BYN',
      price: '650',
      regular_price: '700',
      sale_price: '650',
    },
  },
];
