import { PrismaClient } from "@prisma/client";
import { ContactRepository } from "../../../repositories/contactRepository";
import { PrismaContactMapper } from "../mappers/prisma-user-mapper";
import { Contact } from "../../../entities/contact/contact";

export class PrismaContactRepository implements ContactRepository {
    constructor(private prisma: PrismaClient) {}

    async findById(contactId: string): Promise<Contact | null> {
        const contact = await this.prisma.contact.findUnique({
            where: {
                id: contactId
            }
        });

        if (!contact) {
            return null;
        }

        return PrismaContactMapper.toDomain(contact);
    }

    async findByPhoneNumber(phone: string): Promise<Contact | null> {
        const contact = await this.prisma.contact.findUnique({
            where: {
                phonenumber: phone
            }
        });

        if (!contact) {
            return null;
        }

        return PrismaContactMapper.toDomain(contact);
    }

    async listAll(): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany();

        return contacts.map(PrismaContactMapper.toDomain);
    }

    async create(contact: Contact): Promise<Contact> {
        const raw = PrismaContactMapper.toPrisma(contact);

        const response = await this.prisma.contact.create({
            data: raw
        });

        return PrismaContactMapper.toDomain(response);
    }

    async save(contact: Contact): Promise<void> {
        const raw = PrismaContactMapper.toPrisma(contact);

        await this.prisma.contact.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }
}