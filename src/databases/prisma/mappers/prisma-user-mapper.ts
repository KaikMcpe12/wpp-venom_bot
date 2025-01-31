import { Contact as RawContact } from '@prisma/client';
import { Contact } from '../../../entities/user/user';

export class PrismaNotificationMapper {
  static toPrisma(contact: Contact): RawContact {
    return {
      id: contact.id,
      name: contact.name,
      phonenumber: contact.phonenumber,
      botstatus: contact.botstatus,
      updatedAt: contact.updatedAt,
      createdAt: contact.createdAt,
    };
  }

  static toDomain(raw: RawContact): Contact {
    return new Contact(
      {
        name: raw.name,
        phonenumber: raw.phonenumber,
        botstatus: raw.botstatus,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
