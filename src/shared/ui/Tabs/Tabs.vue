<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="['tabs-item', { 'tabs-item--active': modelValue === tab.value }]"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  label: string;
  value: string;
}

interface Props {
  tabs: Tab[];
  modelValue: string;
}

defineProps<Props>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.tabs {
  display: flex;
  gap: $spacing-sm;
  border-bottom: 2px solid $border-color;
}

.tabs-item {
  padding: $spacing-md $spacing-lg;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 16px;
  color: $text-secondary;
  transition: all $transition-fast;
  margin-bottom: -2px;

  &:hover {
    color: $text-primary;
  }

  &--active {
    color: $text-primary;
    border-bottom-color: $color-primary;
    font-weight: 600;
  }
}
</style>

