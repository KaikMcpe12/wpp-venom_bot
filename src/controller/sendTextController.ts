import WppBotRepository from '../repositories/venomBotRepository'
import { wppVenom } from '../server'

export async function sendTextController(number: number, message: string) {
  const wpp = new WppBotRepository(wppVenom)

  const result = await wpp.sendMessage(number + '@c.us', message)

  if (!result) {
    return new Error('Message not sent')
  }

  return result
}
