import { makeContact } from '../../test/factory/make-contact'
import { makePreference } from '../../test/factory/make-preference'
import { InMemoryContactRepository } from '../../test/repository/in-memory-contact-repository'
import { InMemoryPreferenceRepository } from '../../test/repository/in-memory-preference-repository'
import { sendMessageAi } from '../use-cases/venom-bot/sendMessageAi'
import { Contact } from '../entities/contact/contact'
import { Preference } from '../entities/preference/preference'
import { addPreferenceContext } from '../utils/addPreferenceInContext'
import { CreatePreference } from '../use-cases/ai/preference/create-preference-usecase'
import { ListPreference } from '../use-cases/ai/preference/list-preference-usercase'
import { IAiService } from './interface/IAiService'
import { AiPreferenceMapper } from './mappers/ai-preference-mapper'
import { createPreferenceToolConfig } from './toolsConfig/aiToolsConfig'
import { getAiClient } from '../lib/ai-client'

interface IRequestPreference {
  phoneNumber: string
  content: string
}

describe.skip('Test preferences functions', () => {
  let contact: Contact

  let aiClient: IAiService
  let inMemoryContact: InMemoryContactRepository
  let inMemoryPreference: InMemoryPreferenceRepository
  let createPreference: CreatePreference
  let listPreference: ListPreference

  beforeAll(async () => {
    aiClient = await getAiClient()
    inMemoryContact = new InMemoryContactRepository()
    inMemoryPreference = new InMemoryPreferenceRepository()

    createPreference = new CreatePreference(inMemoryPreference, inMemoryContact)
    listPreference = new ListPreference(inMemoryPreference, inMemoryContact)
  })

  beforeEach(() => {
    inMemoryContact.contacts = []

    contact = makeContact({
      phonenumber: '(12)12212-1212',
      name: 'Augusto',
    })

    inMemoryContact.create(contact)
  })

  it.skip('should ia create a preference', async () => {
    const functionImplementation = async (request: IRequestPreference) =>
      AiPreferenceMapper.toRaw(await createPreference.execute(request))

    aiClient.tools = [
      { function: createPreferenceToolConfig, functionImplementation },
    ]

    const body = {
      name: `Mensagem de [Augusto] com número:[(12)12212-1212]`,
      message:
        'Eu gosto de conversas alegres e com emojis! Você poderia me responder assim a partir de agora?',
    }

    await sendMessageAi(body, aiClient)

    expect(inMemoryPreference.preferences[0]).toBeInstanceOf(Preference)
  }, 60000)

  it('should ia list a preference of contact', async () => {
    inMemoryPreference.create(
      makePreference(contact.id, {
        content: 'Gosto de conversar com emoji',
      }),
    )

    const body = {
      name: `Mensagem de [Augusto] com número:[(12)12212-1212]`,
      message: 'Qual as minhas preferências?',
    }

    const preferences = await listPreference.execute({
      phoneNumber: contact.phonenumber,
    })

    addPreferenceContext(preferences, aiClient)

    const response = await sendMessageAi(body, aiClient)

    const regex = /\b(emoji|emojis)\b/i

    expect(regex.test(response)).toBe(true)
  }, 120000)
})
