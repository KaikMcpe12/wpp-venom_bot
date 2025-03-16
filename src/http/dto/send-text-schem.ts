import z from 'zod'

export const sendTextSchema = z.object({
  numberPhone: z.number(),
  message: z.string(),
})

export type ISendText = z.infer<typeof sendTextSchema>
