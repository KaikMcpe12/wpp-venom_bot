import { PrismaContactRepository } from '../../databases/prisma/respositories/prisma-contact-respository'
import { prismaClient } from '../../lib/prisma'
import EnableContact from '../../use-cases/ai/contact/enable-contact-usecase'
import { FindContactByPhoneNumber } from '../../use-cases/ai/contact/find-contact-phonenumber-usecase'

export async function enableContactTool(phonenumber: string): Promise<void> {
  const prismaRepository = new PrismaContactRepository(prismaClient)
  const findPhonenumber = new FindContactByPhoneNumber(prismaRepository)

  const contact = await findPhonenumber.execute(phonenumber)

  const disableContact = new EnableContact(prismaRepository)
  await disableContact.execute(contact)
}
