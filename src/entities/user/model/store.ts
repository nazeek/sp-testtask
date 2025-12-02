import { defineStore } from 'pinia';
import type { User } from '~/shared/types/user';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    balance: (state) => state.user?.balance ?? 0,
    currency: (state) => state.user?.currency ?? 'usd',
    isAuthenticated: (state) => state.user !== null,
  },

  actions: {
    setUser(user: User) {
      this.user = user;
      this.error = null;
    },

    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },

    updateBalance(newBalance: number) {
      if (this.user) {
        this.user.balance = newBalance;
      }
    },
  },
});

