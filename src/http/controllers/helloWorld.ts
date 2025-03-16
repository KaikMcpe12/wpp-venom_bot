import { FastifyReply, FastifyRequest } from 'fastify'

export async function helloWorld(req: FastifyRequest, reply: FastifyReply) {
  reply.status(201).send({ message: 'Hello World' })
}
