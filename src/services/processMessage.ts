import venom from 'venom-bot'
import { sendMessageAi } from '../controller/sendMessageAi'
import { aiClient } from '../server'
import { findContactByPhonenumberController } from '../controller/ai-tools/find-contact-phonenumber-controller'
import { env } from '../../env'
import { disableContactController } from '../controller/ai-tools/disable-contact-controller'
import { enableContactController } from '../controller/ai-tools/enable-contact-controller'

export async function handlerMessageVenomBot(
  clientVenom: venom.Whatsapp,
  message: venom.Message,
) {
  if (message.body && !message.isGroupMsg && env.ENABLE_BOT) {
    const phonenumber = message.from.split('@')[0]
    const contact = await findContactByPhonenumberController(phonenumber)

    if (message.body === '!bot off') {
      await disableContactController(phonenumber)
    } else if (message.body === '!bot on') {
      await enableContactController(phonenumber)
    }
    // should add help for comands

    const body = {
      name: `${contact?.name || 'Contato sem nome'} (${phonenumber})`,
      message: message.body,
    }

    const reply = await sendMessageAi(body, aiClient)

    clientVenom.sendText(message.from, reply)
  }
}
