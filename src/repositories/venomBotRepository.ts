import * as venom from 'venom-bot';
import { ISendButton, ISendList } from '../interface/messageInterface';
import { wppVenom } from '../server';

export default class WppBotRepository{
    wpp!: venom.Whatsapp

    constructor(){
        this.wpp = wppVenom
    }

    async sendMessage(number: string, message: string) {
        try{
            const result = await this.wpp.sendText(number, message)
            
            return result
        }catch(err: Error | any){
            console.log(err)
            throw new Error('Message not sent', err)
        }
    }

    async sendList(data: ISendList) {
        try{
            const result = await this.wpp.sendListMenu(data.numberPhone, data.title, data.subTitle, data.description, data.menuName, data.list)

            return result
        }catch(err: Error | any){
            console.log(err)
            throw new Error('Message not sent', err)
        }
    }

    async sendButton(data: ISendButton) {
        try{
            const result = await this.wpp.sendButtons(data.numberPhone, data.title, data.description, data.buttons)

            return result
        }catch(err: Error | any){
            console.log(err)
            throw new Error('Message not sent', err)
        }
    }
}
