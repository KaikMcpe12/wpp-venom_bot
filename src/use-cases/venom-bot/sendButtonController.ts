import WppBotRepository from '../../databases/repositories/venomBotRepository'
import { ISendButton } from '../../http/dto/send-button-schema'
import { wppVenom } from '../../lib/wpp-venom'

export async function sendButtonController(data: ISendButton) {
  const wpp = new WppBotRepository(wppVenom)

  const result = await wpp.sendButton({
    ...data,
    numberPhone: data.numberPhone + '@c.us',
  })

  if (!result) {
    return new Error('Message not sent')
  }

  return result
}
