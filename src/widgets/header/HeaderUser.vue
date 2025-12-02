<template>
  <div class="header-user">
    <div class="header-user__balance">
      <UserBalance :balance="userStore.balance" :currency="userStore.currency" />
      <Button variant="primary" size="icon">
        <PlusIcon />
      </Button>
    </div>
    <div class="header-user__flag">
      <RuFlagIcon />
    </div>
    <HeaderProfile />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/entities/user/model/store';
import UserBalance from '~/entities/user/ui/UserBalance.vue';
import Button from '~/shared/ui/Button/Button.vue';
import PlusIcon from '~/shared/icons/Plus.vue';
import RuFlagIcon from '~/shared/icons/flags/Ru.vue';
import HeaderProfile from '~/widgets/header/HeaderProfile.vue';

const userStore = useUserStore();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.header-user {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
}

.header-user__balance {
  display: flex;
  align-items: center;
  gap: $spacing-sm;

  @include tablet {
    display: none;
  }
}

.header-user__add-balance {
  width: 32px;
  height: 32px;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  background: $bg-primary;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    background: $bg-tertiary;
  }
}

.header-user__flag {
  width: 46px;
  height: 46px;
  border-radius: $border-radius;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: $bg-semivisible;
  cursor: pointer;
}
</style>

