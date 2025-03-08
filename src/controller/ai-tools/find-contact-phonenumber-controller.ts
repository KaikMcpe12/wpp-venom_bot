import { AiContactMapper, RawContact } from '../../ai/mappers/ai-contact-mapper'
import { PrismaContactRepository } from '../../databases/prisma/respositories/prisma-contact-respository'
import { prismaClient } from '../../lib/prisma'
import { FindContactByPhoneNumber } from '../../use-cases/ai/contact/find-contact-phonenumber-usecase'

export async function findContactByPhonenumberController(
  phonenumber: string,
): Promise<RawContact | null> {
  const prisma = new PrismaContactRepository(prismaClient)
  const findContact = new FindContactByPhoneNumber(prisma)

  const contact = await findContact.execute(phonenumber)

  return contact && AiContactMapper.toRaw(contact)
}
