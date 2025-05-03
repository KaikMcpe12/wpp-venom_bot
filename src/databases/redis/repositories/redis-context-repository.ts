import { RedisClientType } from 'redis'
import { ContextRepository } from '../../repositories/context-repository'

export class RedisContextRepository implements ContextRepository {
  private redisClient: RedisClientType
  private MAXHISTORYLENGTH: number
  private CONTEXTEXPIRATION: number

  constructor(redisClient: RedisClientType) {
    this.redisClient = redisClient

    this.MAXHISTORYLENGTH = 10
    this.CONTEXTEXPIRATION = 60 * 60 * 24

    this.redisClient.on('error', (err) => console.error('Redis Error:', err))
  }

  async getContext(userId: string) {
    const data = await this.redisClient.get(`context:${userId}`)
    if (!data) return { history: [], metadata: {} }

    return JSON.parse(data)
  }

  async updateContext(
    userId: string,
    message: string,
    response: string,
    metadata: object = {},
  ) {
    const context = await this.getContext(userId)

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

    if (context.history.length > this.MAXHISTORYLENGTH * 2) {
      context.history = context.history.slice(-this.MAXHISTORYLENGTH * 2)
    }

    context.metadata = { ...context.metadata, ...metadata }

    await this.redisClient.set(`context:${userId}`, JSON.stringify(context))
    await this.redisClient.expire(`context:${userId}`, this.CONTEXTEXPIRATION)

    return true
  }

  async addUserMessage(userId: string, message: string) {
    const context = await this.getContext(userId)

    context.history.push({
      role: 'user',
      content: message,
      timestamp: Date.now(),
    })

    await this.redisClient.set(`context:${userId}`, JSON.stringify(context))
    await this.redisClient.expire(`context:${userId}`, this.CONTEXTEXPIRATION)

    return context
  }

  async clearContext(userId: string) {
    await this.redisClient.del(`context:${userId}`)
    return true
  }

  async close() {
    await new Promise(() => {
      this.redisClient.quit()
    })
  }
}
