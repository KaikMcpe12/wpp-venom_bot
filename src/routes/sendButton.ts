import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from 'zod'
import { ISendButton } from "../interface/messageInterface";
import { sendButtonController } from "../controller/sendButtonController";

export function sendButton(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post<{Body: ISendButton}>('/wpp/sendbutton', {
        schema: {
            body: z.object({
                numberPhone: z.coerce.number(),
                title: z.string(),
                description: z.string(),
                buttons: z.array(z.object({
                    buttonText: z.object({
                        displayText: z.string()
                    }),
                })),
            })
        }
    },async (req, reply) => {
        const { numberPhone, title, description, buttons } = req.body;

        const result = await sendButtonController({ numberPhone, title, description, buttons })

        if(!result){
            reply.status(400).send('Message not sent')
        }
        
        reply.status(200).send({message: 'Message send'})
    })
}