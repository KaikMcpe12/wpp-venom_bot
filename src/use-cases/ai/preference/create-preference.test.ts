import { makeContact } from '../../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import { InMemoryPreferenceRepository } from '../../../../test/repository/in-memory-preference-repository'
import { CreatePreference } from './create-preference-usecase'

describe('Create preference', () => {
  it('should create a new preference', async () => {
    const inMemoryPreference = new InMemoryPreferenceRepository()
    const inMemoryContact = new InMemoryContactRepository()
    const createPreference = new CreatePreference(
      inMemoryPreference,
      inMemoryContact,
    )

    await inMemoryContact.create(makeContact( { phonenumber: '123456789' }))

    await createPreference.execute({
        phoneNumber: '123456789',
        content: 'I like the green'
    })

    expect(inMemoryPreference.preferences.length).toBe(1)
    expect(inMemoryPreference.preferences[0].content).toBe('I like the green')
    expect(inMemoryPreference.preferences[0].contactId).toBe(inMemoryContact.contacts[0].id)
  })
})
