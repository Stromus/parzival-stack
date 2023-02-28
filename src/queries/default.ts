import type {
  MRT_ColumnFiltersState,
  MRT_SortingState,
} from 'material-react-table'

import axios from '@Middleware/axios'
import { PagninatedQuery } from '@Type/fetch'

export const fetchDefaultInfiniteQuery =
  <T>(
    route: string,
    columnFilters?: MRT_ColumnFiltersState,
    sorting?: MRT_SortingState,
    filterMapping: { [key: string]: string } = {},
    sortMapping: { [key: string]: string[] } = {}
  ) =>
  async ({ pageParam = 0 }) => {
    const response = await axios.get(route, {
      params: {
        page: pageParam + 1,
        ...Object.fromEntries(
          columnFilters?.map(({ id, value }) => [
            filterMapping[id] ?? id,
            value,
          ]) ?? []
        ),
        ...Object.fromEntries(
          sorting?.flatMap(({ id, desc }) =>
            (sortMapping[id] ?? [id]).map(key => [
              `order[${key}]`,
              desc ? 'desc' : 'asc',
            ])
          ) ?? []
        ),
      },
    })
    return response.data as PagninatedQuery<T>
  }
