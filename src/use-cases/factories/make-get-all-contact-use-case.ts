import { WppFactory } from '../../wpp/factories/wpp-factory'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { GetAllContacts } from '../../wpp/venom-bot/get-all-contacts'

export function makeGetAllContactUseCase() {
  const venomClient = WppFactory.getVenomClient()

  if (!venomClient.client) {
    throw new WppNotInicializedError()
  }

  const wppVenomRepository = new WppVenomRepository(venomClient.client)
  const getAllContacts = new GetAllContacts(wppVenomRepository)

  return getAllContacts
}
