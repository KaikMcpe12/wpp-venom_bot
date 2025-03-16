import WppBotRepository from '../../databases/repositories/venomBotRepository'
import { ISendList } from '../../http/dto/send-list-schema'
import { wppVenom } from '../../lib/wpp-venom'

export async function sendListController(data: ISendList) {
  const wpp = new WppBotRepository(wppVenom)

  const result = await wpp.sendList({
    ...data,
    numberPhone: data.numberPhone + '@c.us',
  })

  if (!result) {
    return new Error('Message not sent')
  }

  return result
}
