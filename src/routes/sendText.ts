import { FastifyReply, FastifyRequest } from 'fastify'
import { sendTextController } from '../use-cases/venom-bot/sendTextController'
import { ISendText } from '../http/dto/send-text-schem'

export async function sendText(
  request: FastifyRequest<{ Body: ISendText }>,
  reply: FastifyReply,
) {
  const { numberPhone, message } = request.body

  const result = await sendTextController(numberPhone, message)

  if (!result) {
    reply.status(400).send('Message not sent')
  }

  reply.status(200).send({ message: 'Message send' })
}
