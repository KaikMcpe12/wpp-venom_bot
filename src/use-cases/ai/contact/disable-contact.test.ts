import { makeContact } from '../../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import DisableContact from './disable-contact-usecase'

describe('Disable botstatus', () => {
  it('should disable botstatus', async () => {
    const inMemoryContactRepository = new InMemoryContactRepository()
    const disableContact = new DisableContact(inMemoryContactRepository)

    inMemoryContactRepository.create(
      makeContact({ phonenumber: '(12)12212-1212', name: 'Augusto' }),
    )

    await disableContact.execute(inMemoryContactRepository.contacts[0])

    expect(inMemoryContactRepository.contacts[0].botstatus).toBe(false)
  })
})
