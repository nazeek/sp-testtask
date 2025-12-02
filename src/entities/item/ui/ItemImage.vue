<template>
  <div class="item-image">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="item-image__img"
    />
    <div v-else class="item-image__placeholder">
      <span>No Image</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string;
  alt: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.item-image {
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  background: $bg-tertiary;
}

.item-image__img {
  width: 50%;
  height: 50%;
  object-fit: cover;
  margin: 25%;
}

.item-image__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-tertiary;
  font-size: 0.875rem;
}
</style>

