import {
  AiContactMapper,
  IRawContact,
} from '../../ai/mappers/ai-contact-mapper'
import { PrismaContactRepository } from '../../databases/prisma/respositories/prisma-contact-respository'
import { prismaClient } from '../../lib/prisma'
import ListContacts from '../../use-cases/ai/contact/list-contacts-usecase'

export async function listContactsController(): Promise<IRawContact[]> {
  const prisma = new PrismaContactRepository(prismaClient)
  const contacts = new ListContacts(prisma)

  const rawContacts = (await contacts.execute()).map((contact) =>
    AiContactMapper.toRaw(contact),
  )

  return rawContacts
}
