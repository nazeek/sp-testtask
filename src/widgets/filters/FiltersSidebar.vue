<template>
  <aside :class="['filters-sidebar', { 'is-opened': isOpen }]">
    <div class="filters-sidebar__header">
      <h2 class="filters-sidebar__title">Фильтры</h2>
      <div class="filters-sidebar__header-actions">
        <button class="filters-sidebar__reset" @click="handleReset">
          Сбросить ×
        </button>
        <button v-if="isOpen" class="filters-sidebar__close" @click="handleClose">
          ×
        </button>
      </div>
    </div>
    <div class="filters-sidebar__content">
      <FilterPrice />
      <FilterRarity :filters="filters" @update:filters="$emit('update:filters', $event)" />
      <FilterProperties :filters="filters" @update:filters="$emit('update:filters', $event)" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { FiltersState } from '~/shared/types/filters';
import FilterPrice from '~/widgets/filters/FilterPrice.vue';
import FilterRarity from '~/widgets/filters/FilterRarity.vue';
import FilterProperties from '~/widgets/filters/FilterProperties.vue';
import { useFiltersToggle } from '~/features/filters-toggle/useFiltersToggle';

interface Props {
  filters: FiltersState;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:filters': [filters: FiltersState];
  reset: [];
}>();

const { isOpen, close } = useFiltersToggle();

const handleReset = () => {
  emit('reset');
};

const handleClose = () => {
  close();
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.filters-sidebar {
  width: 280px;
  background: $bg-primary;
  border-right: 1px solid $border-color;
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
  overflow-y: auto;
  padding: $spacing-lg 0;

  @include tablet {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 100vh;
    z-index: $z-modal;
    transform: translateX(-100%);
    transition: transform $transition-base;

    &.is-opened {
      transform: translateX(0);
    }
  }

  @include mobile {
    width: 100%;
  }
}

.filters-sidebar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-lg;
  padding: 0 $spacing-lg $spacing-md $spacing-lg;
  border-bottom: 1px solid $border-color;
}

.filters-sidebar__header-actions {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.filters-sidebar__title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: $text-primary;
}

.filters-sidebar__reset {
  background: none;
  border: none;
  color: $button-text-default;
  font-size: 16px;
  cursor: pointer;
  padding: $spacing-xs $spacing-sm;

  &:hover {
    color: $text-primary;
  }
}

.filters-sidebar__close {
  background: none;
  border: none;
  color: $text-secondary;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: $spacing-xs;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius;
  transition: background $transition-fast;

  &:hover {
    background: $bg-tertiary;
    color: $text-primary;
  }
}

.filters-sidebar__content {
  display: flex;
  flex-direction: column;
  padding: 0 $spacing-lg;
}
</style>

