import { IGetAllContacts } from '../../http/dto/get-all-contact-schema'
import { WppRepository } from '../../wpp/repositories/wpp-repository'

export class GetAllContacts {
  constructor(private wpp: WppRepository) {}

  async execute(): Promise<IGetAllContacts[]> {
    const result = await this.wpp.getAllContacts()

    if (!result) {
      throw new Error('Contacts not found')
    }

    return result
  }
}
