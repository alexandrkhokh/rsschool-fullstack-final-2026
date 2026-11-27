import type { JSX } from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  label?: string;
}

export const Loader = ({
  size = 'md',
  fullPage = false,
  label = 'Загрузка',
}: LoaderProps): JSX.Element => {
  return (
    <div
      className={`${styles.container} ${fullPage ? styles.fullPage : ''}`}
      role="status"
      aria-label={label}
    >
      <span className={`${styles.spinner} ${styles[size]}`} aria-hidden="true" />
    </div>
  );
};
