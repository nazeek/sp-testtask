<template>
  <NuxtLink to="/" class="header-logo">
    <MainLogo />
  </NuxtLink>
</template>

<script setup lang="ts">
import MainLogo from '~/shared/icons/MainLogo.vue';

</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.header-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: $text-primary;
  text-decoration: none;

  

  svg {
    width: 201px;
    display: block;

    @include mobile {
      width: 120px;
    }
  }
}
</style>

