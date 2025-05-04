import { ContactRepository } from '../../databases/repositories/contactRepository'
import { ContextRepository } from '../../databases/repositories/context-repository'
import { sanitizePhoneNumber } from '../../utils/sanitizePhoneNumber'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ClearContextRequest {
  phoneNumber: string
}

export class ClearContext {
  constructor(
    private contextRepository: ContextRepository,
    private contactRepository: ContactRepository,
  ) {}

  public async execute({ phoneNumber }: ClearContextRequest): Promise<boolean> {
    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber)

    const contact =
      await this.contactRepository.findByPhoneNumber(sanitizedPhoneNumber)

    if (!contact) throw new ResourceNotFoundError()

    return this.contextRepository.clearContext(phoneNumber)
  }
}
