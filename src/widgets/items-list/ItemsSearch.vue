<template>
  <div class="items-search">
    <Input
      v-model="searchQuery"
      placeholder="Быстрый поиск"
      class="items-search__input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Input from '~/shared/ui/Input/Input.vue';

const searchQuery = ref('');
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.items-search {
  flex: 1;
  max-width: 300px;
}

.items-search__input {
  width: 100%;
}
</style>

