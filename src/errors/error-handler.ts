import { FastifyReply, FastifyRequest } from 'fastify'
import { handleApplicationError } from './error-maping'
import { env } from 'process'

export function errorHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const result = handleApplicationError(error, reply)
  if (result) return result

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: error.message })
}
