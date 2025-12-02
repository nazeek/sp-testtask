<template>
  <Modal
    :is-open="isOpen"
    position="right"
    @close="$emit('close')"
  >
    <template #header>
      <div class="cart-modal__header">
        <span class="cart-modal__icon">
          <HandBasketIcon />
        </span>
        <h2 v-if="itemsCount > 0" class="cart-modal__title">
          {{ itemsCount }} {{ itemsCountText }} в корзине
        </h2>
        <h2 v-else class="cart-modal__title">
          В корзине нет предметов
        </h2>
      </div>
    </template>

    <div v-if="!isEmpty" class="cart-modal__content">
      <div class="cart-modal__items">
        <CartItem
          v-for="cartItem in items"
          :key="cartItem.item.id"
          :cart-item="cartItem"
          :currency="currency"
          @remove="$emit('remove-item', cartItem.item.id)"
        />
      </div>

      <CartTotal :total="total" :currency="currency" label="Сумма покупки" variant="full" />

      <ErrorMessage
        v-if="purchaseError"
        :message="purchaseError"
        variant="block"
      />

      <CartActions
        :disabled="isPurchasing"
        @purchase="handlePurchase"
        @clear="$emit('clear-cart')"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CartItem as CartItemType } from '~/shared/types/cart';
import Modal from '~/shared/ui/Modal/Modal.vue';
import ErrorMessage from '~/shared/ui/ErrorMessage/ErrorMessage.vue';
import CartItem from '~/widgets/cart/CartItem.vue';
import CartTotal from '~/entities/cart/ui/CartTotal.vue';
import CartActions from '~/widgets/cart/CartActions.vue';
import HandBasketIcon from '~/shared/icons/HandBasket.vue';
import { pluralize } from '~/shared/lib/utils/formatters';

interface Props {
  isOpen: boolean;
  items: CartItemType[];
  total: number;
  isEmpty: boolean;
  itemsCount: number;
  currency: string;
  purchaseError?: string | null;
  isPurchasing?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  purchaseError: null,
  isPurchasing: false,
});

const emit = defineEmits<{
  close: [];
  'remove-item': [itemId: number | string];
  'clear-cart': [];
  purchase: [];
}>();

const itemsCountText = computed(() => {
  return pluralize(props.itemsCount, ['предмет', 'предмета', 'предметов']);
});

const handlePurchase = () => {
  emit('purchase');
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.cart-modal__header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.cart-modal__icon {
  svg {
    display: block;
  }
}

.cart-modal__title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.cart-modal__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cart-modal__items {
  flex: 1;
  overflow-y: auto;
}
</style>

