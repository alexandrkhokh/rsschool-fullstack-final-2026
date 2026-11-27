import type { JSX } from 'react';
import type { Product } from '../../types/product';
import styles from './ProductSpecs.module.css';

interface ProductSpecsProps {
  specs: Product['acf'];
}

export const ProductSpecs = ({ specs }: ProductSpecsProps): JSX.Element => {
  const specItems = [
    { label: 'Мощность', value: `${specs.pump_power} Вт` },
    { label: 'Номинальный напор', value: `${specs.pump_head} м` },
    {
      label: 'Номинальный расход',
      value: (
        <>
          {specs.pump_flow} м<sup>3</sup>/ч
        </>
      ),
    },
  ];

  return (
    <div className={styles.specsSection}>
      <h2 className={styles.sectionHeading}>Технические характеристики</h2>
      <dl className={styles.specsList}>
        {specItems.map(({ label, value }) => (
          <div key={label} className={styles.specRow}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
