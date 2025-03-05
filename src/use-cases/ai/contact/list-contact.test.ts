import { makeContact } from '../../../../test/factory/make-contact'
import { InMemoryContactRepository } from '../../../../test/repository/in-memory-contact-repository'
import { Contact } from '../../../entities/contact/contact'
import ListContacts from './list-contacts-usecase'

describe('List Contact', () => {
  it('should list all contacts', async () => {
    const prismaContactRepository = new InMemoryContactRepository()
    const listContact = new ListContacts(prismaContactRepository)

    for (let i = 0; i < 10; i++) {
      await prismaContactRepository.create(makeContact())
    }

    const contacts = await listContact.execute()

    expect(contacts).toHaveLength(10)
    contacts.forEach((contact) => {
      expect(contact).toBeInstanceOf(Contact)
    })
  })
})
