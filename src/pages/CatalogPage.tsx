const API = import.meta.env.VITE_API_URL ?? "/wp-json";

import { type JSX, useEffect, useState  } from "react";
import {type Product} from '../types/product';
import ArchiveProductCard from "../components/ArchiveProductCard.tsx";

export const CatalogPage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page] = useState(1);
  const [perPage] = useState(12)

  useEffect(() => {
    fetch(`${API}/wp/v2/product?page=${page}&per_page=${perPage}&_embed=wp:featuredmedia`)
        .then(res => {
          if (!res.ok) throw new Error(`REST API error ${res.status}`);
          return res.json();
        })
        .then(data => setProducts(data))
        .catch(console.error);
  }, [page, perPage]);

  console.log(products)

  return (
    <div>
      <h1>Каталог товаров</h1>
      {products.map(p => <ArchiveProductCard key={p.id} product={p} />)}
    </div>
  );
};
