import { makeContact } from '../../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import DisableContact from './disable-contact-usecase'

describe('Disable botstatus', () => {
  it('should disable botstatus', async () => {
    const inMemory = new InMemoryContactRepository()
    const disableContact = new DisableContact(inMemory)

    inMemory.create(
      makeContact({ phonenumber: '(12)12212-1212', name: 'Augusto' }),
    )

    await disableContact.execute(inMemory.contacts[0])

    expect(inMemory.contacts[0].botstatus).toBe(false)
  })
})
