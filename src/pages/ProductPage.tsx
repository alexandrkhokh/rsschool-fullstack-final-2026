import { useParams } from 'react-router-dom';
import type { JSX } from 'react';

export const ProductPage = (): JSX.Element => {
  // Извлекаем динамический параметр :id из URL
  const { id } = useParams<{ id: string }>();

  return <h1>Детальная страница товара (ID: {id})</h1>;
};
