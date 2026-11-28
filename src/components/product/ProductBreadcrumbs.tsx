import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductBreadcrumbs.module.css';

interface ProductBreadcrumbsProps {
  currentTitle: string;
  backTo?: string;
  backLabel?: string;
}

export const ProductBreadcrumbs = ({
  currentTitle,
  backTo = '/catalog',
  backLabel = '← Назад в каталог',
}: ProductBreadcrumbsProps): JSX.Element => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Навигация">
      <Link to={backTo} className={styles.backLink}>
        {backLabel}
      </Link>
      <span className={styles.separator} aria-hidden="true">
        /
      </span>
      <span className={styles.currentCrumb}>{currentTitle}</span>
    </nav>
  );
};
