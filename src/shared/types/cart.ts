import type { Item } from '~/shared/types/item';

export interface CartItem {
  item: Item;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

