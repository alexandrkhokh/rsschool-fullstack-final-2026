import { useEffect } from 'react'

// Relative path: in dev Vite proxies it to WordPress, in production the build
// lives on the same origin as WordPress.
const API = import.meta.env.VITE_API_URL ?? '/wp-json';

export async function getProducts(page = 1, perPage = 12) {
  const res = await fetch(
      `${API}/wc/store/v1/products?page=${page}&per_page=${perPage}`
  );
  if (!res.ok) throw new Error(`Store API error ${res.status}`);

  console.dir( {
    products: await res.json(),
    total: Number(res.headers.get('X-WP-Total')),
    totalPages: Number(res.headers.get('X-WP-TotalPages')),
  });
}

function App() {

  useEffect(() => {
    getProducts().catch(console.error)
  }, [])
}

export default App
