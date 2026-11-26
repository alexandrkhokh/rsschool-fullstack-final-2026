import { useState, type SubmitEvent, type JSX } from 'react';
import type { PromoCodeResult } from '../../../types/cart';
import { Button } from '../../ui/Button/Button';
import styles from './PromoCodeForm.module.css';

interface PromoCodeFormProps {
  appliedPromoCode: string | null;
  discountPercent: number;
  onApplyPromoCode: (code: string) => PromoCodeResult;
  onRemovePromoCode: () => void;
}

export const PromoCodeForm = ({
  appliedPromoCode,
  discountPercent,
  onApplyPromoCode,
  onRemovePromoCode,
}: PromoCodeFormProps): JSX.Element => {
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
    <div className={styles.wrapper}>
      <form className={styles.promoForm} onSubmit={handlePromoSubmit}>
        <label htmlFor="promo-code-input" className={styles.promoLabel}>
          Промокод: Введите SALE10 для скидки
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
    </div>
  );
};
