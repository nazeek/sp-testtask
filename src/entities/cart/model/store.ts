import { defineStore } from 'pinia';
import type { CartItem } from '~/shared/types/cart';
import type { Item as ItemType } from '~/shared/types/item';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
  }),

  getters: {
    total: (state) => {
      return state.items.reduce((sum, cartItem) => {
        const price = cartItem.item.price !== null ? cartItem.item.price : cartItem.item.avgPrice;
        return sum + price * cartItem.quantity;
      }, 0);
    },

    itemsCount: (state) => {
      return state.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
    },

    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(item: ItemType) {
      const existingItem = this.items.find((cartItem) => cartItem.item.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({
          item: item as ItemType,
          quantity: 1,
        });
      }
    },

    removeItem(itemId: number | string) {
      const id = typeof itemId === 'string' ? Number(itemId) : itemId;
      const index = this.items.findIndex((cartItem) => cartItem.item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },

    updateQuantity(itemId: number | string, quantity: number) {
      const id = typeof itemId === 'string' ? Number(itemId) : itemId;
      const cartItem = this.items.find((cartItem) => cartItem.item.id === id);
      if (cartItem) {
        if (quantity <= 0) {
          this.removeItem(id);
        } else {
          cartItem.quantity = quantity;
        }
      }
    },

    clearCart() {
      this.items = [];
    },

    openCart() {
      this.isOpen = true;
    },

    closeCart() {
      this.isOpen = false;
    },

    toggleCart() {
      this.isOpen = !this.isOpen;
    },
  },
});

