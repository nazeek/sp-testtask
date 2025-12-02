import { ref, computed, watchEffect } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { FiltersState } from '~/shared/types/filters';
import type { ItemsFilter, FilterType } from '~/shared/types/item';
import { initialFiltersState } from '~/shared/config/filters';
import { FILTER_DEBOUNCE_MS, AVAILABLE_ITEM_TYPES } from '~/shared/config/constants';
import { ItemType, Property } from '~/shared/config/enums';

function transformFiltersToAPI(filters: FiltersState): ItemsFilter {
  const { types, rarities, properties } = filters;

  const defaultTypes = [...AVAILABLE_ITEM_TYPES];
  const selectedTypes = types.length > 0 ? types : defaultTypes;
  
  const filterTypes: FilterType[] = selectedTypes.map((type) => {
    const filterType: FilterType = { type };

    if (rarities.length > 0) {
      filterType.rarities = rarities;
    }

    if (type === ItemType.PET) {
      const levels = properties.filter(
        (p) => p === Property.DEFAULT || p === Property.NEON || p === Property.MEGA_NEON
      );
      const specialProperties = properties.filter(
        (p) => p === Property.FLYABLE || p === Property.RIDEABLE
      );

      if (levels.length > 0) {
        filterType.levels = levels;
      }

      if (specialProperties.length > 0) {
        filterType.properties = {
          missing: true, // как в ТЗ, хотя на сайте здесь уходит false
          flyable: specialProperties.includes(Property.FLYABLE),
          rideable: specialProperties.includes(Property.RIDEABLE),
        };
      }
    }

    return filterType;
  });

  return {
    types: filterTypes,
  };
}

export function useFilters() {
  const filters = ref<FiltersState>({ ...initialFiltersState });
  const debouncedFilters = ref<FiltersState>({ ...initialFiltersState });

  const updateDebouncedFilters = useDebounceFn(
    (newFilters: FiltersState) => {
      debouncedFilters.value = { ...newFilters };
    },
    FILTER_DEBOUNCE_MS
  );

  debouncedFilters.value = { ...filters.value };

  watchEffect(() => {
    updateDebouncedFilters(filters.value);
  });

  const apiFilter = computed(() => transformFiltersToAPI(debouncedFilters.value));

  const resetFilters = () => {
    filters.value = { ...initialFiltersState };
  };

  return {
    filters,
    debouncedFilters,
    apiFilter,
    resetFilters,
  };
}

