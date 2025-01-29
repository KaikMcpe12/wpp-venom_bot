import cors from "@fastify/cors";
import { fastify, FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { helloworld } from "./routes/helloWorld";
import { sendText } from "./routes/sendText";
import { sendList } from "./routes/sendList";
import { Venom } from "./lib/instanceVenomBot";
import { sendButton } from "./routes/sendButton";
import { initializeOllama } from "./lib/ollama";
import { Ollama } from "ollama";
import fastifyWebsocket from "@fastify/websocket";
import { getQrCode } from "./ws/getQrCode-websocket";
import websocketPlugin from "./plugin/websocket-plugin";

const app: FastifyInstance = fastify({
    maxParamLength: 1048576
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cors, {
    origin: '*',
}),

app.register(websocketPlugin)

app.register(helloworld)

app.register(sendText)
app.register(sendList)
app.register(sendButton)

app.register(getQrCode)

let wppVenom: Venom = new Venom()
let ollamaClient: Ollama;

const startServer = async () => {
  try {
    ollamaClient = await initializeOllama()

    app.listen({
        port: 3333
    }, (err) => {
        console.log(err) 
        console.log('Serve its running on the port 3333') 
    })

  } catch (err) {
    console.error('Error initializing venom bot:', err)
  }
};

startServer()

export { wppVenom, ollamaClient }

// adaptar o bot par bot por usuários
// salvar dados dera enviar funções
// ligar e desliga usuários
// salvar preferências
// detalhar quem é o bot
// corrigir captura de qrcode