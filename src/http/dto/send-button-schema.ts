import z from 'zod'
import { Replace } from '../../helpers/Replace'

export const sendButtonSchema = z.object({
  phoneNumber: z.string().min(10, 'Número de telefone inválido'),
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

export type ISendButton = Replace<
  z.infer<typeof sendButtonSchema>,
  { phoneNumber: string }
>
