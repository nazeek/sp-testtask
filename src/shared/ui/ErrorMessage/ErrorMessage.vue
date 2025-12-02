<template>
  <div v-if="message" :class="['error-message', `error-message--${variant}`]">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string | null;
  variant?: 'inline' | 'block';
}

withDefaults(defineProps<Props>(), {
  variant: 'inline',
});
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.error-message {
  color: $color-error;
  font-size: 14px;

  &--inline {
    display: inline;
  }

  &--block {
    display: block;
    padding: $spacing-sm;
    background: rgba($color-error, 0.1);
    border-radius: $border-radius;
    margin-top: $spacing-sm;
  }
}
</style>

