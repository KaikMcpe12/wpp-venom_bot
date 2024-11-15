import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z, { number } from 'zod'
import { sendTextController } from "../controller/sendTextController";

export function sendText(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{Body: {number: number, message: string}}>('/wpp/sendtext', {
        schema: {
            body: z.object({
                number: z.number(),
                message: z.string(),
            })
        }
    },async (req, reply) => {
        const { number, message } = req.body

        const result = await sendTextController(app, number, message)

        if(!result){
            reply.status(400).send('Message not sent')
        }
        
        reply.status(200).send('Message send')
    })
}