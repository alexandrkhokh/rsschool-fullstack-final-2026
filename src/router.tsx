import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Сработает точно по пути '/'
        element: <MainPage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'catalog/:id',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: '*', // Перехватит все несуществующие маршруты
        element: <NotFoundPage />,
      },
    ],
  },
]);
