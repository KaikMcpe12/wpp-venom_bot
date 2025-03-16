import z from 'zod'

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

export type ISendList = z.infer<typeof sendListSchema>
