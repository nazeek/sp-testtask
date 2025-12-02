<template>
  <header class="header">
    <div class="header__container">
      <div class="header__left">
        <HeaderLogo class="header__logo" />
        <HeaderNav class="header__nav" />
      </div>
      <div class="header__right">
        <HeaderUser />
        <HeaderCartPreview />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import HeaderLogo from '~/widgets/header/HeaderLogo.vue';
import HeaderNav from '~/widgets/header/HeaderNav.vue';
import HeaderCartPreview from '~/widgets/header/HeaderCartPreview.vue';
import HeaderUser from '~/widgets/header/HeaderUser.vue';
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.header {
  position: sticky;
  top: 0;
  z-index: $z-header;
  background: $bg-primary;
  height: 82px;
}

.header__container {
  margin: 0 auto;
  padding: 0 $spacing-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-xl;
  height: 100%;

  @include tablet {
    padding: 0 $spacing-md;
  }
}

.header__left {
  display: flex;
  align-items: center;
  gap: 76px;

  @include desktop {
    gap: $spacing-xl;
  }

  @include tablet {
    gap: $spacing-md;
  }
}

.header__logo {
  flex-shrink: 0;
  

  @include desktop {
    order: 1;
  }
}

.header__nav {

  @include desktop {
    order: 0;
  }
}

.header__right {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  order: 2;
}
</style>

