import { FastifyReply, FastifyRequest } from 'fastify'
import { wppVenom } from '../../lib/wpp-venom'
import { makeGetAllContactUseCase } from '../../use-cases/factories/make-get-all-contact-use-case'

export async function getAllContacts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    if (!wppVenom.client) {
      throw new Error('WPP Venom is not initialized')
    }

    const getAllContacts = makeGetAllContactUseCase()

    const contacts = await getAllContacts.execute()

    reply.status(200).send({ contacts })
  } catch (err: Error | any) {
    reply.status(400).send({ error: err.message })
  }
}
