import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../databases/repositories/contactRepository'
import { ContactAlredyExistsError } from '../../errors/contact-alredy-exists-error'

interface IRequestUser {
  name: string
  phonenumber: string
}

export default class CreateContact {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(requestUser: IRequestUser): Promise<Contact> {
    const { name, phonenumber } = requestUser

    const existingContact =
      await this.contactRepository.findByPhoneNumber(phonenumber)

    if (existingContact) throw new ContactAlredyExistsError()

    const contact = new Contact({
      name,
      phonenumber,
    })

    const response = await this.contactRepository.create(contact)

    if (!response) throw new Error('Failed to create contact')

    return response
  }
}
