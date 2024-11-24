import cors from "@fastify/cors";
import { fastify, FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { helloworld } from "./routes/helloWorld";
import { sendText } from "./routes/sendText";
import { sendList } from "./routes/sendList";
import { getInstanceVenom } from "./lib/instanceVenomBot";
import * as venom from 'venom-bot';
import { sendButton } from "./routes/sendButton";
import { initializeOllama } from "./lib/ollama";
import { Ollama } from "ollama";

const app: FastifyInstance = fastify({
    maxParamLength: 1048576
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cors, {
    origin: '*',
}),

app.register(helloworld)

app.register(sendText)
app.register(sendList)
app.register(sendButton)

let wppVenom: venom.Whatsapp;
let ollamaClient: Ollama;

const startServer = async () => {
  try {
    wppVenom = await getInstanceVenom()
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
