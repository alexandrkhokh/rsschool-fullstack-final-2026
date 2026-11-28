import {getProducts} from "../api/getProducts.ts";

import { type JSX, useEffect, useState } from "react";
import { type Product } from '../types/product';
import ArchiveProductCard from "../components/ArchiveProductCard.tsx";
import Pagination from "../components/Pagination.tsx";
import {getRanges} from "../api/getRanges.ts";
import {InputRange} from "../components/ui/Range/InputRange.tsx";
import type {Ranges, Range} from "../types/ranges.ts";

const PER_PAGE = 12;


export const CatalogPage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ranges, setRanges] = useState<Ranges | null>(null)
  const [headFilter, setHeadFilter] = useState<Range>({min: null, max: null})
  const [flowFilter, setFlowFilter] = useState<Range>({min: null, max: null})
  const [powerFilter, setPowerFilter] = useState<Range>({min: null, max: null})

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

  const head = ranges?.pump_head;
  const flow = ranges?.pump_flow;
  const power = ranges?.pump_power;

  return (
    <>
      <h1>Каталог товаров</h1>
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2 mb-3">
          <aside id="sidebar">
            {products.length} продуктов на странице
            {power && power.min !== null && power.max !== null && (
              <InputRange
                name="Напор"
                unit="м"
                min={power.min}
                max={power.max}
                value={powerFilter}
                onChange={setPowerFilter}
              />
            )}
            {head && head.min !== null && head.max !== null && (
              <InputRange
                name="Напор"
                unit="м"
                min={head.min}
                max={head.max}
                value={headFilter}
                onChange={setHeadFilter}
              />
            )}
            {flow && flow.min !== null && flow.max !== null && (
              <InputRange
                name="Расход"
                unit="м3/ч"
                min={flow.min}
                max={flow.max}
                value={flowFilter}
                onChange={setHeadFilter}
              />
            )}
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
