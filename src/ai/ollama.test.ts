import { sendMessageAi } from '../controller/sendMessageAi'
import { initializeAi } from '../lib/ai'
import { IAiService } from './interface/IAiService'

describe('Test ia chat', () => {
  let aiClient: IAiService

  beforeAll(async () => {
    aiClient = await initializeAi()
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
