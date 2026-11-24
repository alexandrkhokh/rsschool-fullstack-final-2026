import { RouterProvider } from 'react-router-dom';
import { router } from './router';

// Relative path: in dev Vite proxies it to WordPress, in production the build
// lives on the same origin as WordPress.

function App() {
  return <RouterProvider router={router} />;
}

export default App;
