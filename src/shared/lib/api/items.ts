import { apiClient } from '~/shared/lib/api/client';
import { API_ENDPOINTS } from '~/shared/config/api';
import type { ItemsRequestParams, ItemsResponse } from '~/shared/types/item';
import { DEFAULT_CURRENCY, ITEMS_PER_PAGE } from '~/shared/config/constants';
import { SortDirection } from '~/shared/config/enums';


export async function fetchItems(
  params: Partial<ItemsRequestParams> = {}
): Promise<ItemsResponse> {
  const {
    filter,
    page = 1,
    amount = ITEMS_PER_PAGE,
    currency = DEFAULT_CURRENCY,
    sort = {},
  } = params;

  const requestParams: ItemsRequestParams = {
    filter: filter!,
    page,
    amount,
    currency,
    sort: Object.keys(sort).length > 0 
      ? sort 
      : { popularity: SortDirection.DESC },
  };

  const response = await apiClient.post<{
    items: ItemsResponse['items'];
    count: number;
    status: boolean;
    currency: string;
    _source: number;
  }>(
    API_ENDPOINTS.ITEMS_ALL,
    requestParams
  );

  const items = response.items || [];
  const total = response.count || 0;
  
  const hasMore = total > 0
    ? (page * amount) < total
    : items.length >= amount;

  return {
    items,
    total,
    page,
    hasMore,
  };
}

