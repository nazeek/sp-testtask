<template>
  <div class="filter-price">
    <h3 class="filter-price__title">Цена</h3>
    <div class="filter-price__inputs">
      <Input
        v-model="priceMin"
        type="text"
        placeholder="$ 0.00"
        class="filter-price__input"
        name="price-min"
        variant="no-border"
      />
      <span class="filter-price__separator">-</span>
      <Input
        v-model="priceMax"
        type="text"
        placeholder="$ ∞"
        class="filter-price__input"
        name="price-max"
        variant="no-border"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Input from '~/shared/ui/Input/Input.vue';

const priceMin = ref<number | null>(null);
const priceMax = ref<number | null>(null);
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.filter-price {
  margin-bottom: $spacing-lg;
}

.filter-price__title {
  margin: 0 0 $spacing-md 0;
  font-size: 1rem;
  font-weight: 600;
  color: $text-primary;
}

.filter-price__inputs {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.filter-price__input {
  flex: 1;
}

.filter-price__separator {
  color: $text-secondary;
}
</style>

