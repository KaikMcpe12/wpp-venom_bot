import { makeContact } from '../../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import EnableContact from './enable-contact-usecase'

describe('Enable botstatus', () => {
  it('should enable botstatus', async () => {
    const inMemoryContactRepository = new InMemoryContactRepository()
    const enableContact = new EnableContact(inMemoryContactRepository)

    inMemoryContactRepository.create(
      makeContact({
        phonenumber: '(12)12212-1212',
        name: 'Augusto',
        botstatus: false,
      }),
    )

    await enableContact.execute(inMemoryContactRepository.contacts[0])

    expect(inMemoryContactRepository.contacts[0].botstatus).toBe(true)
  })
})
