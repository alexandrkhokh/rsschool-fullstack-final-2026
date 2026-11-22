import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <header
        style={{
          display: "flex",
          gap: "16px",
          padding: "16px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <nav style={{ display: "flex", gap: "12px" }}>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/cart">Корзина</NavLink>
        </nav>
      </header>

      <main style={{ padding: "16px" }}>
        {/* Здесь будут рендериться дочерние страницы */}
        <Outlet />
      </main>
    </div>
  );
};
