import { FastifyReply, FastifyRequest } from 'fastify'
import { ISendButton } from '../dto/send-button-schema'
import { makeSendButtonUseCase } from '../../use-cases/factories/make-send-button-use-case'

export async function sendButton(
  request: FastifyRequest<{ Body: ISendButton }>,
  reply: FastifyReply,
) {
  const { phoneNumber, title, description, buttons } = request.body

  const sendButton = makeSendButtonUseCase()

  await sendButton.execute({
    phoneNumber,
    title,
    description,
    buttons,
  })

  reply.status(200).send({ message: 'Message send' })
}
