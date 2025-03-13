import { makeContact } from '../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../test/repository/in-memory-contact-repository'
import { InMemoryPreferenceRepository } from '../../test/repository/in-memory-preference-repository'
import { sendMessageAi } from '../controller/sendMessageAi'
import { Preference } from '../entities/preference/preference'
import { initializeAi } from '../lib/ai'
import { CreatePreference } from '../use-cases/ai/preference/create-preference-usecase'
import { IAiService } from './interface/IAiService'
import { AiPreferenceMapper } from './mappers/ai-preference-mapper'
import { createPreferenceTool } from './toolsConfig/aiTools'

interface IRequestPreference {
  phoneNumber: string
  content: string
}

describe('Test preferences functions', () => {
  let aiClient: IAiService
  let inMemoryContact: InMemoryContactRepository
  let inMemoryPreference: InMemoryPreferenceRepository
  let createPreference: CreatePreference

  beforeAll(async () => {
    aiClient = await initializeAi()
    inMemoryContact = new InMemoryContactRepository()
    inMemoryPreference = new InMemoryPreferenceRepository()

    createPreference = new CreatePreference(inMemoryPreference, inMemoryContact)
  })

  beforeEach(() => {
    inMemoryContact.contacts = []

    inMemoryContact.create(
      makeContact({ phonenumber: '(12)12212-1212', name: 'Augusto' }),
    )
  })

  it('should ia create a preference', async () => {
    const functionImplementation = async (request: IRequestPreference) =>
      AiPreferenceMapper.toRaw(await createPreference.execute(request))

    aiClient.tools = [
      { function: createPreferenceTool, functionImplementation },
    ]

    const body = {
      name: `Mensagem de [Augusto] com número:[(12)12212-1212]`,
      message:
        'Eu gosto de conversas alegres e com emojis! Você poderia me responder assim a partir de agora?',
    }

    const result = await sendMessageAi(body, aiClient)
    console.log(result)
    // console.log(inMemoryPreference.preferences[0].content)

    expect(inMemoryPreference.preferences[0]).toBeInstanceOf(Preference)
  }, 60000)
})
