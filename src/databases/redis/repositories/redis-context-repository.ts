import { RedisClientType } from 'redis'
import {
  ContextRepository,
  IContext,
} from '../../repositories/context-repository'

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

  async getContext(phoneNumber: string) {
    const data = await this.redisClient.get(`context:${phoneNumber}`)
    return data ? JSON.parse(data) : null
  }

  async saveContext(phoneNumber: string, context: IContext) {
    await this.redisClient.set(
      `context:${phoneNumber}`,
      JSON.stringify(context),
    )
    await this.redisClient.expire(
      `context:${phoneNumber}`,
      this.CONTEXTEXPIRATION,
    )
  }

  async clearContext(phoneNumber: string) {
    await this.redisClient.del(`context:${phoneNumber}`)
    return true
  }

  async close() {
    await new Promise(() => {
      this.redisClient.quit()
    })
  }
}
