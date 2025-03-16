import venom from 'venom-bot'
import { sendMessageAi } from '../use-cases/venom-bot/sendMessageAi'
import { findContactByPhoneNumberTool } from '../ai/ai-tools/find-contact-phonenumber-controller'
import { env } from '../../env'
import { disableContactTool } from '../ai/ai-tools/disable-contact-controller'
import { enableContactTool } from '../ai/ai-tools/enable-contact-controller'
import { getAiClient } from '../lib/ai-client'

export async function handlerMessageVenomBot(
  clientVenom: venom.Whatsapp,
  message: venom.Message,
) {
  if (message.body && !message.isGroupMsg && env.ENABLE_BOT) {
    const phonenumber = message.from.split('@')[0]
    const contact = await findContactByPhoneNumberTool(phonenumber)

    if (message.body === '!bot off') {
      await disableContactTool(phonenumber)
      clientVenom.sendText(message.from, '🤖 Bot Desligado')
      return
    } else if (message.body === '!bot on') {
      await enableContactTool(phonenumber)
      clientVenom.sendText(message.from, '🤖 Bot ligado')
      return
    }
    // should add help for comands

    const body = {
      name: `${contact?.name || 'Contato sem nome'} (${phonenumber})`,
      message: message.body,
    }

    const aiClient = await getAiClient()

    const reply = await sendMessageAi(body, aiClient)

    clientVenom.sendText(message.from, reply)
  }
}
