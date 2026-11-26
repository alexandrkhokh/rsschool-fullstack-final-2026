import type { JSX } from 'react';
import { EmptyCart } from '../components/cart/EmptyCart/EmptyCart';
import styles from './CartPage.module.css';
import { CartItemCard } from '../components/cart/CartItemCard/CartItemCard';
import { CartSummary } from '../components/cart/CartSummary';
import { useCartStore } from '../store/useCartStore';

export const CartPage = (): JSX.Element => {
  const {
    items,
    promoCode,
    discountPercent,
    totalItems,
    subtotalPrice,
    discountAmount,
    totalPrice,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
    removePromoCode,
  } = useCartStore((state) => state);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  const currency = items[0]?.currency ?? 'BYN';

  return (
    <section className={styles.container}>
      <h1 className={styles.pageTitle}>Корзина</h1>
      <div className={styles.grid}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <CartSummary
          totalItems={totalItems}
          subtotalPrice={subtotalPrice}
          discountAmount={discountAmount}
          discountPercent={discountPercent}
          appliedPromoCode={promoCode}
          totalPrice={totalPrice}
          currency={currency}
          onApplyPromoCode={applyPromoCode}
          onRemovePromoCode={removePromoCode}
          onClearCart={clearCart}
        />
      </div>
    </section>
  );
};
