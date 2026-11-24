import { Link } from 'react-router-dom';
import type { JSX } from 'react';

export const NotFoundPage = (): JSX.Element => {
  return (
    <div>
      <h1>404 — Страница не найдена</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};
