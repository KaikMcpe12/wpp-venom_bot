import { ContextRepository } from '../../databases/repositories/context-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface AddUserMessageRequest {
  userId: string
  message: string
}

export class AddUserMessage {
  constructor(private contextRepository: ContextRepository) {}

  public async execute({ userId, message }: AddUserMessageRequest) {
    const context = await this.contextRepository.getContext(userId)

    if (!context || context.history.length === 0) {
      throw new ResourceNotFoundError()
    }

    return this.contextRepository.addUserMessage(userId, message)
  }
}
