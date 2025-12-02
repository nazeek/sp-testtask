import type { ItemType, Rarity, Property, SortType } from '~/shared/config/enums';

export interface FiltersState {
  types: ItemType[];
  rarities: Rarity[];
  properties: Property[];
  priceMin: number | null;
  priceMax: number | null;
  sort: SortType;
  sortDirection: 'asc' | 'desc';
}

