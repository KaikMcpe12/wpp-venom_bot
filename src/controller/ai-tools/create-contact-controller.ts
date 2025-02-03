import { PrismaContactRepository } from "../../databases/prisma/respositories/prisma-user-respository";
import { prismaClient } from "../../lib/prisma";
import CreateContact from "../../use-cases/ai/create-contact-usecase";
import { generateContextService } from "../../services/generate-context-service";
import { AiContactMapper, IRawContact } from "../../ai/mappers/ai-contact-mapper";

interface IRequestUser {
    name: string;
    phonenumber: string;
}

export async function createContactController(requestUser: IRequestUser): Promise<IRawContact> {
    const prisma = new PrismaContactRepository(prismaClient)

    const createContact = new CreateContact(prisma)

    const contact = await createContact.execute(requestUser)

    await generateContextService()

    return AiContactMapper.toRaw(contact)
}