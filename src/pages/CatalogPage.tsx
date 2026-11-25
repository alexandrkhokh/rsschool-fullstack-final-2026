import {getProducts} from "../api/getProducts.ts";

import { type JSX, useEffect, useState } from "react";
import { type Product } from '../types/product';
import ArchiveProductCard from "../components/ArchiveProductCard.tsx";
import Pagination from "../components/Pagination.tsx";
import {getRanges} from "../api/getRanges.ts";
import InputRange from "../components/ui/Range/InputRange.tsx";
import type {Ranges, Range} from "../types/ranges.ts";

const PER_PAGE = 12;


export const CatalogPage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ranges, setRanges] = useState<Ranges | null>(null)

  useEffect(() => {
    getRanges().then((data) => setRanges(data));
  }, []);

  useEffect(() => {
    getProducts(page, PER_PAGE)
      .then(({products, totalPages}) => {
        setProducts(products);
        setTotalPages(totalPages);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
          setIsLoading(false)
      });
  }, [page]);

  const handleHeadChange = (range: Range) => {
    setRanges(prev => prev && { ...prev, pump_head: range });
  };

  console.log(products)

  const handleSetPage = (newPage: number) => {
    setIsLoading(true);
    setError(null);
    setPage(newPage);
  }

  if (error){
    return <p>Не удалось загрузить каталог: {error}</p>;
  }

  if(isLoading) {
    return <p>Загрузка...</p>
  }

  return (
    <>
      <h1>Каталог товаров</h1>
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2 mb-3">
          <aside id="sidebar">
            {products.length} продуктов на странице
            <InputRange
              name="Напор"
              dimention="м"
              onChange={handleHeadChange}
              min={ranges?.pump_head.min ?? 0}
              max={ranges?.pump_head.max ?? 0}
            />
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
      <Pagination page={page} totalPages={totalPages} setPage={handleSetPage} />
    </>
  );
};
