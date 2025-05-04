import { makeContact } from '../../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import { InMemoryPreferenceRepository } from '../../../../test/repository/in-memory-preference-repository'
import { CreatePreference } from './create-preference-usecase'

describe('Create preference', () => {
  it('should create a new preference', async () => {
    const inMemoryPreferenceRepository = new InMemoryPreferenceRepository()
    const inMemoryContactRepository = new InMemoryContactRepository()
    const createPreference = new CreatePreference(
      inMemoryPreferenceRepository,
      inMemoryContactRepository,
    )

    await inMemoryContactRepository.create(
      makeContact({ phonenumber: '123456789' }),
    )

    await createPreference.execute({
      phoneNumber: '123456789',
      content: 'I like the green',
    })

    expect(inMemoryPreferenceRepository.preferences.length).toBe(1)
    expect(inMemoryPreferenceRepository.preferences[0].content).toBe(
      'I like the green',
    )
    expect(inMemoryPreferenceRepository.preferences[0].contactId).toBe(
      inMemoryContactRepository.contacts[0].id,
    )
  })
})
