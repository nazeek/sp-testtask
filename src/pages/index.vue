<template>
  <div class="marketplace">
    <Header />
    <div class="marketplace__content">
      <FiltersSidebar
        :filters="filters"
        @update:filters="updateFilters"
        @reset="resetFilters"
      />
      <ItemsList :filters="debouncedFilters" :api-filter="apiFilter" @update:filters="updateFilters" />
    </div>
    <CartModal
      :is-open="cartStore.isOpen"
      :items="cartStore.items"
      :total="cartStore.total"
      :is-empty="cartStore.isEmpty"
      :items-count="cartStore.itemsCount"
      :currency="userStore.currency || 'usd'"
      :purchase-error="purchaseError"
      :is-purchasing="isPurchasing"
      @close="cartStore.closeCart"
      @remove-item="cartStore.removeItem"
      @clear-cart="cartStore.clearCart"
      @purchase="handlePurchase"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFilters } from '~/features/filter-items/useFilters';
import { useFiltersToggle } from '~/features/filters-toggle/useFiltersToggle';
import { useCartStore } from '~/entities/cart/model/store';
import { useUserStore } from '~/entities/user/model/store';
import { usePurchase } from '~/features/purchase/usePurchase';
import Header from '~/widgets/header/Header.vue';
import FiltersSidebar from '~/widgets/filters/FiltersSidebar.vue';
import ItemsList from '~/widgets/items-list/ItemsList.vue';
import CartModal from '~/widgets/cart/CartModal.vue';

const { filters, debouncedFilters, apiFilter, resetFilters } = useFilters();
useFiltersToggle();
const cartStore = useCartStore();
const userStore = useUserStore();
const { purchase } = usePurchase();

const purchaseError = ref<string | null>(null);
const isPurchasing = ref(false);

const updateFilters = (newFilters: typeof filters.value) => {
  filters.value = { ...newFilters };
};

const handlePurchase = async () => {
  isPurchasing.value = true;
  purchaseError.value = null;
  
  const result = await purchase();
  
  if (!result.success) {
    purchaseError.value = result.error || 'Ошибка при покупке';
  }
  
  isPurchasing.value = false;
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.marketplace {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.marketplace__content {
  flex: 1;
  display: flex;
  gap: $spacing-lg;
  padding: 0 0 $spacing-lg 0;
  margin: 0 auto;
  width: 100%;
}
</style>

