import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { SendButton } from '../venom-bot/sendButton'

export function makeSendButtonUseCase() {
  const wppVenomRepository = new WppVenomRepository(wppVenom)
  const sendText = new SendButton(wppVenomRepository)

  return sendText
}
