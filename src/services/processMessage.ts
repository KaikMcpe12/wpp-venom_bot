import venom from 'venom-bot'
import { sendMessageAi } from '../controller/sendMessageAi'
import { aiClient } from '../server'
import { findContactByPhonenumberController } from '../controller/ai-tools/find-contact-phonenumber-controller'

export async function handlerMessageVenomBot(clientVenom: venom.Whatsapp, message: venom.Message) {
    if(message.body && !message.isGroupMsg){
        const phonenumber = message.from.split('@')[0]
        const contact = await findContactByPhonenumberController(phonenumber)
        const body = { name: contact ? `${contact?.name} ${contact?.phonenumber}` : 'Contato sem nome', message: message.body  }

        const reply = await sendMessageAi(body, aiClient)

        clientVenom.sendText(message.from, reply)
    }
}