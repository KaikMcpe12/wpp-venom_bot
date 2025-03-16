import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../databases/repositories/contactRepository'

export default class ListContacts {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(): Promise<Contact[] | []> {
    const contacts = await this.contactRepository.listAll()

    return contacts
  }
}
