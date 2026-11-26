import { type JSX } from 'react';
import styles from './CartSummary.module.css';
import { Button } from '../ui/Button/Button';
import type { CartSummaryProps } from '../../types/cart';
import { PromoCodeForm } from './PromoCodeForm/PromoCodeForm';

export const CartSummary = ({
  totalItems,
  subtotalPrice,
  discountAmount,
  discountPercent,
  appliedPromoCode,
  totalPrice,
  currency = 'BYN',
  onApplyPromoCode,
  onRemovePromoCode,
  onClearCart,
}: CartSummaryProps): JSX.Element => {
  return (
    <aside className={styles.summary}>
      <h2 className={styles.heading}>Итого</h2>

      <PromoCodeForm
        appliedPromoCode={appliedPromoCode}
        discountPercent={discountPercent}
        onApplyPromoCode={onApplyPromoCode}
        onRemovePromoCode={onRemovePromoCode}
      />

      <hr className={styles.divider} />

      <div className={styles.row}>
        <span>Товары ({totalItems} шт.)</span>
        <span>
          {subtotalPrice.toLocaleString()} {currency}
        </span>
      </div>

      {discountAmount > 0 && (
        <div className={`${styles.row} ${styles.discountRow}`}>
          <span>Скидка (−{discountPercent}%)</span>
          <span>
            −{discountAmount.toLocaleString()} {currency}
          </span>
        </div>
      )}

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

      <div className={styles.actions}>
        {onClearCart && (
          <Button
            variant="danger"
            size="md"
            text="Очистить корзину"
            fullWidth
            onClick={onClearCart}
          />
        )}
      </div>
    </aside>
  );
};
