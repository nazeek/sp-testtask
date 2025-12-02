import type { FiltersState } from '~/shared/types/filters';
import { SortType, Rarity, Property, ItemType } from '~/shared/config/enums';
import { AVAILABLE_ITEM_TYPES } from '~/shared/config/constants';

export const initialFiltersState: FiltersState = {
  types: [],
  rarities: [],
  properties: [],
  priceMin: null,
  priceMax: null,
  sort: SortType.POPULARITY,
  sortDirection: 'desc',
};

export const RARITY_CONFIG = {
  [Rarity.COMMON]: { label: 'Обычная', color: '#3b82f6' },
  [Rarity.UNCOMMON]: { label: 'Необычная', color: '#a855f7' },
  [Rarity.RARE]: { label: 'Редкая', color: '#10b981' },
  [Rarity.ULTRA_RARE]: { label: 'Очень редкая', color: '#ef4444' },
  [Rarity.LEGENDARY]: { label: 'Легендарная', color: '#1f2937' },
} as const;

export const PROPERTY_CONFIG = {
  [Property.DEFAULT]: { label: 'Обычные' },
  [Property.NEON]: { label: 'Neon' },
  [Property.MEGA_NEON]: { label: 'Mega Neon' },
  [Property.FLYABLE]: { label: 'Flyable' },
  [Property.RIDEABLE]: { label: 'Rideable' },
} as const;

export const ITEM_TYPE_CONFIG = {
  [ItemType.EGG]: { label: 'Яйцо' },
  [ItemType.PET]: { label: 'Питомец' },
  [ItemType.POTION]: { label: 'Зелье' },
} as const;
