import type { Product } from '../types/product';

export const mockProductFull: Product = {
  id: 101,
  title: { rendered: 'Насос циркуляционный Grundfos' },
  link: 'https://example.com',
  featured_media: 1,
  price_html: '150.50 BYN',
  acf: { pump_power: 45, pump_head: 6, pump_flow: 3 },
  _embedded: {
    'wp:featuredmedia': [
      {
        id: 1,
        source_url: 'https://example.com',
        media_details: {
          sizes: {
            woocommerce_thumbnail: {
              file: 'thumb.jpg',
              width: 300,
              height: 300,
              mime_type: 'image/jpeg',
              source_url: 'https://example.com',
            },
          },
        },
      },
    ],
  },
  price_data: {
    currency: 'BYN',
    price: '150.50',
    regular_price: '150.50',
  },
};
