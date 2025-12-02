<template>
  <div class="cart-actions">
    <Button variant="primary" :disabled="disabled" @click="$emit('purchase')">
      <CartIcon class="cart-actions__icon" /> Купить
    </Button>
    <Button variant="ghost" @click="$emit('clear')">
      Очистить корзину
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '~/shared/ui/Button/Button.vue';
import CartIcon from '~/shared/icons/Cart.vue';

interface Props {
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});

defineEmits<{
  purchase: [];
  clear: [];
}>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-lg;
  border-top: 1px solid $border-color;

  &__icon {
    margin-right: $spacing-xs;
  }
}
</style>

