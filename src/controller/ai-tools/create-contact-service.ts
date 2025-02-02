import { PrismaContactRepository } from "../../databases/prisma/respositories/prisma-user-respository";
import { Contact as RawContact } from '@prisma/client';
import { prismaClient } from "../../lib/prisma";
import CreateContact from "../../use-cases/ai/create-contact-usecase";
import { PrismaContactMapper } from "../../databases/prisma/mappers/prisma-user-mapper";
import { generateContextService } from "../../services/generate-context-service";

interface IRequestUser {
    name: string;
    phonenumber: string;
}

export async function createContactController(requestUser: IRequestUser): Promise<RawContact> {
    const prisma = new PrismaContactRepository(prismaClient)

    const createContact = new CreateContact(prisma)

    const contact = await createContact.execute(requestUser)

    await generateContextService()

    return PrismaContactMapper.toPrisma(contact)
}