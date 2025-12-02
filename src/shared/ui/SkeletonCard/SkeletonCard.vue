<template>
  <div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-line skeleton-line--title"></div>
      <div class="skeleton-line skeleton-line--price"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/animations' as *;

.skeleton-card {
  background: $bg-primary;
  border-radius: $border-radius;
  overflow: hidden;
  box-shadow: $shadow-sm;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 1;
  background: $bg-tertiary;
  @extend .pulse;
}

.skeleton-content {
  padding: $spacing-md;
}

.skeleton-line {
  height: 16px;
  background: $bg-tertiary;
  border-radius: 4px;
  margin-bottom: $spacing-sm;
  @extend .pulse;

  &--title {
    width: 70%;
  }

  &--price {
    width: 40%;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>

