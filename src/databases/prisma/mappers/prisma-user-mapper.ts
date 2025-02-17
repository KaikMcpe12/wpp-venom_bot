import { Contact as IContact, Preference as IPreference } from '@prisma/client';
import { Contact } from '../../../entities/contact/contact';

interface RawPreference extends Omit<IPreference, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {}

interface RawContact extends IContact {
  preference: RawPreference[];
}

export class PrismaContactMapper {
  static toPrisma(contact: Contact): RawContact {
    return {
      id: contact.id,
      name: contact.name,
      phonenumber: contact.phonenumber,
      botstatus: contact.botstatus,
      updatedAt: contact.updatedAt,
      createdAt: contact.createdAt,
      preference: contact.preferences.map(preference => ({
        preferences: preference,
      })),
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
        preferences: raw.preference.map(preference => preference.preferences),
      },
      raw.id,
    );
  }
}
