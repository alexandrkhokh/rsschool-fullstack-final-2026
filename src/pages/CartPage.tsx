import type { JSX } from 'react';
import { EmptyCart } from '../components/cart/EmptyCart/EmptyCart';
import styles from './CartPage.module.css';
import { CartItemCard } from '../components/cart/CartItemCard/CartItemCard';
import { CartSummary } from '../components/cart/CartSummary';
import { useCartStore } from '../store/useCartStore';
import { DEMO_PRODUCTS } from '../store/promoCodes';
import { Button } from '../components/ui/Button/Button';

export const CartPage = (): JSX.Element => {
  const { addItem, items, incrementQuantity, decrementQuantity, removeItem, clearCart } =
    useCartStore((state) => state);

  const handleAddDemoProduct = () => {
    DEMO_PRODUCTS.forEach((product) => addItem(product));
  };

  if (items.length === 0) {
    return (
      <div>
        <EmptyCart />
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button
            variant="primary"
            size="lg"
            text="+ Добавить тестовый товар"
            onClick={handleAddDemoProduct}
          />
        </div>
      </div>
    );
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
          totalPrice={totalPrice}
          currency={currency}
          onClearCart={clearCart}
        />
      </div>
    </section>
  );
};
