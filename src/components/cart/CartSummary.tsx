import type { JSX } from 'react';
import styles from './CartSummary.module.css';
import { Button } from '../ui/Button/Button';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  currency?: string;
  onClearCart?: () => void;
}

export const CartSummary = ({
  totalItems,
  totalPrice,
  currency = 'BYN',
  onClearCart,
}: CartSummaryProps): JSX.Element => {
  return (
    <aside className={styles.summary}>
      <h2 className={styles.heading}>Итого</h2>

      <div className={styles.row}>
        <span>Товары ({totalItems} шт.)</span>
        <span>
          {totalPrice.toLocaleString()} {currency}
        </span>
      </div>

      <div className={styles.row}>
        <span>Доставка</span>
        <span>Бесплатно</span>
      </div>

      <hr className={styles.divider} />

      <div className={`${styles.row} ${styles.totalRow}`}>
        <span>К оплате</span>
        <span>
          {totalPrice.toLocaleString()} {currency}
        </span>
      </div>

      <Button variant="primary" size="lg" text="Оформить заказ" fullWidth />
      {onClearCart && (
        <Button
          variant="danger"
          size="md"
          text="Очистить корзину"
          fullWidth
          onClick={onClearCart}
        />
      )}
    </aside>
  );
};
