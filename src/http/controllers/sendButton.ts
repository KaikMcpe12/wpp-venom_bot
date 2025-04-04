import { FastifyReply, FastifyRequest } from 'fastify'
import { ISendButton } from '../dto/send-button-schema'
import { makeSendButtonUseCase } from '../../use-cases/factories/make-send-button-use-case'

export async function sendButton(
  request: FastifyRequest<{ Body: ISendButton }>,
  reply: FastifyReply,
) {
  const { numberPhone, title, description, buttons } = request.body

  const sendButton = makeSendButtonUseCase()

  try {
    await sendButton.execute({
      numberPhone,
      title,
      description,
      buttons,
    })
  } catch (err: Error | any) {
    reply.status(400).send({ error: err.message })
  }

  reply.status(200).send({ message: 'Message send' })
}
