import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../databases/repositories/contactRepository'

export class ListContacts {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(): Promise<Contact[] | []> {
    return await this.contactRepository.listAll()
  }
}
