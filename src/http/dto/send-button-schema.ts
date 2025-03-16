import z from 'zod'

export const sendButtonSchema = z.object({
  numberPhone: z.string().min(10, 'Número de telefone inválido'),
  title: z.string(),
  description: z.string(),
  buttons: z.array(
    z.object({
      buttonText: z.object({
        displayText: z.string(),
      }),
    }),
  ),
})

export type ISendButton = z.infer<typeof sendButtonSchema>
