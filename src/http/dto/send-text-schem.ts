import z from 'zod'
import { Replace } from '../../helpers/Replace'

export const sendTextSchema = z.object({
  numberPhone: z.coerce.number(),
  message: z.string(),
})

export type ISendText = Replace<
  z.infer<typeof sendTextSchema>,
  { numberPhone: string }
>
