import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { SendButton } from '../venom-bot/sendButton'

export function makeSendButtonUseCase() {
  if (!wppVenom.client) {
    throw new WppNotInicializedError()
  }

  const wppVenomRepository = new WppVenomRepository(wppVenom.client)
  const sendText = new SendButton(wppVenomRepository)

  return sendText
}
