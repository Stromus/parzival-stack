import { useMutation, useQueryClient } from 'react-query'

import { LoginData } from '@Type/login'
import { ApiError, MutationContext } from '@Type/fetch'
import axios, { AxiosError } from '@Middleware/axios'

import {
  onErrorInfniteDefault,
  onMutateInfniteDefault,
  onSettledDefault,
} from './default'

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation<
    LoginData,
    AxiosError<ApiError>,
    LoginData,
    MutationContext<LoginData>
  >(
    ['login'],
    (loginData: LoginData) =>
      axios.post('https://jsonplaceholder.typicode.com/users', loginData),
    {
      onMutate: onMutateInfniteDefault(queryClient, 'users'),
      onError: onErrorInfniteDefault(queryClient, 'users'),
      onSettled: onSettledDefault(queryClient, 'users'),
    }
  )
}
