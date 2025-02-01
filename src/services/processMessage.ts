import venom from 'venom-bot'
import { sendMessageAiController } from '../controller/sendMessageOllamaController'
import { aiClient } from '../server'

export async function processMessageService(clientVenom: venom.Whatsapp, message: venom.Message) {
    if(message.body && !message.isGroupMsg){
        const reply = await sendMessageAiController(message.body, aiClient)

        clientVenom.sendText(message.from, reply)
    }
}