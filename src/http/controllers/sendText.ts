import { FastifyReply, FastifyRequest } from 'fastify'
import { ISendText } from '../dto/send-text-schem'
import { makeSendTextUseCase } from '../../use-cases/factories/make-send-text-use-case'

export async function sendText(
  request: FastifyRequest<{ Body: ISendText }>,
  reply: FastifyReply,
) {
  const { phoneNumber, message } = request.body

  const sendText = makeSendTextUseCase()

  await sendText.execute({
    phoneNumber,
    message,
  })

  reply.status(200).send({ message: 'Message send' })
}
