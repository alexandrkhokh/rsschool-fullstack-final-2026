import { useState, type JSX, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useProduct } from '../../hooks/useProduct';
import { getProductImage, getProductPricing } from '../../utils/productHelpers';
import { Button } from '../ui/Button/Button';
import { Loader } from '../ui/Loader/Loader';
import { ProductNotFound } from './ProductNotFound';
import { ProductSpecs } from './ProductSpecs';
import defaultProductImg from '../../assets/default-product.svg';
import styles from './ProductDetails.module.css';
import { ProductBreadcrumbs } from './ProductBreadcrumbs';

interface ProductDetailsProps {
  productId: number;
}

const PRICE_LOCALE = 'ru-RU';

export const ProductDetails = ({ productId }: ProductDetailsProps): JSX.Element => {
  const { product, isLoading, hasError } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const cartItem = useCartStore((state) => state.items.find((item) => item.id === productId));

  if (isLoading) {
    return <Loader size="lg" fullPage />;
  }

  if (hasError || !product) {
    return <ProductNotFound />;
  }

  const title = product.title.rendered;
  const imageSrc = getProductImage(product, defaultProductImg);
  const { currentPrice, regularPrice, hasDiscount, currency } = getProductPricing(product);

  const addButtonText = cartItem
    ? `В корзине (${cartItem.quantity} шт.) — Добавить ещё`
    : 'Добавить в корзину';

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = defaultProductImg;
  };

  const handleDecrementQuantity = (): void => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrementQuantity = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = (): void => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <section className={styles.container}>
      <ProductBreadcrumbs currentTitle={title} />

      <div className={styles.productLayout}>
        <div className={styles.imageBox}>
          <img src={imageSrc} alt={title} className={styles.image} onError={handleImageError} />
        </div>

        <div className={styles.infoBox}>
          <span className={styles.categoryBadge}>Насосное оборудование</span>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>
              {currentPrice.toLocaleString(PRICE_LOCALE)} {currency}
            </span>
            {hasDiscount && (
              <span className={styles.oldPrice}>
                {regularPrice.toLocaleString(PRICE_LOCALE)} {currency}
              </span>
            )}
          </div>

          <div className={styles.actionsBlock}>
            <div className={styles.quantitySelector}>
              <Button
                variant="secondary"
                size="md"
                text="−"
                disabled={quantity <= 1}
                onClick={handleDecrementQuantity}
                aria-label="Уменьшить количество"
              />
              <span className={styles.quantityValue}>{quantity}</span>
              <Button
                variant="secondary"
                size="md"
                text="+"
                onClick={handleIncrementQuantity}
                aria-label="Увеличить количество"
              />
            </div>

            <Button variant="primary" size="lg" text={addButtonText} onClick={handleAddToCart} />
          </div>

          {cartItem && (
            <Link to="/cart" className={styles.goToCartLink}>
              Перейти в корзину →
            </Link>
          )}

          <ProductSpecs specs={product.acf} />
        </div>
      </div>
    </section>
  );
};
