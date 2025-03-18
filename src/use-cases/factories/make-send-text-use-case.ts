import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { SendText } from '../venom-bot/sendText'

export function makeSendTextUseCase() {
  const wppVenomRepository = new WppVenomRepository(wppVenom)
  const sendText = new SendText(wppVenomRepository)

  return sendText
}
