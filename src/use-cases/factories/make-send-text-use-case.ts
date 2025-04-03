import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { SendText } from '../venom-bot/sendText'

export function makeSendTextUseCase() {
  if (!wppVenom.client) {
    throw new Error('WPP Venom is not initialized')
  }

  const wppVenomRepository = new WppVenomRepository(wppVenom.client)
  const sendText = new SendText(wppVenomRepository)

  return sendText
}
