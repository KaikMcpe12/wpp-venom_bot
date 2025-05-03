import { ContextRepository } from '../../databases/repositories/context-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ClearContextRequest {
  userId: string
}

export class ClearContext {
  constructor(private contextRepository: ContextRepository) {}

  public async execute({ userId }: ClearContextRequest): Promise<boolean> {
    const context = await this.contextRepository.getContext(userId)

    if (!context || context.history.length === 0) {
      throw new ResourceNotFoundError()
    }

    return this.contextRepository.clearContext(userId)
  }
}
