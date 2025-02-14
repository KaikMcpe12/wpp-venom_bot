import { PrismaContactRepository } from "../../databases/prisma/respositories/prisma-user-respository";
import { prismaClient } from "../../lib/prisma";
import DisableContact from "../../use-cases/ai/disable-contact-usecase";
import { FindContactByPhoneNumber } from "../../use-cases/ai/find-contact-phonenumber-usecase";

export async function disableContactController(phonenumber: string): Promise<void> {
    const prismaRepository = new PrismaContactRepository(prismaClient);
    const findPhonenumber = new FindContactByPhoneNumber(prismaRepository);

    const contact = await findPhonenumber.execute(phonenumber);

    if(!contact){
        throw new Error("Contact not found");
    }

    const disableContact = new DisableContact(prismaRepository);
    await disableContact.execute(contact);
}