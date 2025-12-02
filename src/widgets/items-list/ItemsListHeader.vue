<template>
  <div class="items-list-header">
    <div class="items-list-header__types">
      <FilterTypes :types="types" @update:types="handleTypesUpdate" />
    </div>
    <div class="items-list-header__controls">
      <FiltersToggle />
      <ItemsSearch />
      <ItemsSort :sort="sort" @update:sort="handleSortUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SortType } from '~/shared/config/enums';
import type { FiltersState } from '~/shared/types/filters';
import type { ItemType } from '~/shared/config/enums';
import ItemsSearch from '~/widgets/items-list/ItemsSearch.vue';
import ItemsSort from '~/widgets/items-list/ItemsSort.vue';
import FilterTypes from '~/widgets/filters/FilterTypes.vue';
import FiltersToggle from '~/widgets/filters/FiltersToggle.vue';

interface Props {
  types: ItemType[];
  sort: SortType;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filters': [filters: Partial<FiltersState>];
}>();

const handleTypesUpdate = (types: ItemType[]) => {
  emit('update:filters', { types });
};

const handleSortUpdate = (sort: SortType) => {
  emit('update:filters', { sort });
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.items-list-header {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}

.items-list-header__types {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: $spacing-lg;
}

.items-list-header__controls {
  display: flex;
  gap: $spacing-md;
  align-items: center;
}
</style>
