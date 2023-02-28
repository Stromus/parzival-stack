import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { t } from 'i18next'
import { InfiniteData, QueryClient } from 'react-query'

import { ApiError, MutationContext, PagninatedQuery } from '@Type/fetch'

interface IData {
  id?: string
}

export const onMutateDefault =
  <T extends IData>(queryClient: QueryClient, key: string) =>
  async (newValue: T) => {
    await queryClient.cancelQueries({ queryKey: [key] })

    const previousData = queryClient.getQueryData<T[]>([key])

    if (previousData) {
      queryClient.setQueryData<T[]>([key], () => {
        return newValue.id
          ? previousData.map(item =>
              item.id === newValue.id ? newValue : item
            )
          : [...previousData, newValue]
      })
    }

    return { previousData }
  }

export const onMutateInfniteDefault =
  <T extends IData>(queryClient: QueryClient, key: string) =>
  async (newValue: T) => {
    await queryClient.cancelQueries({ queryKey: [key] })

    const previousDatas = queryClient.getQueriesData<
      InfiniteData<PagninatedQuery<T>>
    >([key])[0][1]

    if (previousDatas) {
      queryClient.setQueryData<InfiniteData<PagninatedQuery<T>>>([key], () => {
        const newData = newValue.id
          ? previousDatas.pages.map(page => ({
              ...page,
              'hydra:member': page['hydra:member'].map(item =>
                item.id === newValue.id ? newValue : item
              ),
            }))
          : [
              ...previousDatas.pages.slice(0, -1),
              {
                ...(previousDatas.pages[-1] ?? previousDatas.pages[0]),
                'hydra:member': [
                  ...(previousDatas.pages[-1] ?? previousDatas.pages[0])[
                    'hydra:member'
                  ],
                  newValue,
                ],
              },
            ]
        return {
          ...previousDatas,
          pages: newData,
        }
      })
    }

    return { previousDatas }
  }

export const onErrorDefault =
  <T extends IData>(queryClient: QueryClient, key: string) =>
  (err: AxiosError<ApiError>, variables: T, context?: MutationContext<T>) => {
    if (context?.previousData) {
      queryClient.setQueryData<T[]>([key], context.previousData)
    }
    enqueueSnackbar(t('common:error.mutation'), {
      variant: 'error',
    })
  }

export const onErrorInfniteDefault =
  <T extends IData>(queryClient: QueryClient, key: string) =>
  (err: AxiosError<ApiError>, variables: T, context?: MutationContext<T>) => {
    if (context?.previousDatas) {
      queryClient.setQueriesData<InfiniteData<PagninatedQuery<T>>>(
        [key],
        context.previousDatas
      )
    }
    enqueueSnackbar(t('common:error.mutation'), {
      variant: 'error',
    })
  }

export const onSettledDefault =
  (queryClient: QueryClient, key: string) => () => {
    queryClient.invalidateQueries({ queryKey: [key] })
  }
