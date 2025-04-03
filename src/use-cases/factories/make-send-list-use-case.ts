import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { SendList } from '../venom-bot/sendList'

export function makeSendListUseCase() {
  if (!wppVenom.client) {
    throw new Error('WPP Venom is not initialized')
  }

  const wppVenomRepository = new WppVenomRepository(wppVenom.client)
  const sendText = new SendList(wppVenomRepository)

  return sendText
}
