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
  abstract getContext(phoneNumber: string): Promise<IContext>
  abstract saveContext(phoneNumber: string, context: IContext): Promise<void>
  abstract clearContext(phoneNumber: string): Promise<boolean>
}
