import { Contact as IContact, Preference as IPreference } from '@prisma/client'
import { Contact } from '../../../entities/contact/contact'
import { Replace } from '../../../helpers/Replace'

type RawPreference = Replace<
  IPreference,
  { id?: string; contactId?: string; updatedAt?: Date; createdAt?: Date }
>

interface RawContact extends IContact {
  preference?: RawPreference[]
}

export class PrismaContactMapper {
  static toPrisma(contact: Contact): IContact {
    return {
      id: contact.id,
      name: contact.name,
      phonenumber: contact.phonenumber,
      botstatus: contact.botstatus,
      updatedAt: contact.updatedAt,
      createdAt: contact.createdAt,
    }
  }

  static toDomain(raw: RawContact): Contact {
    return new Contact(
      {
        name: raw.name,
        phonenumber: raw.phonenumber,
        botstatus: raw.botstatus,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
        preferences:
          raw.preference &&
          raw.preference.map((preference) => preference.preferences),
      },
      raw.id,
    )
  }
}
