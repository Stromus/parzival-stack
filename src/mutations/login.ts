import { useMutation, useQueryClient } from 'react-query'

type LoginData = {
  username: string
  password: string
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (loginData: LoginData) =>
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      }),
    {
      onError: err => console.error(err),
      onSettled: () => queryClient.invalidateQueries('users'),
    }
  )
}
