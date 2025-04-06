import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { SendText } from '../venom-bot/sendText'

export function makeSendTextUseCase() {
  if (!wppVenom.client) {
    throw new WppNotInicializedError()
  }

  const wppVenomRepository = new WppVenomRepository(wppVenom.client)
  const sendText = new SendText(wppVenomRepository)

  return sendText
}
