import type { JSX } from "react";
import type { CartItem } from "../../../types/cart";
import styles from "./CartItemCard.module.css";
import { Button } from "../../ui/Button/Button";
import defaultProductImg from "../../../assets/default-product.svg";

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps): JSX.Element => {
  const totalItemPrice = item.price * item.quantity;

  return (
    <div className={styles.card}>
      <img
        src={item.image || defaultProductImg}
        alt={item.title}
        className={styles.image}
      />

      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.unitPrice}>
          {item.price.toLocaleString()} ₽ / шт.
        </p>
      </div>

      <div className={styles.controls}>
        <Button
          variant="secondary"
          size="sm"
          text="-"
          aria-label="Уменьшить количество"
        />
        <span className={styles.quantity}>{item.quantity}</span>
        <Button
          variant="secondary"
          size="sm"
          text="+"
          aria-label="Увеличить количество"
        />
      </div>

      <div className={styles.total}>{totalItemPrice.toLocaleString()} ₽</div>

      <Button variant="danger" size="sm" text="✕" aria-label="Удалить товар" />
    </div>
  );
};
