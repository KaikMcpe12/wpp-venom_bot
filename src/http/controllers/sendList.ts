import { FastifyReply, FastifyRequest } from 'fastify'
import { ISendList } from '../dto/send-list-schema'
import { makeSendListUseCase } from '../../use-cases/factories/make-send-list-use-case'

export async function sendList(
  request: FastifyRequest<{ Body: ISendList }>,
  reply: FastifyReply,
) {
  const { phoneNumber, title, subTitle, description, menuName, list } =
    request.body

  const sendList = makeSendListUseCase()

  await sendList.execute({
    phoneNumber,
    title,
    subTitle,
    description,
    menuName,
    list,
  })

  reply.status(200).send({ message: 'Message send' })
}
