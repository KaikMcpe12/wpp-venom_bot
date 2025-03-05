import { PrismaContactRepository } from '../../databases/prisma/respositories/prisma-contact-respository'
import { prismaClient } from '../../lib/prisma'
import CreateContact from '../../use-cases/ai/contact/create-contact-usecase'
import { generateUserContextService } from '../../services/generate-user-context-service'
import {
  AiContactMapper,
  IRawContact,
} from '../../ai/mappers/ai-contact-mapper'
import { aiClient } from '../../server'

interface IRequestUser {
  name: string
  phonenumber: string
}

export async function createContactController(
  requestUser: IRequestUser,
): Promise<IRawContact> {
  const prisma = new PrismaContactRepository(prismaClient)

  const createContact = new CreateContact(prisma)

  const contact = await createContact.execute(requestUser)

  await generateUserContextService(aiClient, prisma)

  return AiContactMapper.toRaw(contact)
}
