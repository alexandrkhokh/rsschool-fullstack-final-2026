const API = import.meta.env.VITE_API_URL ?? '/wp-json';

export async function getProducts(page = 1, perPage = 12): Promise<void> {
  const res = await fetch(
    `${API}/wp/v2/product?page=${page}&per_page=${perPage}&_embed=wp:featuredmedia`,
  );

  if (!res.ok) {
    throw new Error(`Store API error ${res.status}`);
  }

  const result = await res.json();
  console.log(JSON.stringify(result));

  console.log({
    products: result,
    total: Number(res.headers.get('X-WP-Total')),
    totalPages: Number(res.headers.get('X-WP-TotalPages')),
  });
}
