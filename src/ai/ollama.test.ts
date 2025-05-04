import { getAiClient } from '../lib/ai-client'
import { sendMessageAi } from '../wpp/venom-bot/sendMessageAi'
import { IAiService } from './interface/IAiService'

describe.skip('Test ia chat', () => {
  let aiClient: IAiService

  beforeAll(async () => {
    aiClient = await getAiClient()
  })

  it('should test normal ia chat', async () => {
    const body = {
      name: 'Diego',
      message: 'Olá tudo bem? Quem é você?',
    }

    const response = await sendMessageAi(body, aiClient)
    expect(response).toBeTruthy()
  }, 120000)
})
