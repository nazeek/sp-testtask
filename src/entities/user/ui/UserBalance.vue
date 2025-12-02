<template>
  <div class="user-balance">
    <span class="user-balance__amount">{{ formattedBalance }}</span>
    <span class="user-balance__label">Ваш баланс</span>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '~/shared/lib/utils/formatters';

interface Props {
  balance: number;
  currency: string;
}

const props = defineProps<Props>();

const formattedBalance = computed(() => formatPrice(props.balance, props.currency));
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.user-balance {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-balance__amount {
  font-weight: 600;
  color: $text-primary;
}

.user-balance__label {
  font-size: 0.75rem;
  color: $text-secondary;
}
</style>

