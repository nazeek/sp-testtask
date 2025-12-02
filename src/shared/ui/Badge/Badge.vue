<template>
  <span :class="['badge', `badge--${variant}`, `badge--${size}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
});
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  line-height: 1;

  &--sm {
    padding: 2px 6px;
    font-size: 0.75rem;
  }

  &--md {
    padding: 4px 8px;
    font-size: 0.875rem;
  }

  &--default {
    background: $bg-tertiary;
    color: $text-primary;
  }

  &--primary {
    background: $color-primary;
    color: white;
  }

  &--success {
    background: $color-success;
    color: white;
  }

  &--warning {
    background: $color-warning;
    color: white;
  }

  &--error {
    background: $color-error;
    color: white;
  }
}
</style>

