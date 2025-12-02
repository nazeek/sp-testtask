<template>
  <button
    :class="['button', `button--${variant}`, `button--${size}`, { 'button--disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use 'sass:color';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: $border-radius;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-fast;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--icon {
    padding: $spacing-sm;
    font-size: 20px;
    width: 42px;
    height: 42px;
    vertical-align: middle;
  }

  &--sm {
    padding: $spacing-sm $spacing-md;
    font-size: 14px;
  }

  &--md {
    padding: $spacing-md $spacing-lg;
    font-size: 16px;
  }

  &--lg {
    padding: $spacing-lg $spacing-xl;
    font-size: 18px;
  }

  &--primary {
    background-color: $button-primary;
    color: white;

    &:hover:not(:disabled) {
      background-color: color.adjust($button-primary, $lightness: +10%);
    } 
  }

  &--secondary {
    background-color: $bg-tertiary;
    color: $text-primary;

    &:hover:not(:disabled) {
      background-color: color.adjust($bg-tertiary, $lightness: +5%);
    }
  }

  &--danger {
    background-color: $color-error;
    color: white;

    &:hover:not(:disabled) {
      background-color: color.adjust($color-error, $lightness: +10%);
    }
  }

  &--ghost {
    background-color: transparent;
    color: $text-primary;

    &:hover:not(:disabled) {
      background-color: $bg-tertiary;
    }
  }
}
</style>

