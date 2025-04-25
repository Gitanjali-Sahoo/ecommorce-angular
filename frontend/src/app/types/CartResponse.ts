import { Cart } from './Cart';

export interface CartResponse {
  items: Cart[];
  total: number;
}
