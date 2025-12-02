import { useUserStore } from '~/entities/user/model/store';
import type { User } from '~/shared/types/user';

export function useLoadUser() {
  const userStore = useUserStore();
  
  const { data, pending, error } = useAsyncData('user-profile', async () => {
    return await $fetch<User>('/api/user/profile');
  }, {
    server: true,
    default: () => null,
    transform: (user: User | null) => {
      if (user) {
        userStore.setUser(user);
      }
      return user;
    },
  });

  return {
    user: data,
    isLoading: pending,
    error,
  };
}

export function useUser() {
  const { user, isLoading, error } = useLoadUser();

  return {
    user,
    isLoading,
    error,
  };
}
