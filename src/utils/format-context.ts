import {
  IContext,
  IContextRespondeFormat,
} from '../databases/repositories/context-repository'

export function formatContext(context: IContext): IContextRespondeFormat[] {
  return context.history.map((item: any) => ({
    role: item.role === 'user' ? 'user' : 'assistant',
    content: item.content,
  }))
}
