import { z } from 'zod'
import { nonEmptyString, nonEmptyOptionalString } from './schema'

export const loginSchema = z.object({
  username: nonEmptyString(),
  password: nonEmptyString(),
})

export type LoginData = {
  id?: string
  username: string
  password: string
}
