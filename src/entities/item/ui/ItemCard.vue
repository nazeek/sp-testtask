<template>
  <Card class="item-card" hover @click="$emit('click')">
    <div class="item-card__image-wrapper">
      <ItemRarity class="item-card__rarity" :rare="item.rare" />
      <ItemImage :src="item.imageUri" :alt="item.name" />
      <ItemBadges class="item-card__badges" :properties="itemProperties" />
    </div>
    <div class="item-card__content">
      <p class="item-card__age">{{ item.age }}</p>
      <h3 class="item-card__name">{{ item.name }}</h3>
      <p class="item-card__price">{{ formattedPrice }}</p>
    </div>
  </Card>
</template>


<script setup lang="ts">
import Card from '~/shared/ui/Card/Card.vue';
import ItemImage from './ItemImage.vue';
import ItemBadges from './ItemBadges.vue';
import ItemRarity from './ItemRarity.vue';
import type { Item } from '~/shared/types/item';
import { formatPrice } from '~/shared/lib/utils/formatters';
import { getItemProperties } from '~/shared/lib/helpers/itemProperties';
import { DEFAULT_CURRENCY } from '~/shared/config/constants';

interface Props {
  item: Item;
  currency?: string;
}

const props = withDefaults(defineProps<Props>(), {
  currency: DEFAULT_CURRENCY,
});

const itemProperties = computed(() => getItemProperties(props.item));
const formattedPrice = computed(() => {
  return formatPrice(props.item.price, props.currency);
});

defineEmits<{
  click: [];
}>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.item-card {
  cursor: pointer;
  overflow: hidden;
}

.item-card__image-wrapper {
  position: relative;
}

.item-card__rarity {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.item-card__badges {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  z-index: 10;
}

.item-card__content {
  padding: $spacing-md;
  position: relative;
}

.item-card__name {
  margin: 0 0 $spacing-xs 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: $text-primary;
  @include text-ellipsis;
}

.item-card__price {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: $text-primary;
}
</style>

