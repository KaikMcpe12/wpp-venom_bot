import { makeContact } from '../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../test/repository/in-memory-contact-repository'
import { InMemoryContextRepository } from '../../../test/repository/in-memory-context-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AddUserMessage } from './add-user-message-use-case'
import { GetContext } from './get-context-use-case'

describe('Get User Message', () => {
  let sut: GetContext
  let inMemoryContextRepository: InMemoryContextRepository
  let inMemoryContactRepository: InMemoryContactRepository

  beforeAll(() => {
    inMemoryContextRepository = new InMemoryContextRepository()
    inMemoryContactRepository = new InMemoryContactRepository()

    sut = new GetContext(inMemoryContextRepository, inMemoryContactRepository)
  })

  it('should be able get context message', async () => {
    const phoneNumber = '9999999'

    const contact = makeContact({
      phonenumber: phoneNumber,
    })

    await inMemoryContactRepository.create(contact)

    const addUserMessage = new AddUserMessage(
      inMemoryContextRepository,
      inMemoryContactRepository,
    )

    await addUserMessage.execute({ phoneNumber, message: 'Hi there' })

    const context = await sut.execute({ phoneNumber })

    expect(context.history).toHaveLength(1)
  })

  it('should throw if contact does not exist', async () => {
    await expect(
      sut.execute({ phoneNumber: 'missing-user' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should return nullable history', async () => {
    const phoneNumber = '8888888888'

    const contact = makeContact({
      phonenumber: phoneNumber,
    })

    await inMemoryContactRepository.create(contact)

    const context = await sut.execute({ phoneNumber })

    expect(context.history).toHaveLength(0)
  })
})
