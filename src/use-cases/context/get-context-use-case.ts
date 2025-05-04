import { ContactRepository } from '../../databases/repositories/contactRepository'
import { ContextRepository } from '../../databases/repositories/context-repository'
import { sanitizePhoneNumber } from '../../utils/sanitizePhoneNumber'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetContextRequest {
  phoneNumber: string
}

export class GetContext {
  constructor(
    private contextRepository: ContextRepository,
    private contactRepository: ContactRepository,
  ) {}

  public async execute({ phoneNumber }: GetContextRequest) {
    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber)

    const contact =
      await this.contactRepository.findByPhoneNumber(sanitizedPhoneNumber)

    if (!contact) throw new ResourceNotFoundError()

    const context = await this.contextRepository.getContext(phoneNumber)

    return context
  }
}
