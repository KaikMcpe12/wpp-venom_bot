import cors from '@fastify/cors'
import { fastify, FastifyInstance } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { getQrCode } from './ws/getQrCode-websocket'
import websocketPlugin from './plugin/websocket-plugin'
import { appRoutes } from './http/routes'

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

app.register(getQrCode)

export { app }

// adaptar o bot par bot por usuários
// salvar dados dera enviar funções
// ligar e desliga usuários
// salvar preferências
