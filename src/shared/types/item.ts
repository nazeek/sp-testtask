import type { ItemType, Rarity, Property } from '~/shared/config/enums';

export interface Item {
  id: number;
  goodId: string;
  name: string;
  type: ItemType;
  realName: string;
  imageId: string;
  imageUri: string;
  subtype: string | null;
  age: string | null;
  rare: Rarity;
  pumping: boolean | null;
  flyable: boolean | null;
  rideable: boolean | null;
  price: number | null;
  avgPrice: number;
}

export interface ItemsRequestParams {
  filter: ItemsFilter;
  page: number;
  amount: number;
  currency: string;
  sort: Record<string, string>;
}

export interface ItemsFilter {
  types: FilterType[];
}

export interface FilterType {
  type: ItemType;
  rarities?: Rarity[];
  levels?: Property[];
  properties?: {
    missing: boolean;
    flyable?: boolean;
    rideable?: boolean;
  };
}

export interface ItemsResponse {
  items: Item[];
  total: number;
  page: number;
  hasMore: boolean;
}

