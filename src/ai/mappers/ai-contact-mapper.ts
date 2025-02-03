import { Contact as RawContact } from '@prisma/client';
import { Contact } from '../../entities/contact/contact';
import { Replace } from '../../helpers/Replace';

export interface IRawContact extends Replace<RawContact, { id?: string, updatedAt?: Date, createdAt?: Date, botstatus?: boolean } > {}

export class AiContactMapper {
  static toRaw(contact: Contact): IRawContact{
    return {
      name: contact.name,
      phonenumber: contact.phonenumber,
      botstatus: contact.botstatus,
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
