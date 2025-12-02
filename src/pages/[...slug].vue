<template>
  <div class="mock-page">
    <Header />
    <div class="mock-page__content">
      <p>Это страница</p>
      <h1>{{ pageTitle }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '~/features/load-user/useUser';
import Header from '~/widgets/header/Header.vue';

await useUser();

const route = useRoute();

const pageTitle = computed(() => {
  const slug = route.params.slug as string[];
  if (Array.isArray(slug) && slug.length > 0) {
    return slug[slug.length - 1];
  }
  return 'Страница';
});
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.mock-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.mock-page__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-2xl;
  text-align: center;
}
</style>

