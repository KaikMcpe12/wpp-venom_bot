import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { SendList } from '../venom-bot/sendList'

export function makeSendListUseCase() {
  if (!wppVenom.client) {
    throw new WppNotInicializedError()
  }

  const wppVenomRepository = new WppVenomRepository(wppVenom.client)
  const sendText = new SendList(wppVenomRepository)

  return sendText
}
