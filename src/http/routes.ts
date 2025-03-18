import { FastifyInstance } from 'fastify'
import { helloWorld } from './controllers/helloWorld'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { sendTextSchema } from './dto/send-text-schem'
import { sendText } from './controllers/sendText'
import { sendList } from './controllers/sendList'
import { sendListSchema } from './dto/send-list-schema'
import { sendButtonSchema } from './dto/send-button-schema'
import { sendButton } from './controllers/sendButton'

export async function appRoutes(app: FastifyInstance) {
  app.get('/hello', helloWorld)
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/wpp/sendtext', { schema: { body: sendTextSchema } }, sendText)
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/wpp/sendlist', { schema: { body: sendListSchema } }, sendList)
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/wpp/sendbutton', { schema: { body: sendButtonSchema } }, sendButton)
}
