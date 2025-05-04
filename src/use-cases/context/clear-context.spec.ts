import { makeContact } from '../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../test/repository/in-memory-contact-repository'
import { InMemoryContextRepository } from '../../../test/repository/in-memory-context-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ClearContext } from './clear-context-use-case'

describe('Clear Context', () => {
  let sut: ClearContext
  let inMemoryContextRepository: InMemoryContextRepository
  let inMemoryContactRepository: InMemoryContactRepository

  beforeAll(() => {
    inMemoryContextRepository = new InMemoryContextRepository()
    inMemoryContactRepository = new InMemoryContactRepository()

    sut = new ClearContext(inMemoryContextRepository, inMemoryContactRepository)
  })

  it('should clear existing context', async () => {
    const phoneNumber = '9999999'

    const contact = makeContact({
      phonenumber: phoneNumber,
    })

    await inMemoryContactRepository.create(contact)

    const newContext = {
      history: [
        {
          content: 'Hello',
          role: 'user',
          timestamp: Date.now(),
        },
      ],
      metadata: {},
    }

    await inMemoryContextRepository.saveContext(phoneNumber, newContext)

    expect(await inMemoryContextRepository.getContext(phoneNumber)).toEqual(
      newContext,
    )

    const result = await sut.execute({ phoneNumber })
    expect(result).toBe(true)

    const context = await inMemoryContextRepository.getContext(phoneNumber)
    expect(context.history).toHaveLength(0)
  })

  it('should throw if context does not exist', async () => {
    await expect(
      sut.execute({ phoneNumber: 'unknown-user' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
