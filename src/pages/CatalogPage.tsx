import {getProducts} from "../api/getProducts.ts";

const API = import.meta.env.VITE_API_URL ?? "/wp-json";

import { type JSX, useEffect, useState } from "react";
import { type Product } from '../types/product';
import ArchiveProductCard from "../components/ArchiveProductCard.tsx";

const PER_PAGE = 12;

export const CatalogPage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [totalPages, setTotalPages] = useState(0);
  const [page] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts(page, PER_PAGE)
      .then(({products}) => {
        setProducts(products);
        // setTotalPages(totalPages);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [page]);

  if (error) return <p>Не удалось загрузить каталог: {error}</p>;

  return (
    <div>
      <h1>Каталог товаров</h1>
      {products.map(p => <ArchiveProductCard key={p.id} product={p} />)}
    </div>
  );
};
