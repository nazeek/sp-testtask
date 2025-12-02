<template>
  <div class="filter-properties">
    <h3 class="filter-properties__title">Свойства</h3>
    <div class="filter-properties__list">
      <Checkbox
        v-for="property in properties"
        :key="property.value"
        :model-value="isSelected(property.value)"
        @update:model-value="toggleProperty(property.value)"
      >
        {{ property.label }}
      </Checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Property } from '~/shared/config/enums';
import { PROPERTY_CONFIG } from '~/shared/config/filters';
import type { FiltersState } from '~/shared/types/filters';
import Checkbox from '~/shared/ui/Checkbox/Checkbox.vue';
import { toggleArrayItem } from '~/shared/lib/helpers/filters';

interface Props {
  filters: FiltersState;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filters': [filters: FiltersState];
}>();

const properties = computed(() => {
  return Object.entries(PROPERTY_CONFIG).map(([value, config]) => ({
    value: value as Property,
    ...config,
  }));
});

const isSelected = (property: Property) => {
  return props.filters.properties.includes(property);
};

const toggleProperty = (property: Property) => {
  const newProperties = toggleArrayItem(props.filters.properties, property);

  emit('update:filters', {
    ...props.filters,
    properties: newProperties,
  });
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.filter-properties {
  margin-bottom: $spacing-lg;
}

.filter-properties__title {
  margin: 0 0 $spacing-md 0;
  font-size: 1rem;
  font-weight: 600;
  color: $text-primary;
}

.filter-properties__list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}
</style>

