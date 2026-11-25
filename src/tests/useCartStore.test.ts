import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../store/useCartStore';
import type { Product } from '../types/product';
import { mockProductFull } from './mockData';

const mockProduct1 = mockProductFull;

const mockProduct2: Product = {
  id: 102,
  title: { rendered: 'Насос скважинный Pedrollo' },
  link: 'https://example.com',
  featured_media: 2,
  price_html: '400.00 BYN',
  acf: { pump_power: 750, pump_head: 50, pump_flow: 5 },
  _embedded: { 'wp:featuredmedia': [] },
  price_data: {
    currency: 'BYN',
    price: '400',
    regular_price: '450',
    sale_price: '400',
  },
};

describe('useCartStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
  });

  it('1. изначально корзина должна быть пустой', () => {
    const state = useCartStore.getState();

    expect(state.items).toEqual([]);
    expect(state.getTotalItems()).toBe(0);
    expect(state.getTotalPrice()).toBe(0);
  });

  it('2. добавляет новый товар с quantity = 1', () => {
    useCartStore.getState().addItem(mockProduct1);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({
      id: 101,
      title: 'Насос циркуляционный Grundfos',
      price: 150.5,
      currency: 'BYN',
      image: 'https://example.com',
      quantity: 1,
    });
  });

  it('3. увеличивает quantity на 1 при повторном добавлении того же товара', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct1);
    addItem(mockProduct1);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('4. увеличивает количество товара по действию incrementQuantity (+)', () => {
    const { addItem, incrementQuantity } = useCartStore.getState();
    addItem(mockProduct1);
    incrementQuantity(101);

    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(2);
  });

  it('5. уменьшает количество товара по действию decrementQuantity (−), если quantity > 1', () => {
    const { addItem, incrementQuantity, decrementQuantity } = useCartStore.getState();
    addItem(mockProduct1);
    incrementQuantity(101);
    decrementQuantity(101);

    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(1);
  });

  it('6. блокирует уменьшение количества ниже 1 при вызове decrementQuantity (−)', () => {
    const { addItem, decrementQuantity } = useCartStore.getState();
    addItem(mockProduct1);
    decrementQuantity(101);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);
  });

  it('7. удаляет позицию из корзины по действию removeItem', () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem(mockProduct1);
    addItem(mockProduct2);
    removeItem(101);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(102);
  });

  it('8. очищает всю корзину по действию clearCart', () => {
    const { addItem, clearCart } = useCartStore.getState();
    addItem(mockProduct1);
    addItem(mockProduct2);
    clearCart();

    const { items } = useCartStore.getState();
    expect(items).toEqual([]);
  });

  it('9. корректно рассчитывает общее количество товаров и общую стоимость корзины', () => {
    const { addItem, incrementQuantity } = useCartStore.getState();
    addItem(mockProduct1); // 150 * 1
    incrementQuantity(101); // 150 * 2 = 300
    addItem(mockProduct2); // 400 * 1 = 400

    const state = useCartStore.getState();
    expect(state.getTotalItems()).toBe(3);
    expect(state.getTotalPrice()).toBe(701);
  });

  it('10. сохраняет в localStorage только массив items', () => {
    useCartStore.getState().addItem(mockProduct1);

    const rawStorage = localStorage.getItem('shopping-cart-storage');
    expect(rawStorage).not.toBeNull();

    const parsed = JSON.parse(rawStorage as string);
    expect(Object.keys(parsed.state)).toEqual(['items']);
    expect(parsed.state.items).toHaveLength(1);
    expect(parsed.state.items[0].id).toBe(101);
  });
});

describe('промокоды и расчёт скидки', () => {
  it('11. применяет валидный промокод (включая нижний регистр и пробелы) и пересчитывает итоговую сумму', () => {
    const { addItem, applyPromoCode } = useCartStore.getState();
    addItem(mockProduct2); // цена 400

    const result = applyPromoCode('  sale10  ');
    const state = useCartStore.getState();

    expect(result.success).toBe(true);
    expect(state.promoCode).toBe('SALE10');
    expect(state.discountPercent).toBe(10);
    expect(state.getDiscountAmount()).toBe(40); // 10% от 400
    expect(state.getTotalPrice()).toBe(360); // 400 - 40
  });

  it('12. при вводе неизвестного промокода возвращает ошибку и не меняет сумму', () => {
    const { addItem, applyPromoCode } = useCartStore.getState();
    addItem(mockProduct2); // 400

    const result = applyPromoCode('INVALID_CODE');
    const state = useCartStore.getState();

    expect(result.success).toBe(false);
    expect(state.promoCode).toBeNull();
    expect(state.getDiscountAmount()).toBe(0);
    expect(state.getTotalPrice()).toBe(400);
  });

  it('13. защищает от повторного применения того же промокода и не суммирует скидку', () => {
    const { addItem, applyPromoCode } = useCartStore.getState();
    addItem(mockProduct2); // 400

    applyPromoCode('SALE10');
    const secondAttempt = applyPromoCode('sale10');
    const state = useCartStore.getState();

    expect(secondAttempt.success).toBe(false);
    expect(state.discountPercent).toBe(10); // Не 20%!
    expect(state.getTotalPrice()).toBe(360);
  });

  it('14. динамически пересчитывает скидку при изменении количества или удалении товара (DoD)', () => {
    const { addItem, incrementQuantity, applyPromoCode } = useCartStore.getState();
    addItem(mockProduct2); // 400
    applyPromoCode('SALE10'); // скидка 40, итог 360

    incrementQuantity(102); // теперь 2 шт = 800
    const state = useCartStore.getState();

    expect(state.getDiscountAmount()).toBe(80); // 10% от 800
    expect(state.getTotalPrice()).toBe(720); // 800 - 80
  });

  it('15. сбрасывает применённый промокод при очистке корзины (DoD)', () => {
    const { addItem, applyPromoCode, clearCart } = useCartStore.getState();
    addItem(mockProduct2);
    applyPromoCode('SALE10');

    clearCart();
    const state = useCartStore.getState();

    expect(state.promoCode).toBeNull();
    expect(state.discountPercent).toBe(0);
    expect(state.getDiscountAmount()).toBe(0);
  });
});
