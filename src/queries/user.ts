import { useQuery } from 'react-query'
import { z } from 'zod'

const userShema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
  })
)

export function useQueryGetUsers() {
  return useQuery('users', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const jsonData = await response.json()
    return userShema.parse(jsonData)
  })
}
