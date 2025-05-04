import { makeContact } from '../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../test/repository/in-memory-contact-repository'
import { InMemoryContextRepository } from '../../../test/repository/in-memory-context-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UpdateContext } from './update-context-use-case'

describe('Update Context', () => {
  let sut: UpdateContext
  let inMemoryContextRepository: InMemoryContextRepository
  let inMemoryContactRepository: InMemoryContactRepository

  beforeAll(() => {
    inMemoryContextRepository = new InMemoryContextRepository()
    inMemoryContactRepository = new InMemoryContactRepository()

    sut = new UpdateContext(
      inMemoryContextRepository,
      inMemoryContactRepository,
    )
  })

  it('should update context with user and assistant message', async () => {
    const phoneNumber = '8888888888'

    const contact = makeContact({
      phonenumber: phoneNumber,
    })

    await inMemoryContactRepository.create(contact)

    const result = await sut.execute({
      phoneNumber,
      message: 'How are you?',
      response: 'I am fine.',
    })

    expect(result).toBe(true)

    const context = await inMemoryContextRepository.getContext(phoneNumber)

    expect(context.history).toHaveLength(2)
    expect(context.history[0].content).toBe('How are you?')
    expect(context.history[0].role).toBe('user')
    expect(context.history[1].content).toBe('I am fine.')
    expect(context.history[1].role).toBe('assistant')
  })

  it('should throw if context does not exist', async () => {
    await expect(
      sut.execute({
        phoneNumber: 'unknown-user',
        message: 'Test',
        response: 'Test',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
