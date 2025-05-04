import { IGetAllContacts } from '../../http/dto/get-all-contact-schema'
import { WppRepository } from '../repositories/wpp-repository'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'

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
