import WppBotRepository from "../repositories/venomBotRepository";
import { ISendList } from "../interface/messageInterface";
import { wppVenom } from "../server";

export async function sendListController(data: ISendList){
    const wpp = new WppBotRepository(wppVenom)

    const result = await wpp.sendList({...data, numberPhone: data.numberPhone+'@c.us'})

    if(!result){
        return new Error('Message not sent')
    }
    
    return result
}