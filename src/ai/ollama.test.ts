import { makeContact } from '../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../test/repository/in-memory-contact-repository'
import { sendMessageAi } from '../controller/sendMessageAi'
import { Contact } from '../entities/contact/contact'
import { initializeAi } from '../lib/ai'
import { generateUserContextService } from '../services/generate-user-context-service'
import CreateContact from '../use-cases/ai/contact/create-contact-usecase'
import { FindContactByPhoneNumber } from '../use-cases/ai/contact/find-contact-phonenumber-usecase'
import { IAiService } from './interface/IAiService'
import { AiContactMapper } from './mappers/ai-contact-mapper'
import { createContactTool } from './toolsConfig/aiTools'

interface IRequestUser {
  name: string
  phonenumber: string
}

describe('Test ia chat', () => {
  let aiClient: IAiService
  let inMemory: InMemoryContactRepository
  let createContact: CreateContact
  let findContact: FindContactByPhoneNumber

  beforeAll(async () => {
    aiClient = await initializeAi()
    inMemory = new InMemoryContactRepository()

    createContact = new CreateContact(inMemory)
    findContact = new FindContactByPhoneNumber(inMemory)
  })

  beforeEach(() => {
    inMemory.contacts = []
  })

  it('should test normal ia chat', async () => {
    const body = {
      name: 'Diego',
      message: 'Olá tudo bem? Quem é você?',
    }

    const response = await sendMessageAi(body, aiClient)
    expect(response).toBeTruthy()
  }, 60000)

  it('should ia chat create contact', async () => {
    const functionImplementation = async (request: IRequestUser) =>
      AiContactMapper.toRaw(await createContact.execute(request))

    const aiClient = await initializeAi([
      { function: createContactTool, functionImplementation },
    ])

    const contact = await findContact.execute('(12)12212-1212')

    const body = {
      name: `${contact?.name || 'Contato sem nome'} ((12)12212-1212)`,
      message:
        'Crie um novo usuário chamado August com número de telefone (12)12212-1212',
    }

    const response = await sendMessageAi(body, aiClient)
    console.log(response)

    generateUserContextService(aiClient)

    expect(inMemory.contacts[0]).toBeInstanceOf(Contact)
  }, 60000)

  it('should test ia know contact', async () => {
    inMemory.create(
      makeContact({ phonenumber: '(12)12212-1212', name: 'Augusto' }),
    )

    const contact = await findContact.execute('(12)12212-1212')

    await generateUserContextService(aiClient)

    const body = {
      name: `${contact?.name || 'Contato sem nome'} ((12)12212-1212)`,
      message: 'Você sabe meu nome? Qual o meu nome?',
    }

    const response = await sendMessageAi(body, aiClient)
    console.log(response)

    expect(response).toContain('Augusto')
  }, 60000)
})
