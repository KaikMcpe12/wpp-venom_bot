import WppBotRepository from "../repositories/venomBotRepository";
import { ISendButton } from "../interface/messageInterface";
import { wppVenom } from "../server";

export async function sendButtonController(data: ISendButton){
    const wpp = new WppBotRepository(wppVenom)

    const result = await wpp.sendButton({...data, numberPhone: data.numberPhone+'@c.us'})

    if(!result){
        return new Error('Message not sent')
    }
    
    return result
}