import cors from '@fastify/cors'
import { fastify, FastifyInstance } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import websocketPlugin from './plugin/websocket-plugin'
import { appRoutes } from './http/routes'
import { errorHandler } from './errors/error-handler'

const app: FastifyInstance = fastify({
  maxParamLength: 1048576,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cors, {
  origin: '*',
})

app.register(websocketPlugin)

app.register(appRoutes)

app.setErrorHandler(errorHandler)

// testes venom-bot
// ler mensagens de um contato

export { app }
