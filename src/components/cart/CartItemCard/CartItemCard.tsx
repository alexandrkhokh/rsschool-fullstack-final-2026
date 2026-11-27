import type { JSX, SyntheticEvent } from 'react';
import type { CartItem } from '../../../types/cart';
import styles from './CartItemCard.module.css';
import { Button } from '../../ui/Button/Button';
import defaultProductImg from '../../../assets/default-product.svg';
import { Link } from 'react-router-dom';
import { getProductRoute } from '../../../router';

interface CartItemCardProps {
  item: CartItem;
  onIncrement: (id: CartItem['id']) => void;
  onDecrement: (id: CartItem['id']) => void;
  onRemove: (id: CartItem['id']) => void;
}

export const CartItemCard = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemCardProps): JSX.Element => {
  const totalItemPrice = item.price * item.quantity;
  const currency = item.currency || 'BYN';
  const productUrl = getProductRoute(item.id);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = defaultProductImg;
  };

  return (
    <article className={styles.card}>
      <Link to={productUrl} className={styles.productLink} aria-label={item.title}>
        <img
          src={item.image || defaultProductImg}
          alt={item.title}
          className={styles.image}
          onError={handleImageError}
        />

        <div className={styles.info}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.unitPrice}>
            {item.price.toLocaleString()} {currency} / шт.
          </p>
        </div>
      </Link>
      <div className={styles.controls}>
        <Button
          variant="secondary"
          size="sm"
          text="−"
          disabled={item.quantity <= 1}
          onClick={() => onDecrement(item.id)}
          aria-label="Уменьшить количество"
        />
        <span className={styles.quantity}>{item.quantity}</span>
        <Button
          variant="secondary"
          size="sm"
          text="+"
          onClick={() => onIncrement(item.id)}
          aria-label="Увеличить количество"
        />
      </div>

      <div className={styles.total}>
        {totalItemPrice.toLocaleString()} {currency}
      </div>

      <Button
        variant="danger"
        size="sm"
        text="✕"
        onClick={() => onRemove(item.id)}
        aria-label="Удалить товар"
      />
    </article>
  );
};
