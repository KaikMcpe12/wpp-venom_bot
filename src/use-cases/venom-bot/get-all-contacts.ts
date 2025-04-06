import { IGetAllContacts } from '../../http/dto/get-all-contact-schema'
import { WppRepository } from '../../wpp/repositories/wpp-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetAllContacts {
  constructor(private wpp: WppRepository) {}

  async execute(): Promise<IGetAllContacts[]> {
    const result = await this.wpp.getAllContacts()

    if (!result) {
      throw new ResourceNotFoundError()
    }

    return result
  }
}
