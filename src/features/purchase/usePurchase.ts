import { useCartStore } from '~/entities/cart/model/store';
import { useUserStore } from '~/entities/user/model/store';

export function usePurchase() {
  const cartStore = useCartStore();
  const userStore = useUserStore();

  const purchase = async (): Promise<{ success: boolean; error?: string }> => {
    const total = cartStore.total;
    const balance = userStore.balance;

    if (total > balance) {
      return {
        success: false,
        error: 'Недостаточно средств на балансе',
      };
    }

    try {
      const newBalance = balance - total;
      userStore.updateBalance(newBalance);
      cartStore.clearCart();
      cartStore.closeCart();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Ошибка при покупке',
      };
    }
  };

  return {
    purchase,
  };
}

