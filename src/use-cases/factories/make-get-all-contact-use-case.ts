import { wppVenom } from '../../lib/wpp-venom'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { GetAllContacts } from '../venom-bot/get-all-contacts'

export function makeGetAllContactUseCase() {
  if (!wppVenom.client) {
    throw new Error('WPP Venom is not initialized')
  }

  const wppVenomRepository = new WppVenomRepository(wppVenom.client)
  const getAllContacts = new GetAllContacts(wppVenomRepository)

  return getAllContacts
}
