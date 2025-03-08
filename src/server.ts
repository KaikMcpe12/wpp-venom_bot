import cors from '@fastify/cors'
import { fastify, FastifyInstance } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { helloworld } from './routes/helloWorld'
import { sendText } from './routes/sendText'
import { sendList } from './routes/sendList'
import { Venom } from './lib/instanceVenomBot'
import { sendButton } from './routes/sendButton'
import { initializeAi } from './lib/ai'
import { getQrCode } from './ws/getQrCode-websocket'
import websocketPlugin from './plugin/websocket-plugin'
import { IAiService } from './ai/interface/IAiService'
import { env } from '../env'

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

const wppVenom: Venom = new Venom()
let aiClient: IAiService

const startServer = async () => {
  try {
    aiClient = await initializeAi()

    app.listen(
      {
        port: env.PORT,
      },
      (err) => {
        console.log(err)
        console.log(`Serve its running on the port ${env.PORT}`)
      },
    )
  } catch (err) {
    console.error('Error initializing venom bot:', err)
  }
}

startServer()

export { wppVenom, aiClient }

// adaptar o bot par bot por usuários
// salvar dados dera enviar funções
// ligar e desliga usuários
// salvar preferências
