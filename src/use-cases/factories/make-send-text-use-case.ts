import { WppFactory } from '../../wpp/factories/wpp-factory'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { SendText } from '../../wpp/venom-bot/send-text'

export function makeSendTextUseCase() {
  const venomClient = WppFactory.getVenomClient()

  if (!venomClient.client) {
    throw new WppNotInicializedError()
  }

  const wppVenomRepository = new WppVenomRepository(venomClient.client)
  const sendText = new SendText(wppVenomRepository)

  return sendText
}
