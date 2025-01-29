import { ISendButton, ISendList } from '../interface/messageInterface';
import { Venom } from '../lib/instanceVenomBot';

export default class WppBotRepository{
    constructor(private wpp: Venom){}

    async sendMessage(number: string, message: string) {
        try{
            const result = await this.wpp.client.sendText(number, message)
            
            return result
        }catch(err: Error | any){
            console.log(err)
            throw new Error('Message not sent', err)
        }
    }

    async sendList(data: ISendList) {
        try{
            const result = await this.wpp.client.sendListMenu(data.numberPhone, data.title, data.subTitle, data.description, data.menuName, data.list)

            return result
        }catch(err: Error | any){
            console.log(err)
            throw new Error('Message not sent', err)
        }
    }

    async sendButton(data: ISendButton) {
        try{
            const result = await this.wpp.client.sendButtons(data.numberPhone, data.title, data.description, data.buttons)

            return result
        }catch(err: Error | any){
            console.log(err)
            throw new Error('Message not sent', err)
        }
    }
}
