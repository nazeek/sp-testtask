<template>
  <div class="items-list">
    <ItemsListHeader
      :types="filters.types"
      :sort="filters.sort"
      @update:filters="handleFiltersUpdate"
    />

    <div v-if="isLoading && !items.length" class="items-list__skeletons">
      <SkeletonCard v-for="i in SKELETON_CARDS_COUNT" :key="i" />
    </div>

    <div v-else-if="errorMessage" class="items-list__error">
      <ErrorMessage :message="errorMessage" variant="block" />
    </div>

    <div v-else-if="items.length === 0" class="items-list__empty">
      <p>Предметы не найдены</p>
    </div>

    <div v-else class="items-list__content">
      <ItemsGrid :items="items" :currency="currency" @item-click="handleItemClick" />
      <div v-if="isFetchingNextPage" class="items-list__skeletons">
        <SkeletonCard v-for="i in SKELETON_CARDS_COUNT" :key="`skeleton-${i}`" />
      </div>
      <div ref="loadMoreRef" class="items-list__load-more" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useInfiniteItems } from '~/features/infinite-scroll/useInfiniteItems';
import { useScrollDetector } from '~/features/infinite-scroll/useScrollDetector';
import { useAddToCart } from '~/features/add-to-cart/useAddToCart';
import { useUserStore } from '~/entities/user/model/store';
import type { FiltersState } from '~/shared/types/filters';
import type { Item } from '~/shared/types/item';
import ItemsGrid from '~/widgets/items-list/ItemsGrid.vue';
import ItemsListHeader from '~/widgets/items-list/ItemsListHeader.vue';
import SkeletonCard from '~/shared/ui/SkeletonCard/SkeletonCard.vue';
import ErrorMessage from '~/shared/ui/ErrorMessage/ErrorMessage.vue';
import { SKELETON_CARDS_COUNT, DEFAULT_CURRENCY } from '~/shared/config/constants';

import type { ItemsFilter } from '~/shared/types/item';

interface Props {
  filters: FiltersState;
  apiFilter: ItemsFilter;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filters': [filters: FiltersState];
}>();

const filtersRef = computed(() => props.filters);
const apiFilterRef = computed(() => props.apiFilter);

const { items, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteItems(
  filtersRef,
  apiFilterRef
);

const userStore = useUserStore();
const { addToCart } = useAddToCart();

const currency = computed(() => userStore.currency || DEFAULT_CURRENCY);

const errorMessage = computed(() => {
  if (error.value) {
    return error.value instanceof Error ? error.value.message : 'Ошибка загрузки данных';
  }
  return null;
});

const loadMoreRef = ref<HTMLElement>();

useScrollDetector(loadMoreRef, () => {
  if (hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage();
  }
});

const handleFiltersUpdate = (partialFilters: Partial<FiltersState>) => {
  emit('update:filters', {
    ...props.filters,
    ...partialFilters,
  });
};

const handleItemClick = (item: Item) => {
  addToCart(item);
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;
@use '@/app/styles/mixins' as *;

.items-list {
  flex: 1;
  padding-right: $spacing-lg;

  @include tablet {
    padding: 0 $spacing-md;
  }
}


.items-list__skeletons {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(7, 1fr);

  @include desktop-xl {
    grid-template-columns: repeat(7, 1fr);
  }

  @include desktop {
    grid-template-columns: repeat(6, 1fr);
  }

  @include tablet {
    grid-template-columns: repeat(4, 1fr);
  }

  @include mobile {
    grid-template-columns: repeat(2, 1fr);
  }
}

.items-list__error,
.items-list__empty {
  padding: $spacing-2xl;
  text-align: center;
  color: $text-secondary;
}

.items-list__content {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.items-list__load-more {
  height: 20px;
  margin-top: $spacing-lg;
}
</style>

