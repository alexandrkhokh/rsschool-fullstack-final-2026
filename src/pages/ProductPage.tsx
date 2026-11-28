import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { ProductNotFound } from '../components/product/ProductNotFound';
import { ProductDetails } from '../components/product/ProductDetails';

export const ProductPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  if (!id || Number.isNaN(productId) || productId <= 0) {
    return <ProductNotFound message="Указан некорректный адрес товара." />;
  }

  return <ProductDetails key={productId} productId={productId} />;
};
