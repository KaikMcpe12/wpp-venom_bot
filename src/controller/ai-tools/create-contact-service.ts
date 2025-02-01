import { PrismaContactRepository } from "../../databases/prisma/respositories/prisma-user-respository";
import { prismaClient } from "../../lib/prisma";
import createContact from "../../use-cases/ai/create-contact-usecase";

interface IRequestUser {
    name: string;
    phonenumber: string;
}

export function createContactController(requestUser: IRequestUser): void {
    const prisma = new PrismaContactRepository(prismaClient)

    createContact(requestUser, prisma)
}