<template>
  <div class="filter-rarity">
    <h3 class="filter-rarity__title">Редкость</h3>
    <div class="filter-rarity__swatches">
      <button
        v-for="rarity in rarities"
        :key="rarity.value"
        :class="['filter-rarity__swatch', { 'filter-rarity__swatch--active': isSelected(rarity.value) }]"
        :style="{ backgroundColor: rarity.color }"
        @click="toggleRarity(rarity.value)"
        :aria-label="rarity.label"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Rarity } from '~/shared/config/enums';
import { RARITY_CONFIG } from '~/shared/config/filters';
import type { FiltersState } from '~/shared/types/filters';
import { toggleArrayItem } from '~/shared/lib/helpers/filters';

interface Props {
  filters: FiltersState;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filters': [filters: FiltersState];
}>();

const rarities = computed(() => {
  return Object.entries(RARITY_CONFIG).map(([value, config]) => ({
    value: value as Rarity,
    ...config,
  }));
});

const isSelected = (rarity: Rarity) => {
  return props.filters.rarities.includes(rarity);
};

const toggleRarity = (rarity: Rarity) => {
  const newRarities = toggleArrayItem(props.filters.rarities, rarity);

  emit('update:filters', {
    ...props.filters,
    rarities: newRarities,
  });
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.filter-rarity {
  margin-bottom: $spacing-lg;
}

.filter-rarity__title {
  margin: 0 0 $spacing-md 0;
  font-size: 1rem;
  font-weight: 600;
  color: $text-primary;
}

.filter-rarity__swatches {
  display: flex;
  gap: $spacing-sm;
}

.filter-rarity__swatch {
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    transform: scale(1.1);
  }

  &--active {
    border-color: $text-primary;
    box-shadow: $shadow-md;
  }
}
</style>

