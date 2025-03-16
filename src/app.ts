import cors from '@fastify/cors'
import { fastify, FastifyInstance } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { helloworld } from './http/controllers/helloWorld'
import { sendText } from './routes/sendText'
import { sendList } from './routes/sendList'
import { sendButton } from './routes/sendButton'
import { getQrCode } from './ws/getQrCode-websocket'
import websocketPlugin from './plugin/websocket-plugin'

const app: FastifyInstance = fastify({
  maxParamLength: 1048576,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cors, {
  origin: '*',
})

app.register(websocketPlugin)

app.register(helloworld)

app.register(sendText)
app.register(sendList)
app.register(sendButton)

app.register(getQrCode)

export { app }

// adaptar o bot par bot por usuários
// salvar dados dera enviar funções
// ligar e desliga usuários
// salvar preferências
