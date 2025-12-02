import { computed, toValue, type MaybeRef } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { fetchItems } from '~/shared/lib/api/items';
import type { FiltersState } from '~/shared/types/filters';
import type { ItemsFilter } from '~/shared/types/item';
import { ITEMS_PER_PAGE, DEFAULT_CURRENCY } from '~/shared/config/constants';
import { SortDirection } from '~/shared/config/enums';

export function useInfiniteItems(
  filters: MaybeRef<FiltersState>,
  apiFilter: MaybeRef<ItemsFilter>
) {
  const filtersValue = computed(() => toValue(filters));
  const apiFilterValue = computed(() => toValue(apiFilter));
  
  const queryKey = computed(() => {
    const currentFilters = filtersValue.value;
    return [
      'items',
      JSON.stringify({
        types: [...currentFilters.types].sort(),
        rarities: [...currentFilters.rarities].sort(),
        properties: [...currentFilters.properties].sort(),
        sort: currentFilters.sort,
        sortDirection: currentFilters.sortDirection,
      }),
    ];
  });

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      const currentFilters = filtersValue.value;
      const sort: Record<string, string> = {
        [currentFilters.sort]: currentFilters.sortDirection || SortDirection.DESC,
      };

      return fetchItems({
        filter: apiFilterValue.value,
        page: pageParam,
        amount: ITEMS_PER_PAGE,
        currency: DEFAULT_CURRENCY,
        sort,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const items = computed(() => {
    return query.data.value?.pages.flatMap((page) => page.items) || [];
  });

  return {
    ...query,
    items,
  };
}

