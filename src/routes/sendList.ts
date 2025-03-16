import { FastifyReply, FastifyRequest } from 'fastify'
import { sendListController } from '../use-cases/venom-bot/sendListController'
import { ISendList } from '../http/dto/send-list-schema'

export async function sendList(
  request: FastifyRequest<{ Body: ISendList }>,
  reply: FastifyReply,
) {
  const { numberPhone, title, subTitle, description, menuName, list } =
    request.body

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
}
