<template>
  <button class="filters-toggle" @click="open">
    <FiltersIcon />
  </button>
</template>

<script setup lang="ts">
import FiltersIcon from '~/shared/icons/Filters.vue';
import { useFiltersToggle } from '~/features/filters-toggle/useFiltersToggle';

const { open } = useFiltersToggle();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.filters-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @include tablet {
    width: 46px;
    height: 46px;
    background: $bg-primary;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
