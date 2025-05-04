import { ContactRepository } from '../../databases/repositories/contactRepository'
import { ContextRepository } from '../../databases/repositories/context-repository'
import { sanitizePhoneNumber } from '../../utils/sanitizePhoneNumber'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateContextRequest {
  phoneNumber: string
  message: string
  response: string
  metadata?: object
}

export class UpdateContext {
  constructor(
    private contextRepository: ContextRepository,
    private contactRepository: ContactRepository,
  ) {}

  public async execute({
    phoneNumber,
    message,
    response,
    metadata = {},
  }: UpdateContextRequest): Promise<boolean> {
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

    context.history.push({
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
    })

    if (context.history.length > 30) {
      context.history = context.history.slice(-30)
    }

    context.metadata = { ...context.metadata, ...metadata }

    await this.contextRepository.saveContext(phoneNumber, context)

    return true
  }
}
