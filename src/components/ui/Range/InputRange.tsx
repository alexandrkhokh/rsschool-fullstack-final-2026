import type { CSSProperties, JSX } from 'react';
import type { Range } from '../../../types/ranges.ts';
import styles from './InputRange.module.css';

interface InputRangeProps {
  name: string;
  unit: string;
  min: number;
  max: number;
  value: Range;
  onChange: (value: Range) => void;
}

export const InputRange = ({
  name,
  unit,
  min,
  max,
  value,
  onChange,
}: InputRangeProps): JSX.Element => {
  const from = value.min ?? min;
  const to = value.max ?? max;

  const toPercent = (point: number) => (max > min ? ((point - min) / (max - min)) * 100 : 0);

  const handleFromChange = (newFrom: number) => {
    onChange({ min: Math.min(newFrom, to), max: value.max });
  };

  const handleToChange = (newTo: number) => {
    onChange({ min: value.min, max: Math.max(newTo, from) });
  };

  const trackStyle = {
    '--from': `${toPercent(from)}%`,
    '--to': `${toPercent(to)}%`,
  } as CSSProperties;

  const isFromOnTop = toPercent(from) > 50;

  return (
    <fieldset className={styles.range}>
      <legend className={styles.title}>{name}</legend>

      <output className={styles.value}>
        {from} {unit} — {to} {unit}
      </output>

      <div className={styles.track} style={trackStyle}>
        <input
          type="range"
          className={isFromOnTop ? `${styles.input} ${styles.onTop}` : styles.input}
          aria-label={`${name}: от`}
          min={min}
          max={max}
          value={from}
          onChange={(e) => handleFromChange(Number(e.target.value))}
        />
        <input
          type="range"
          className={styles.input}
          aria-label={`${name}: до`}
          min={min}
          max={max}
          value={to}
          onChange={(e) => handleToChange(Number(e.target.value))}
        />
      </div>
    </fieldset>
  );
};
