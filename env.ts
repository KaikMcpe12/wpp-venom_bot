import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  ENABLE_BOT: z.coerce.boolean().default(true),

  REDIS_HOST: z.string().default('localhost'),
  REDIS_PASSWORD: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),

  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
