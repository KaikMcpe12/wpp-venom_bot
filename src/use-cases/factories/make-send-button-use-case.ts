import { WppFactory } from '../../wpp/factories/wpp-factory'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { SendButton } from '../venom-bot/send-button'

export function makeSendButtonUseCase() {
  const venomClient = WppFactory.getVenomClient()

  if (!venomClient.client) {
    throw new WppNotInicializedError()
  }

  const wppVenomRepository = new WppVenomRepository(venomClient.client)
  const sendText = new SendButton(wppVenomRepository)

  return sendText
}
