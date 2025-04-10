import venom from 'venom-bot'
import { sendMessageAi } from '../use-cases/venom-bot/sendMessageAi'
import { findContactByPhoneNumberTool } from '../ai/ai-tools/find-contact-phonenumber-controller'
import { env } from '../../env'
import { disableContactTool } from '../ai/ai-tools/disable-contact-controller'
import { enableContactTool } from '../ai/ai-tools/enable-contact-controller'
import { getAiClient } from '../lib/ai-client'
import { tools } from '../ai/toolsConfig/aiTools'
import { WppVenomRepository } from '../wpp/repositories/wpp-venom-repository'

export class MessageHandler {
  constructor(private wppVenomRepository: WppVenomRepository) {}

  public async handler(message: venom.Message) {
    if (
      message.body &&
      !message.isGroupMsg &&
      env.ENABLE_BOT &&
      message.fromMe
    ) {
      const phonenumber = message.from.split('@')[0]
      const contact = await findContactByPhoneNumberTool(phonenumber)

      if (message.body === '!bot off') {
        await disableContactTool(phonenumber)
        this.wppVenomRepository.sendText({
          message: '🤖 Bot Desligado',
          phoneNumber: message.from,
        })
        return
      } else if (message.body === '!bot on') {
        await enableContactTool(phonenumber)
        this.wppVenomRepository.sendText({
          message: '🤖 Bot Ligado',
          phoneNumber: message.from,
        })
        return
      }
      // should add help for comands

      const body = {
        name: `${contact?.name || 'Contato sem nome'} (${phonenumber})`,
        message: message.body,
      }

      const aiClient = await getAiClient()
      aiClient.tools = tools

      const reply = await sendMessageAi(body, aiClient)

      this.wppVenomRepository.sendText({
        message: reply,
        phoneNumber: message.from,
      })
    }
  }
}
