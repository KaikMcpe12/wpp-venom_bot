import { Contact } from '../../../entities/contact/contact'
import { ContactRepository } from '../../../repositories/contactRepository'

interface ResponseDisableContact {
  sucess: boolean
  botstatus: boolean
}

export default class DisableContact {
  constructor(private contactRepository: ContactRepository) {}

  public async execute(contact: Contact): Promise<ResponseDisableContact> {
    contact.turnoffbot()

    await this.contactRepository.save(contact)

    return { sucess: true, botstatus: false }
  }
}
