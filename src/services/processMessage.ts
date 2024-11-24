import venom from 'venom-bot'
import { sendMessageOllamaController } from '../controller/sendMessageOllamaController'

export async function processMessageService(clientVenom: venom.Whatsapp, message: venom.Message) {
    if(message.body && !message.isGroupMsg){
        const reply = await sendMessageOllamaController(message.body)

        clientVenom.sendText(message.from, reply)
    }
}