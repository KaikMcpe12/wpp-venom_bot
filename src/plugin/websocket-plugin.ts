import { FastifyInstance } from 'fastify'
import fastifyWebsocket from '@fastify/websocket'
import fp from 'fastify-plugin'

async function websocketPlugin(app: FastifyInstance) {
  app.register(fastifyWebsocket)

  app.addHook('onRequest', (req, reply, done) => {
    if (app.websocketServer?.clients?.size >= 1) {
      reply.code(503).send({ error: 'Já existe um cliente conectado' })
      return
    }
    done()
  })
}

export default fp(websocketPlugin)
