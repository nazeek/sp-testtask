<template>
  <div class="filter-types">
    <button
      v-for="type in types"
      :key="type.value"
      :class="['filter-types__button', { 'filter-types__button--active': isSelected(type.value) }]"
      @click="toggleType(type.value)"
    >
      {{ type.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ItemType } from '~/shared/config/enums';
import { AVAILABLE_ITEM_TYPES } from '~/shared/config/constants';
import { ITEM_TYPE_CONFIG } from '~/shared/config/filters';
import { toggleArrayItem } from '~/shared/lib/helpers/filters';

interface Props {
  types: ItemType[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:types': [types: ItemType[]];
}>();

const availableTypes = AVAILABLE_ITEM_TYPES;

const types = computed(() => {
  return Object.entries(ITEM_TYPE_CONFIG).map(([value, config]) => ({
    value: value as ItemType,
    ...config,
  }));
});

const hasAllTypes = () => {
  return availableTypes.every(type => props.types.includes(type));
};

const isSelected = (type: ItemType) => {
  return props.types.includes(type) && !hasAllTypes();
};

const toggleType = (type: ItemType) => {
  if (props.types.length === 0 || hasAllTypes()) {
    emit('update:types', [type]);
    return;
  }

  const newTypes = toggleArrayItem(props.types, type);
  
  if (availableTypes.every(t => newTypes.includes(t))) {
    emit('update:types', []);
    return;
  }

  emit('update:types', newTypes);
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.filter-types {
  display: flex;
  gap: $spacing-sm;
}

.filter-types__button {
  padding: $spacing-sm $spacing-md;
  background: $bg-primary;
  border: 2px solid $border-color;
  border-radius: $border-radius;
  font-size: 1rem;
  font-weight: 500;
  color: $text-secondary;
  cursor: pointer;
  transition: all $transition-fast;

  &--active {
    color: $text-primary;
    border: 2px solid $border-active;
  }
}
</style>
