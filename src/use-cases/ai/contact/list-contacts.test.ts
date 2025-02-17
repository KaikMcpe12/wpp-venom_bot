import CreateContact from "./create-contact-usecase";
import { InMemoryContactRepository } from "../../../../test/repository/in-memory-contact-repository";
import { makeContact } from "../../../../test/factory/make-contact";
import { Contact } from "../../../entities/contact/contact";
import ListContacts from "./list-contacts-usecase";

describe('List Contact', () => {
    it('should list all contacts', async () => {
        const prismaContactRepository = new InMemoryContactRepository();
        const createContact = new CreateContact(prismaContactRepository);
        const listContacts = new ListContacts(prismaContactRepository);
    
        for (let i = 0; i < 10; i++) {
            await createContact.execute(makeContact());
        }

        const contacts = await listContacts.execute();

        contacts.forEach(contact => {
            expect(contact).toBeInstanceOf(Contact);
        });
    })
})