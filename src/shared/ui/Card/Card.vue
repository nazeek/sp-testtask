<template>
  <div :class="['card', { 'card--hover': hover }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean;
}

withDefaults(defineProps<Props>(), {
  hover: false,
});
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.card {
  background: $bg-primary;
  border-radius: $border-radius;
  box-shadow: $shadow-sm;
  transition: all $transition-base;

  &--hover {
    cursor: pointer;

    &:hover {
      box-shadow: $shadow-md;
      transform: translateY(-1px);
    }
  }
}
</style>

