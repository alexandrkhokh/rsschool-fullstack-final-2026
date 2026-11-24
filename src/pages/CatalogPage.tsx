import { useEffect, type JSX } from 'react';
import { getProducts } from '../api/getProducts';

export const CatalogPage = (): JSX.Element => {
  useEffect(() => {
    getProducts().catch(console.error);
  }, []);

  return (
    <div>
      <h1>Каталог товаров</h1>
    </div>
  );
};
