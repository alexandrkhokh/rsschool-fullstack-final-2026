import { useState } from 'react';
import { useCartStore } from '../store/useCartStore.ts';
import type { Product } from '../types/product.ts';
import { Button } from './ui/Button/Button.tsx';

type Props = {
  product: Product;
};

const ArchiveProductCard = ({ product }: Props) => {
  const { addItem } = useCartStore((state) => state);
  const [isProduct, setProduct] = useState(false);
  const productTitle = product.title.rendered;
  const price = Number(product.price_data.regular_price).toLocaleString('ru-RU');
  const currency = product.price_data.currency;

  const media = product._embedded?.['wp:featuredmedia']?.[0];
  const src = media?.media_details.sizes.medium?.source_url ?? media?.source_url;

  const handleAddProduct = () => {
    addItem(product);
    setProduct(true);
  };

  return (
    <div className="ep-product-card">
      <a href={product.link} className="woocommerce-loop-product__link">
        <div className="product-card__img">
          <img width={300} height={300} src={src} alt={productTitle} />
        </div>
        <div className="product-card__content">
          <h2 className="product-card__title">{productTitle}</h2>

          <div className="pump-params">
            <div className="product-attribute">
              Номин. напор: <b>{product.acf.pump_head} м</b>
            </div>
            <div className="product-attribute">
              Номин. расход:{' '}
              <b>
                {product.acf.pump_flow} м<sup>3</sup>/ч
              </b>
            </div>
          </div>
          <span className="price">{`${price} ${currency}`}</span>
        </div>
      </a>
      <div style={{ display: 'flex', justifyContent: 'center', padding: ' 0 20px 20px' }}>
        <Button
          fullWidth
          variant={isProduct ? 'secondary' : 'primary'}
          text={isProduct ? 'В корзине' : 'Добавить в корзину'}
          onClick={handleAddProduct}
        />
      </div>
    </div>
  );
};
export default ArchiveProductCard;
