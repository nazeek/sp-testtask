<template>
  <div class="items-grid">
    <ItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :currency="currency"
      @click="$emit('item-click', item)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Item } from '~/shared/types/item';
import ItemCard from '~/entities/item/ui/ItemCard.vue';
import { DEFAULT_CURRENCY } from '~/shared/config/constants';

interface Props {
  items: Item[];
  currency?: string;
}

withDefaults(defineProps<Props>(), {
  currency: DEFAULT_CURRENCY,
});

defineEmits<{
  'item-click': [item: Item];
}>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.items-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(7, 1fr);

  @include desktop-xl {
    grid-template-columns: repeat(7, 1fr);
  }

  @include desktop {
    grid-template-columns: repeat(6, 1fr);
  }

  @include tablet {
    grid-template-columns: repeat(4, 1fr);
  }

  @include mobile {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>

