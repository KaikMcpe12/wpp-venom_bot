import { makeContact } from '../../../../test/factory/make-contact'
import { makePreference } from '../../../../test/factory/make-preference'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import { InMemoryPreferenceRepository } from '../../../../test/repository/in-memory-preference-repository'
import { Preference } from '../../../entities/preference/preference'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { ListPreference } from './list-preference-usercase'

describe('List preference', () => {
  let inMemoryPreference: InMemoryPreferenceRepository
  let inMemoryContact: InMemoryContactRepository
  let listPreference: ListPreference
  let contact: any

  beforeEach(async () => {
    inMemoryPreference = new InMemoryPreferenceRepository()
    inMemoryContact = new InMemoryContactRepository()

    listPreference = new ListPreference(inMemoryPreference, inMemoryContact)

    contact = makeContact({ phonenumber: '123456789' })
    await inMemoryContact.create(contact)

    await inMemoryPreference.create(makePreference(contact.id))
    await inMemoryPreference.create(makePreference(contact.id))
  })

  it('should create a new preference', async () => {
    const preferences = await listPreference.execute({
      phoneNumber: '123456789',
    })

    expect(preferences?.length).toBe(2)

    preferences?.forEach((preference) => {
      expect(preference).toBeInstanceOf(Preference)
    })

    contact.preferences = preferences!

    expect(contact.preferences.length).toBe(2)
  })

  it('should not seach a contact', async () => {
    await expect(
      listPreference.execute({
        phoneNumber: '987654321',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should return null if there is no preference', async () => {
    contact = makeContact({ phonenumber: '1234567892' })
    await inMemoryContact.create(contact)

    const preferences = await listPreference.execute({
      phoneNumber: '1234567892',
    })

    expect(preferences).toBeNull()
  })
})
