export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  currency: string;
  image?: string;
  quantity: number;
}
