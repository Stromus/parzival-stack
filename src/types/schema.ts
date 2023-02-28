import { ZodTypeAny, z } from 'zod'

export const nonEmptyString = (type: ZodTypeAny = z.string()) => {
  return z.preprocess(e => (e === '' ? undefined : e), type)
}

export const nonEmptyOptionalString = () =>
  nonEmptyString(z.string().optional())
