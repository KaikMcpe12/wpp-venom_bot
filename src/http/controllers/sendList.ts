import { FastifyReply, FastifyRequest } from 'fastify'
import { ISendList } from '../dto/send-list-schema'
import { makeSendListUseCase } from '../../use-cases/factories/make-send-list-use-case'

export async function sendList(
  request: FastifyRequest<{ Body: ISendList }>,
  reply: FastifyReply,
) {
  const { numberPhone, title, subTitle, description, menuName, list } =
    request.body

  const sendList = makeSendListUseCase()

  const result = await sendList.execute({
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
