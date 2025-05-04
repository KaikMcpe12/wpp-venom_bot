import { ContactRepository } from '../../databases/repositories/contactRepository'
import { ContextRepository } from '../../databases/repositories/context-repository'
import { sanitizePhoneNumber } from '../../utils/sanitizePhoneNumber'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface AddUserMessageRequest {
  phoneNumber: string
  message: string
}

export class AddUserMessage {
  constructor(
    private contextRepository: ContextRepository,
    private contactRepository: ContactRepository,
  ) {}

  public async execute({ phoneNumber, message }: AddUserMessageRequest) {
    const sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber)

    const contact =
      await this.contactRepository.findByPhoneNumber(sanitizedPhoneNumber)

    if (!contact) throw new ResourceNotFoundError()

    const context = await this.contextRepository.getContext(phoneNumber)

    context.history.push({
      role: 'user',
      content: message,
      timestamp: Date.now(),
    })

    await this.contextRepository.saveContext(phoneNumber, context)

    return context
  }
}
