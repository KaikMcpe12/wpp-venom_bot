import * as venom from 'venom-bot';

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

    async sendList(number: string, title: string, subTitle: string, description: string, menu: any, list: any) {
        try{
            const result = this.wpp.sendListMenu(number, title, subTitle, description, menu, list)

            return result
        }catch(err: Error | any){
            return new Error('Message not sent', err)
        }
    }
}
