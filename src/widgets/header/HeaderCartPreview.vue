<template>
  <div class="header-cart-preview">
    <Button
      class="header-cart-preview__button"
      variant="primary"
      size="icon"
      @click="cartStore.openCart"
      aria-label="Открыть корзину"
    >
      <CartIcon />
      <CartBadge :count="cartStore.itemsCount" />
    </Button>

    <CartTotal :total="cartStore.total" currency="usd" />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/entities/cart/model/store';
import CartBadge from '~/entities/cart/ui/CartBadge.vue';
import CartTotal from '~/entities/cart/ui/CartTotal.vue';
import Button from '~/shared/ui/Button/Button.vue';
import CartIcon from '~/shared/icons/Cart.vue';

const cartStore = useCartStore();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.header-cart-preview {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.header-cart-preview__button {
  position: relative;
}
</style>

