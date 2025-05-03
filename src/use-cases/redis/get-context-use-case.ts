import { ContextRepository } from '../../databases/repositories/context-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetContextRequest {
  userId: string
}

export class GetContext {
  constructor(private contextRepository: ContextRepository) {}

  public async execute({ userId }: GetContextRequest) {
    const context = await this.contextRepository.getContext(userId)

    if (!context) {
      throw new ResourceNotFoundError()
    }

    return context
  }
}
