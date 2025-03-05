import { Contact as IContact } from '@prisma/client'
import { Contact } from '../../entities/contact/contact'
import { Replace } from '../../helpers/Replace'

type IRawContact = Replace<
  IContact,
  { id?: string; updatedAt?: Date; createdAt?: Date; botstatus?: boolean }
>

export interface RawContact extends IRawContact {
  preference: string[] | undefined
}

export class AiContactMapper {
  static toRaw(contact: Contact): RawContact {
    return {
      name: contact.name,
      phonenumber: contact.phonenumber,
      botstatus: contact.botstatus,
      preference: contact.preferences,
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
      },
      raw.id,
    )
  }
}
