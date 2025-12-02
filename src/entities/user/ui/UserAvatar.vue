<template>
  <div class="user-avatar">
    <img :src="avatar" alt="" class="user-avatar__image" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  avatar: string;
  name: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.user-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;

  &:after {
    content: '';
    width: 54px;
    height: 54px;
    border: 2px solid $button-primary;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
  }
}

.user-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

