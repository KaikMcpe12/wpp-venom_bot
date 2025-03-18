import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { SendList } from '../venom-bot/sendList'

export function makeSendListUseCase() {
  const wppVenomRepository = new WppVenomRepository(wppVenom)
  const sendText = new SendList(wppVenomRepository)

  return sendText
}
