import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './EmptyCart.module.css';

interface EmptyCartProps {
  title?: string;
  description?: string;
  linkText?: string;
}

export const EmptyCart = ({
  title = 'Корзина пуста',
  description = 'Добавьте товары из каталога, чтобы оформить заказ.',
  linkText = 'Перейти в каталог',
}: EmptyCartProps): JSX.Element => {
  return (
    <div className={styles.empty}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Link to="/catalog" className={styles.catalogLink}>
        {linkText}
      </Link>
    </div>
  );
};
