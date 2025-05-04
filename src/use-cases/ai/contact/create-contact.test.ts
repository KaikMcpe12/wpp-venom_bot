import CreateContact from './create-contact-usecase'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import { makeContact } from '../../../../test/factory/make-contact'
import { Contact } from '../../../entities/contact/contact'
import { ContactAlredyExistsError } from '../../errors/contact-alredy-exists-error'

describe('Create Contact', () => {
  it('should create a new contact', async () => {
    const inMemoryContactRepository = new InMemoryContactRepository()
    const createContact = new CreateContact(inMemoryContactRepository)

    const requestUser = makeContact()

    const contact = await createContact.execute(requestUser)

    expect(contact).toBeInstanceOf(Contact)
  })

  it('should throw an error when trying to create a contact with an existing phone number', async () => {
    const inMemoryContactRepository = new InMemoryContactRepository()
    const createContact = new CreateContact(inMemoryContactRepository)

    const phonenumber = '9999999999999'

    await expect(
      createContact.execute(makeContact({ phonenumber })),
    ).resolves.not.toThrow()
    await expect(
      createContact.execute(makeContact({ phonenumber })),
    ).rejects.toBeInstanceOf(ContactAlredyExistsError)
  })
})
