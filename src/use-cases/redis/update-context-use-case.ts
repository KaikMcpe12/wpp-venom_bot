import { ContextRepository } from '../../databases/repositories/context-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateContextRequest {
  userId: string
  message: string
  response: string
  metadata?: object
}

export class UpdateContext {
  constructor(private contextRepository: ContextRepository) {}

  public async execute({
    userId,
    message,
    response,
    metadata = {},
  }: UpdateContextRequest): Promise<boolean> {
    const context = await this.contextRepository.getContext(userId)

    if (!context || context.history.length === 0) {
      throw new ResourceNotFoundError()
    }

    return this.contextRepository.updateContext(
      userId,
      message,
      response,
      metadata,
    )
  }
}
