import venom from 'venom-bot'
import { sendMessageAi } from '../controller/sendMessageAi'
import { aiClient } from '../server'
import { findContactByPhonenumberController } from '../controller/ai-tools/find-contact-phonenumber-controller'
import { env } from '../../env'

export async function handlerMessageVenomBot(
  clientVenom: venom.Whatsapp,
  message: venom.Message,
) {
  if (message.body && !message.isGroupMsg && env.ENABLE_BOT) {
    const phonenumber = message.from.split('@')[0]
    const contact = await findContactByPhonenumberController(phonenumber)
    const body = {
      name: `${contact?.name || 'Contato sem nome'} (${phonenumber})`,
      message: message.body,
    }

    const reply = await sendMessageAi(body, aiClient)

    clientVenom.sendText(message.from, reply)
  }
}
