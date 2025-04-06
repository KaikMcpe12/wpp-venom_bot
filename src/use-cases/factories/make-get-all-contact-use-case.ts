import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { GetAllContacts } from '../venom-bot/get-all-contacts'

export function makeGetAllContactUseCase() {
  if (!wppVenom.client) {
    throw new WppNotInicializedError()
  }

  const wppVenomRepository = new WppVenomRepository(wppVenom.client)
  const getAllContacts = new GetAllContacts(wppVenomRepository)

  return getAllContacts
}
