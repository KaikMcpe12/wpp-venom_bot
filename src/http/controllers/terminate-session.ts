import { FastifyReply, FastifyRequest } from 'fastify'
import { TerminateSession } from '../../use-cases/venom-bot/terminate-session'
import { wppVenom } from '../../lib/wpp-venom'

export async function terminateSession(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const terminateSession = new TerminateSession(wppVenom)

  await terminateSession.execute()

  reply.status(200).send()
}
