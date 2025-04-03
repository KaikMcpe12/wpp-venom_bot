import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { SendButton } from '../venom-bot/sendButton'

export function makeSendButtonUseCase() {
  if (!wppVenom.client) {
    throw new Error('WPP Venom is not initialized')
  }

  const wppVenomRepository = new WppVenomRepository(wppVenom.client)
  const sendText = new SendButton(wppVenomRepository)

  return sendText
}
