import { makeContact } from "../../../test/factory/make-contact";
import { InMemoryContactRepository } from "../../../test/repository/in-memory-contact-repository";
import { FindContactByPhoneNumber } from "./find-contact-phonenumber-usecase";

describe('Find contact by phone number', () => {
    it('should return a contact when found', async () => {
        const prismaContactRepository = new InMemoryContactRepository();
        const findContact = new FindContactByPhoneNumber(prismaContactRepository);

        const contact = makeContact();
        prismaContactRepository.contacts.push(contact);

        const foundContact = await findContact.execute(contact.phonenumber);

        expect(foundContact).toBe(contact);
    })

    it('should return null when contact is not found', async () => {
        const prismaContactRepository = new InMemoryContactRepository();
        const findContact = new FindContactByPhoneNumber(prismaContactRepository);
        
        const foundContact = await findContact.execute('1234567890');

        expect(foundContact).toBeNull();
    })
})