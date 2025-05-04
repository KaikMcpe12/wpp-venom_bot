import { FastifyReply, FastifyRequest } from 'fastify'
import { TerminateSession } from '../../wpp/venom-bot/terminate-session'
import { WppFactory } from '../../wpp/factories/wpp-factory'

export async function terminateSession(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const venomClient = WppFactory.getVenomClient()
  const terminateSession = new TerminateSession(venomClient)

  await terminateSession.execute()

  reply.status(200).send()
}
