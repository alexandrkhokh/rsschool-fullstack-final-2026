import type {Product} from "../types/product.ts";

const API = import.meta.env.VITE_API_URL ?? '/wp-json';

export interface ProductsResult {
  products: Product[];
  total: number;
  totalPages: number;
}

export async function getProducts(page = 1, perPage = 12): Promise<ProductsResult> {
  const query = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    _embed: "wp:featuredmedia",
  })

  const res = await fetch( `${API}/wp/v2/product?${query}` );

  if (!res.ok) {
    throw new Error(`Store API error ${res.status}`);
  }
  
  return {
    products: await res.json(),
    total: Number(res.headers.get("X-WP-Total") ?? 0),
    totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 0),
  };
}


