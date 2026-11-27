import { useEffect, useState } from 'react';
import { getProduct } from '../api/getProducts';
import type { Product } from '../types/product';

interface UseProductResult {
  product: Product | null;
  isLoading: boolean;
  hasError: boolean;
}

export const useProduct = (productId: number): UseProductResult => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct(): Promise<void> {
      try {
        const data = await getProduct(productId, controller.signal);
        setProduct(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadProduct();

    return () => controller.abort();
  }, [productId]);

  return { product, isLoading, hasError };
};
