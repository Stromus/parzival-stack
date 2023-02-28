import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from 'react-query'
import type {
  MRT_ColumnFiltersState,
  MRT_SortingState,
} from 'material-react-table'

import { User } from '@Type/users'
import { PagninatedQuery } from '@Type/fetch'
import axios from '@Middleware/axios'

import { fetchDefaultInfiniteQuery } from './default'

export function useQueryGetUsers(
  columnFilters?: MRT_ColumnFiltersState,
  sorting?: MRT_SortingState
) {
  return useInfiniteQuery(
    ['users', columnFilters, sorting],
    fetchDefaultInfiniteQuery<User>(
      'https://jsonplaceholder.typicode.com/users',
      columnFilters,
      sorting
    ),
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      keepPreviousData: true,
    }
  )
}

export function useQueryGetOneUser(id?: User['id']) {
  const queryClient = useQueryClient()
  return useQuery(
    ['users', id],
    async () => {
      if (!id) {
        return undefined
      }
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      )
      return response.data as User
    },
    {
      initialData: () => {
        const element = queryClient
          .getQueryData<InfiniteData<PagninatedQuery<User>>>(['users'])
          ?.pages.find(
            page => page['hydra:member'].find(d => d.id === id) !== undefined
          )
        return element ? element['hydra:member'][0] : undefined
      },
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(['contacts'])?.dataUpdatedAt,
    }
  )
}
