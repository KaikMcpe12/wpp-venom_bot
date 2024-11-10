import { FastifyInstance } from "fastify"

export async function helloworld(app: FastifyInstance){
    app.get('/hello',async (req, reply) => {
        reply.status(201).send({ message: "Hello World" })
    })
}