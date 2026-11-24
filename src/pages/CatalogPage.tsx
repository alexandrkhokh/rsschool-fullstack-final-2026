import {getProducts} from "../api/getProducts.ts";

import { type JSX, useEffect, useState } from "react";
import { type Product } from '../types/product';
import ArchiveProductCard from "../components/ArchiveProductCard.tsx";
import Pagination from "../components/Pagination.tsx";

const PER_PAGE = 12;

export const CatalogPage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts(page, PER_PAGE)
      .then(({products}) => {
        setProducts(products);
        setTotalPages(totalPages);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [page]);

  if (error) return <p>Не удалось загрузить каталог: {error}</p>;

  return (
    <main>
      <div className="container">
        <h1>Каталог товаров</h1>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2 mb-3">
            <aside id="sidebar">
              Найдено {products.length} продуктов
            </aside>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10">
            <div className="products__cards-row">
              <div className="row">
                {products.map(p => <ArchiveProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </main>
  );
};
