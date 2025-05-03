import redis from 'redis'

import { env } from '../../env'

export const config = {
  host: env.REDIS_HOST,
  post: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
}

export const redisClient = redis.createClient(config)
