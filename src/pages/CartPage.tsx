import type { JSX } from "react";
import { EmptyCart } from "../components/cart/EmptyCart/EmptyCart";
import styles from "./CartPage.module.css";
import type { CartItem } from "../types/cart";
import { CartItemCard } from "../components/cart/CartItemCard/CartItemCard";
import { CartSummary } from "../components/cart/CartSummary";

// Временные данные для проверки базового отображения UI
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    title: "Беспроводные наушники Sony WH-1000XM5",
    price: 32990,
    image: "",
    quantity: 1,
  },
  {
    id: 2,
    title: "Механическая клавиатура Keychron K2",
    price: 11500,
    image: "",
    quantity: 2,
  },
];

export const CartPage = (): JSX.Element => {
  const items = MOCK_CART_ITEMS;

  if (items.length === 0) {
    return <EmptyCart />;
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className={styles.container}>
      <h1 className={styles.pageTitle}>Корзина</h1>
      <div className={styles.grid}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
        <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
      </div>
    </section>
  );
};
