import venom from 'venom-bot'
import { sendMessageAiController } from '../controller/sendMessageAiController'
import { aiClient } from '../server'

export async function processMessageService(clientVenom: venom.Whatsapp, message: venom.Message) {
    if(message.body && !message.isGroupMsg){
        const phonenumber = message.from.split('@')[0]
        const body = { phonenumber: phonenumber, message: message.body  }

        const reply = await sendMessageAiController(body, aiClient)

        clientVenom.sendText(message.from, reply)
    }
}