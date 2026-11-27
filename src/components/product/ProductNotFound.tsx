import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button/Button';
import styles from './ProductNotFound.module.css';

interface ProductNotFoundProps {
  message?: string;
}

export const ProductNotFound = ({
  message = 'К сожалению, запрашиваемый товар не найден или был удалён из каталога.',
}: ProductNotFoundProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Товар не найден</h2>
      <p className={styles.description}>{message}</p>
      <Button
        variant="primary"
        size="md"
        text="Вернуться в каталог"
        onClick={() => void navigate('/catalog')}
      />
    </div>
  );
};
