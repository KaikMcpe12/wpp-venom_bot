import { VenomClient } from '../../lib/wpp-venom'
import { WppFactory } from '../factories/wpp-factory'
import { WppVenomRepository } from '../repositories/wpp-venom-repository'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { SendButton } from './send-button'

describe.skip('Send button to contact', () => {
  let wppVenomRepository: WppVenomRepository
  let sendButton: SendButton
  let venomClient: VenomClient

  beforeAll(
    async () => {
      venomClient = WppFactory.getVenomClient()

      await venomClient.initializeVenom()

      if (!venomClient.client) {
        throw new WppNotInicializedError()
      }

      wppVenomRepository = new WppVenomRepository(venomClient.client)
      sendButton = new SendButton(wppVenomRepository)
    },
    5 * 60 * 1000,
  )

  it(
    'should send button',
    async () => {
      const data = {
        phoneNumber: '88994660093',
        title: 'Envio de teste de botão',
        description: 'Descrição do botão',
        buttons: [
          {
            buttonText: {
              displayText: 'Botão 1',
            },
          },
        ],
      }

      const result = await sendButton.execute(data)

      expect(result).toBeTruthy()
    },
    5 * 60 * 1000,
  )
})
