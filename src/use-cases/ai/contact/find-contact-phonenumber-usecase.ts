import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../repositories/contactRepository'

export class FindContactByPhoneNumber {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(phoneNumber: string): Promise<Contact | null> {
    const contact = await this.contactRepository.findByPhoneNumber(phoneNumber)

    return contact
  }
}
