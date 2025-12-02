import { useCartStore } from '~/entities/cart/model/store';
import type { Item } from '~/shared/types/item';

export function useAddToCart() {
  const cartStore = useCartStore();

  const addToCart = (item: Item) => {
    cartStore.addItem(item);
  };

  return {
    addToCart,
  };
}

