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

  try {
    await sendList.execute({
      numberPhone,
      title,
      subTitle,
      description,
      menuName,
      list,
    })
  } catch (err: Error | any) {
    reply.status(400).send({ error: err.message })
  }

  reply.status(200).send({ message: 'Message send' })
}
