import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../repositories/contactRepository'

export default class EnableContact {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(contact: Contact): Promise<void> {
    contact.turnonbot()

    await this.contactRepository.save(contact)
  }
}
