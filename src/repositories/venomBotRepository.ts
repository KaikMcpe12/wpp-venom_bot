import * as venom from 'venom-bot';
import { ISendList } from '../interface/messageInterface';

export default class WppBotRepository{
    wpp!: venom.Whatsapp

    constructor(private fastify: any){
        this.initialize()
    }

    private async initialize() {
        this.wpp = this.fastify.venomBot
    }

    async sendMessage(number: string, message: string) {
        try{
            const result = await this.wpp.sendText(number, message)

            return result
        }catch(err: Error | any){
            return new Error('Message not sent', err)
        }
    }

    async sendList(data: ISendList) {
        try{
            const result = this.wpp.sendListMenu(data.numberPhone, data.title, data.subTitle, data.description, data.menuName, data.list)

            return result
        }catch(err: Error | any){
            return new Error('Message not sent', err)
        }
    }
}
