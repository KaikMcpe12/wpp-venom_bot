import { makeContact } from '../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../test/repository/in-memory-contact-repository'
import { InMemoryContextRepository } from '../../../test/repository/in-memory-context-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AddUserMessage } from './add-user-message-use-case'

describe('Add User Message', () => {
  let sut: AddUserMessage
  let inMemoryContextRepository: InMemoryContextRepository
  let inMemoryContactRepository: InMemoryContactRepository

  beforeAll(() => {
    inMemoryContextRepository = new InMemoryContextRepository()
    inMemoryContactRepository = new InMemoryContactRepository()

    sut = new AddUserMessage(
      inMemoryContextRepository,
      inMemoryContactRepository,
    )
  })

  it('should add a message to existing context', async () => {
    const phoneNumber = '9999999'

    const contact = makeContact({
      phonenumber: phoneNumber,
    })

    await inMemoryContactRepository.create(contact)

    const context = await sut.execute({ phoneNumber, message: 'Hi there' })

    expect(context.history).toHaveLength(1)
    expect(context.history[0].content).toBe('Hi there')
  })

  it('should throw if contact does not exist', async () => {
    await expect(
      sut.execute({ phoneNumber: 'missing-user', message: 'hello' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
