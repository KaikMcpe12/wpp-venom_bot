import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { sendTextController } from '../controller/sendTextController'

export function sendText(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post<{ Body: { numberPhone: number; message: string } }>(
      '/wpp/sendtext',
      {
        schema: {
          body: z.object({
            numberPhone: z.number(),
            message: z.string(),
          }),
        },
      },
      async (req, reply) => {
        const { numberPhone, message } = req.body

        const result = await sendTextController(numberPhone, message)

        if (!result) {
          reply.status(400).send('Message not sent')
        }

        reply.status(200).send({ message: 'Message send' })
      },
    )
}
