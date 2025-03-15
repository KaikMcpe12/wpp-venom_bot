import { PrismaContactRepository } from '../../databases/prisma/respositories/prisma-contact-respository'
import { prismaClient } from '../../lib/prisma'
import CreateContact from '../../use-cases/ai/contact/create-contact-usecase'
import { AiContactMapper, RawContact } from '../../ai/mappers/ai-contact-mapper'

interface IRequestUser {
  name: string
  phonenumber: string
}

export async function createContactController(
  requestUser: IRequestUser,
): Promise<RawContact> {
  const prisma = new PrismaContactRepository(prismaClient)

  const createContact = new CreateContact(prisma)

  const contact = await createContact.execute(requestUser)

  return AiContactMapper.toRaw(contact)
}
