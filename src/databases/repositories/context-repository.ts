export interface IContext {
  history: {
    role: string
    content: string
    timestamp: number
  }[]
  metadata: object
}

export interface IContextRespondeFormat {
  role: string
  content: string
}

export abstract class ContextRepository {
  abstract getContext(userId: string): Promise<IContext>
  abstract addUserMessage(userId: string, message: string): Promise<string>
  abstract updateContext(
    userId: string,
    message: string,
    response: string,
    metadata: object,
  ): Promise<boolean>

  abstract clearContext(userId: string): Promise<boolean>
  abstract close(): Promise<void>
}
