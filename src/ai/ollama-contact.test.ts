import { makeContact } from '../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../test/repository/in-memory-contact-repository'
import { sendMessageAi } from '../controller/sendMessageAi'
import { Contact } from '../entities/contact/contact'
import { initializeAi } from '../lib/ai'
import CreateContact from '../use-cases/ai/contact/create-contact-usecase'
import { FindContactByPhoneNumber } from '../use-cases/ai/contact/find-contact-phonenumber-usecase'
import ListContacts from '../use-cases/ai/contact/list-contacts-usecase'
import { IAiService } from './interface/IAiService'
import { AiContactMapper } from './mappers/ai-contact-mapper'
import { createContactTool, listContactsTool } from './toolsConfig/aiTools'

interface IRequestUser {
  name: string
  phonenumber: string
}

describe.skip('Test contact functions', () => {
  let aiClient: IAiService
  let inMemory: InMemoryContactRepository
  let createContact: CreateContact
  let findContact: FindContactByPhoneNumber
  let listContacts: ListContacts

  beforeAll(async () => {
    aiClient = await initializeAi()
    inMemory = new InMemoryContactRepository()

    createContact = new CreateContact(inMemory)
    findContact = new FindContactByPhoneNumber(inMemory)
    listContacts = new ListContacts(inMemory)
  })

  beforeEach(() => {
    inMemory.contacts = []
  })

  it('should ia chat create contact', async () => {
    const functionImplementation = async (request: IRequestUser) =>
      AiContactMapper.toRaw(await createContact.execute(request))

    aiClient.tools = [{ function: createContactTool, functionImplementation }]

    const contact = await findContact.execute('(12)12212-1212')

    const body = {
      name: `[${contact?.name || 'Contato sem nome'}] [(12)12212-1212]`,
      message:
        'Crie um novo usuário chamado August com número de telefone (12)12212-1212',
    }

    await sendMessageAi(body, aiClient)

    expect(inMemory.contacts[0]).toBeInstanceOf(Contact)
  }, 120000)

  it('should test ia know contact', async () => {
    inMemory.create(
      makeContact({ phonenumber: '(12)12212-1212', name: 'Augusto' }),
    )

    const contact = await findContact.execute('(12)12212-1212')

    const body = {
      name: `[${contact?.name || 'Contato sem nome'}] [(12)12212-1212]`,
      message: 'Você sabe meu nome? Qual o meu nome?',
    }

    const response = await sendMessageAi(body, aiClient)

    expect(response).toContain('Augusto')
  }, 120000)

  it('should list all contacts', async () => {
    inMemory.create(makeContact())
    inMemory.create(makeContact())

    const functionImplementation = async () =>
      (await listContacts.execute()).map((contact) =>
        AiContactMapper.toRaw(contact),
      )

    aiClient.tools = [{ function: listContactsTool, functionImplementation }]

    const body = {
      name: `Augusto`,
      message:
        'Pode me dizer se estou cadastrado na lista de usuários? Diga sim ou não',
    }

    const response = await sendMessageAi(body, aiClient)

    expect(response).toContain('não')
  }, 120000)
})
