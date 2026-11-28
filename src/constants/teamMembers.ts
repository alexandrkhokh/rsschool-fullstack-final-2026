export interface TeamMember {
  id: string;
  name: string;
  githubLogin: string;
  githubUrl: string;
  role: string;
  contributions: string[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dev-1',
    name: 'Олег Мельников',
    githubLogin: '@Oleg-Melnikow',
    githubUrl: 'https://github.com/Oleg-Melnikow',
    role: 'Frontend Developer',
    contributions: [
      'Спроектировал и реализовал управление состоянием корзины на Zustand с сохранением данных в localStorage (persist + partialize) и автоматическим пересчётом итогов',
      'Написал маппер преобразования товаров из WordPress / WooCommerce REST API в плоскую модель корзины (mapProductToCartItem) с защитой от некорректных цен и медиафайлов',
      'Разработал интерфейс корзины (CartPage, CartItemCard, CartSummary, EmptyCart) с изменением количества, блокировкой уменьшения ниже 1 и очисткой заказа',
      'Реализовал систему промокодов (PromoCodeForm) с регистронезависимой валидацией, защитой от повторного применения и динамическим пересчётом скидки',
      'Сверстал страницу детальной информации о товаре (/catalog/:id) с загрузкой данных по API (useProduct + AbortController), техническими характеристиками (ProductSpecs), хлебными крошками и экраном «Товар не найден» (ProductNotFound)',
      'Настроил тестовое окружение (Vitest + jsdom), покрыл бизнес-логику unit-тестами по TDD и настроил автоматическую проверку качества кода перед коммитами через Husky и lint-staged',
    ],
  },
  {
    id: 'dev-2',
    name: 'Имя Напарника',
    githubLogin: '@teammate-github',
    githubUrl: 'https://github.com',
    role: 'Frontend Developer',
    contributions: [
      'Проектирование архитектуры приложения, роутинга и базового Layout',
      'Интеграция каталога товаров с WordPress / WooCommerce REST API и типизация Product',
      'Разработка переиспользуемых UI-компонентов и адаптивной вёрстки каталога',
    ],
  },
];
