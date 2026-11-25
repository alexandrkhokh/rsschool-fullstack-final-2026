import { useState, type JSX, type SubmitEvent } from 'react';
import styles from './CartSummary.module.css';
import { Button } from '../ui/Button/Button';
import type { CartSummaryProps, PromoCodeResult } from '../../types/cart';

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
  const [promoInput, setPromoInput] = useState('');
  const [status, setStatus] = useState<PromoCodeResult | null>(null);

  const handlePromoSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const result = onApplyPromoCode(promoInput);
    setStatus(result);

    if (result.success) {
      setPromoInput('');
    }
  };

  const handleRemovePromo = (): void => {
    onRemovePromoCode();
    setStatus(null);
  };

  const isDuplicateInput =
    appliedPromoCode !== null && promoInput.trim().toUpperCase() === appliedPromoCode;

  return (
    <aside className={styles.summary}>
      <h2 className={styles.heading}>Итого</h2>

      <form className={styles.promoForm} onSubmit={handlePromoSubmit}>
        <label htmlFor="promo-code-input" className={styles.promoLabel}>
          Промокод
        </label>
        <div className={styles.promoInputGroup}>
          <input
            id="promo-code-input"
            type="text"
            value={promoInput}
            onChange={(e) => {
              setPromoInput(e.target.value);
              if (status) setStatus(null);
            }}
            placeholder="Например, SALE10"
            className={styles.promoInput}
          />
          <Button
            type="submit"
            variant="secondary"
            size="md"
            text="Применить"
            disabled={!promoInput.trim() || isDuplicateInput}
          />
        </div>

        {isDuplicateInput && !status && (
          <p className={`${styles.statusMessage} ${styles.statusInfo}`} role="status">
            Промокод {appliedPromoCode} уже применён
          </p>
        )}

        {status && (
          <p
            className={`${styles.statusMessage} ${
              status.success ? styles.statusSuccess : styles.statusError
            }`}
            role="status"
          >
            {status.message}
          </p>
        )}
      </form>

      {appliedPromoCode && (
        <div className={styles.appliedBadge}>
          <span>
            Промокод: <strong>{appliedPromoCode}</strong> (−{discountPercent}%)
          </span>
          <button
            type="button"
            onClick={handleRemovePromo}
            className={styles.removePromoBtn}
            aria-label="Удалить промокод"
          >
            ✕
          </button>
        </div>
      )}

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
      </div>
    </aside>
  );
};
