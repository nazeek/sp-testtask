<template>
  <div class="items-sort">
    <select
      :value="sort"
      @change="handleChange"
      class="items-sort__select"
    >
      <option value="popularity">Популярность</option>
      <option value="price">Цена</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { SortType } from '~/shared/config/enums';

interface Props {
  sort: SortType;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:sort': [sort: SortType];
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:sort', target.value as SortType);
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.items-sort__select {
  padding: $spacing-sm $spacing-md;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  background: $bg-primary;
  font-size: 16px;
  cursor: pointer;
  color: $text-secondary;

  &:focus {
    outline: none;
  }
}
</style>

