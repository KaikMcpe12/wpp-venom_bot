import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../databases/repositories/contactRepository'
import { sanitizePhoneNumber } from '../../../utils/sanitizePhoneNumber'

export class FindContactByPhoneNumber {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(phoneNumber: string): Promise<Contact> {
    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber)

    const contact =
      await this.contactRepository.findByPhoneNumber(sanitizedPhoneNumber)

    if (!contact) throw new Error('Contact not found')

    return contact
  }
}
