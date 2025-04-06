import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../databases/repositories/contactRepository'
import { sanitizePhoneNumber } from '../../../utils/sanitizePhoneNumber'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

export class FindContactByPhoneNumber {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(phoneNumber: string): Promise<Contact> {
    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber)

    const contact =
      await this.contactRepository.findByPhoneNumber(sanitizedPhoneNumber)

    if (!contact) throw new ResourceNotFoundError()

    return contact
  }
}
