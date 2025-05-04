import {
  ContextRepository,
  IContext,
} from '../../src/databases/repositories/context-repository'

export class InMemoryContextRepository implements ContextRepository {
  private store: Record<string, IContext> = {}

  async getContext(phoneNumber: string) {
    return this.store[phoneNumber] || { history: [], metadata: {} }
  }

  saveContext(phoneNumber: string, context: IContext): Promise<void> {
    return new Promise((resolve) => {
      this.store[phoneNumber] = context
      resolve()
    })
  }

  async clearContext(phoneNumber: string) {
    delete this.store[phoneNumber]
    return true
  }
}
