import { makeContact } from '../../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { FindContactByPhoneNumber } from './find-contact-phonenumber-usecase'

describe('Find contact by phone number', () => {
  it('should return a contact when found', async () => {
    const inMemoryContactRepository = new InMemoryContactRepository()
    const findContact = new FindContactByPhoneNumber(inMemoryContactRepository)

    const contact = makeContact()
    inMemoryContactRepository.contacts.push(contact)

    const foundContact = await findContact.execute(contact.phonenumber)

    expect(foundContact).toBe(contact)
  })

  it('should return null when contact is not found', async () => {
    const inMemoryContactRepository = new InMemoryContactRepository()
    const findContact = new FindContactByPhoneNumber(inMemoryContactRepository)

    await expect(findContact.execute('1234567890')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
