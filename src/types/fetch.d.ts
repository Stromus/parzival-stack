import { InfiniteData } from 'react-query'

export type ApiError = {
  'hydra:title': string
  'hydra:description': string
  '@type': string
  violations: {
    propertyPath: string
    message: string
  }[]
}

export type PagninatedQuery<T = unknown> = {
  'hydra:member': T[]
  'hydra:totalItems': number
}

export type MutationContext<T> = {
  previousData?: T[]
  previousDatas?: InfiniteData<PagninatedQuery<T>>
}
