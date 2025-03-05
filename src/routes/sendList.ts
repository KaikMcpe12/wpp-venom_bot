import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { ISendList } from '../interface/messageInterface'
import { sendListController } from '../controller/sendListController'

export function sendList(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post<{ Body: ISendList }>(
    '/wpp/sendlist',
    {
      schema: {
        body: z.object({
          numberPhone: z.coerce.number(),
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
        }),
      },
    },
    async (req, reply) => {
      const { numberPhone, title, subTitle, description, menuName, list } =
        req.body

      const result = await sendListController({
        numberPhone,
        title,
        subTitle,
        description,
        menuName,
        list,
      })

      if (!result) {
        reply.status(400).send('Message not sent')
      }

      reply.status(200).send({ message: 'Message send' })
    },
  )
}
