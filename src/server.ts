import cors from '@fastify/cors'
import { fastify, FastifyInstance } from "fastify"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { helloworld } from "./routes/helloWorld"
import { sendText } from "./routes/sendText"
import instanceVenomBot from './lib/instanceVenomBot'

const app: FastifyInstance = fastify({
    maxParamLength: 1048576
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(instanceVenomBot)

app.register(cors, {
    origin: '*',
})

app.register(helloworld)

app.register(sendText)

app.listen({
    port: 3333
}, (err) => {
    console.log(err)
    console.log('Serve its running on the port 3333')
})
