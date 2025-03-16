import { FastifyReply, FastifyRequest } from 'fastify'
import { sendButtonController } from '../use-cases/venom-bot/sendButtonController'
import { ISendButton } from '../http/dto/send-button-schema'

export async function sendButton(
  request: FastifyRequest<{ Body: ISendButton }>,
  reply: FastifyReply,
) {
  const { numberPhone, title, description, buttons } = request.body

  const result = await sendButtonController({
    numberPhone,
    title,
    description,
    buttons,
  })

  if (!result) {
    reply.status(400).send('Message not sent')
  }

  reply.status(200).send({ message: 'Message send' })
}
