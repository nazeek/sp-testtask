<template>
  <span v-if="count > 0" class="cart-badge">
    {{ count }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  count: number;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: $bg-primary;
  box-shadow: $shadow-md;
  color: $text-primary;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
