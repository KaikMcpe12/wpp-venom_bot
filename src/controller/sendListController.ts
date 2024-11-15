import { FastifyInstance } from "fastify";
import WppBotRepository from "../repositories/venomBotRepository";
import { ISendList } from "../interface/messageInterface";

export async function sendListController(app: FastifyInstance, data: ISendList){
    const wpp = new WppBotRepository(app)

    const result = await wpp.sendList({...data, numberPhone: data.numberPhone+'@c.us'})

    if(!result){
        return new Error('Message not sent')
    }
    
    return result
}