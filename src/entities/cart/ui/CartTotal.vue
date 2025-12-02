<template>
  <div :class="['cart-total', `cart-total--${variant}`]">
    <span class="cart-total__label">{{ label }}</span>
    <span class="cart-total__amount">{{ formattedTotal }}</span>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '~/shared/lib/utils/formatters';

type Variant = 'compact' | 'full';

interface Props {
  total: number;
  currency?: string;
  label?: string;
  variant?: Variant;
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'usd',
  label: 'К покупке',
  variant: 'compact',
});

const formattedTotal = computed(() => formatPrice(props.total, props.currency));
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.cart-total {
  &--compact {
    font-size: 0.875rem;
    color: $text-secondary;
    text-align: right;

    @include tablet {
      display: none;
    }

    .cart-total__label {
      display: block;
      font-size: 14px;
      color: $text-secondary;
    }

    .cart-total__amount {
      display: block;
      color: $text-primary;
      font-size: 16px;
      font-weight: 600;
    }
  }

  &--full {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-lg;
    border-top: 1px solid $border-color;

    .cart-total__label {
      font-size: 1rem;
      color: $text-secondary;
    }

    .cart-total__amount {
      font-size: 1.25rem;
      font-weight: 600;
      color: $text-primary;
    }
  }
}
</style>
