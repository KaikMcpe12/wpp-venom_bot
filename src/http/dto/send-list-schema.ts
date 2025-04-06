import z from 'zod'
import { Replace } from '../../helpers/Replace'

export const sendListSchema = z.object({
  numberPhone: z.string(),
  title: z.string(),
  subTitle: z.string(),
  description: z.string(),
  menuName: z.string(),
  list: z.array(
    z.object({
      title: z.string(),
      rows: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
  ),
})

export type ISendList = Replace<
  z.infer<typeof sendListSchema>,
  { numberPhone: string }
>
