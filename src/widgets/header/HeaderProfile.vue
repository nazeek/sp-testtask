<template>
  <div class="header-profile">
    <div class="header-profile__info">
      <span class="header-profile__name">{{ user?.name }}</span>
      <div class="header-profile__link">Профиль</div>
    </div>
    <UserAvatar :avatar="user?.avatar || ''" :name="user?.name || ''" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/entities/user/model/store';
import UserAvatar from '~/entities/user/ui/UserAvatar.vue';

const userStore = useUserStore();
const user = computed(() => userStore.user);
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.header-profile {
  display: flex;
  align-items: center;
  gap: $spacing-sm;

  @include tablet {
    display: none;
  }
}

.header-profile__info {
  text-align: right;
}

.header-profile__link {
  font-size: 0.75rem;
  color: $text-secondary;
}

.header-profile__name {
  font-weight: 600;
  color: $text-primary;
}
</style>
