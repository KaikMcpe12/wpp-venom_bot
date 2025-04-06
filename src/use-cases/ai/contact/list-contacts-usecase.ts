import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../databases/repositories/contactRepository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

export class ListContacts {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(): Promise<Contact[]> {
    const contacts = await this.contactRepository.listAll()

    if (!contacts) {
      throw new ResourceNotFoundError()
    }

    return contacts
  }
}
