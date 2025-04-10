import { VenomClient } from '../../lib/wpp-venom'
import { WppFactory } from '../../wpp/factories/wpp-factory'
import { WppVenomRepository } from '../../wpp/repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { GetAllContacts } from './get-all-contacts'

describe('Get all contacts of venom-bot', () => {
  let wppVenomRepository: WppVenomRepository
  let getAllContacts: GetAllContacts
  let venomClient: VenomClient

  beforeAll(
    async () => {
      venomClient = WppFactory.getVenomClient()

      await venomClient.initializeVenom()

      if (!venomClient.client) {
        throw new WppNotInicializedError()
      }

      wppVenomRepository = new WppVenomRepository(venomClient.client)
      getAllContacts = new GetAllContacts(wppVenomRepository)
    },
    5 * 60 * 1000,
  )

  it(
    'should get all contacts',
    async () => {
      const contacts = await getAllContacts.execute()
      console.log(contacts[0])

      contacts.forEach((contact) => {
        expect(contact.phoneNumber).toEqual(expect.any(String))
      })
    },
    5 * 60 * 1000,
  )
})
