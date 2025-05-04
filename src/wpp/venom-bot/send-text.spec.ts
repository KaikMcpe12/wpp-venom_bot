import { VenomClient } from '../../lib/wpp-venom'
import { WppFactory } from '../factories/wpp-factory'
import { WppVenomRepository } from '../repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { SendText } from './send-text'

describe.skip('Send text to contact', () => {
  let wppVenomRepository: WppVenomRepository
  let sut: SendText
  let venomClient: VenomClient

  beforeAll(
    async () => {
      venomClient = WppFactory.getVenomClient()

      await venomClient.initializeVenom()

      if (!venomClient.client) {
        throw new WppNotInicializedError()
      }

      wppVenomRepository = new WppVenomRepository(venomClient.client)
      sut = new SendText(wppVenomRepository)
    },
    5 * 60 * 1000,
  )

  it(
    'should send text',
    async () => {
      const data = {
        phoneNumber: '88994660093',
        message: 'Envio de teste de mensagem',
      }

      const result = await sut.execute(data)

      expect(result).toBeTruthy()
    },
    5 * 60 * 1000,
  )
})
