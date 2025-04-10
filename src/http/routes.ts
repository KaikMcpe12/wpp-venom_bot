import { FastifyInstance } from 'fastify'
import { helloWorld } from './controllers/helloWorld'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { sendTextSchema } from './dto/send-text-schem'
import { sendText } from './controllers/sendText'
import { sendList } from './controllers/sendList'
import { sendListSchema } from './dto/send-list-schema'
import { sendButtonSchema } from './dto/send-button-schema'
import { sendButton } from './controllers/sendButton'
import { getAllContacts } from './controllers/get-all-contacts'
import { terminateSession } from './controllers/terminate-session'
import { WppSessionManager } from '../ws/initialize-wpp-websocket'

export async function appRoutes(app: FastifyInstance) {
  app.get('/hello', helloWorld)
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/wpp/send/text', { schema: { body: sendTextSchema } }, sendText)
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/wpp/send/list', { schema: { body: sendListSchema } }, sendList)
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/wpp/send/button',
      { schema: { body: sendButtonSchema } },
      sendButton,
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/wpp/all/contacts', getAllContacts)
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/wpp/terminate', terminateSession)
  app.get('/wpp/initialize', { websocket: true }, (connection) => {
    WppSessionManager.handleConnection(connection)
  })
}
