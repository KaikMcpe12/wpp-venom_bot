import { VenomClient } from '../../lib/wpp-venom'
import { WppFactory } from '../factories/wpp-factory'
import { WppVenomRepository } from '../repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { SendList } from './send-list'

describe.skip('Send list to contact', () => {
  let wppVenomRepository: WppVenomRepository
  let sut: SendList
  let venomClient: VenomClient

  beforeAll(
    async () => {
      venomClient = WppFactory.getVenomClient()

      await venomClient.initializeVenom()

      if (!venomClient.client) {
        throw new WppNotInicializedError()
      }

      wppVenomRepository = new WppVenomRepository(venomClient.client)
      sut = new SendList(wppVenomRepository)
    },
    5 * 60 * 1000,
  )

  it(
    'should send list',
    async () => {
      const data = {
        phoneNumber: '88994660093',
        title: 'Envio de teste de botão',
        subTitle: 'Envio de teste de botão',
        description: 'Descrição do botão',
        menuName: 'Menu de teste',
        list: [
          {
            title: 'Título 1',
            rows: [
              {
                title: 'Título 1',
                description: 'Descrição 1',
              },
            ],
          },
        ],
      }

      const result = await sut.execute(data)

      expect(result).toBeTruthy()
    },
    5 * 60 * 1000,
  )
})
