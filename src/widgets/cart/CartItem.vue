<template>
  <div class="cart-item">
    <ItemImage
      :src="cartItem.item.imageUri"
      :alt="cartItem.item.name"
      class="cart-item__image"
    />
    <div class="cart-item__content">
      <h4 class="cart-item__name">{{ cartItem.item.name }}</h4>
      <div class="cart-item__badges">
        <ItemBadges :properties="itemProperties" />
      </div>
      <p class="cart-item__price">{{ formattedPrice }}</p>
    </div>
    <Button
      class="cart-item__remove"
      @click="$emit('remove')"
      aria-label="Удалить из корзины"
      variant="ghost"
      size="icon"
    >
      ×
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { CartItem as CartItemType } from '~/shared/types/cart';
import ItemImage from '~/entities/item/ui/ItemImage.vue';
import ItemBadges from '~/entities/item/ui/ItemBadges.vue';
import { formatPrice } from '~/shared/lib/utils/formatters';
import { getItemProperties } from '~/shared/lib/helpers/itemProperties';
import { DEFAULT_CURRENCY } from '~/shared/config/constants';
import Button from '~/shared/ui/Button/Button.vue';

interface Props {
  cartItem: CartItemType;
  currency?: string;
}

const props = withDefaults(defineProps<Props>(), {
  currency: DEFAULT_CURRENCY,
});

const itemProperties = computed(() => getItemProperties(props.cartItem.item));
const formattedPrice = computed(() => {
  return formatPrice(props.cartItem.item.price, props.currency);
});

defineEmits<{
  remove: [];
}>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.cart-item {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-md;
  border-bottom: 1px solid $border-color;
  position: relative;
}

.cart-item__image {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: $border-radius;
  overflow: hidden;
}

.cart-item__content {
  flex: 1;
}

.cart-item__name {
  margin: 0 0 $spacing-xs 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: $text-primary;
}

.cart-item__badges {
  margin-bottom: $spacing-xs;
}

.cart-item__price {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: $text-primary;
}

.cart-item__remove {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
}
</style>

