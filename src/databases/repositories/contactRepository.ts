import { Contact } from '../../entities/contact/contact'

export abstract class ContactRepository {
  abstract findById(contactId: string): Promise<Contact | null>
  abstract findByPhoneNumber(phone: string): Promise<Contact | null>
  abstract listAll(): Promise<Contact[]>
  abstract create(contact: Contact): Promise<Contact>
  abstract save(contact: Contact): Promise<void>
}
