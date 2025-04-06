import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetAllContactUseCase } from '../../use-cases/factories/make-get-all-contact-use-case'

export async function getAllContacts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllContacts = makeGetAllContactUseCase()

  const contacts = await getAllContacts.execute()

  reply.status(200).send({ contacts })
}
