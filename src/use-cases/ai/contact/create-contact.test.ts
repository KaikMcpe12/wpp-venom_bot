import CreateContact from "./create-contact-usecase";
import { InMemoryContactRepository } from "../../../../test/repository/in-memory-contact-repository";
import { makeContact } from "../../../../test/factory/make-contact";
import { Contact } from "../../../entities/contact/contact";

describe('Create Contact', () => {
    it('should create a new contact', async () => {
        const prismaContactRepository = new InMemoryContactRepository();
        const createContact = new CreateContact(prismaContactRepository);
    
        const requestUser = makeContact()
    
        const contact = await createContact.execute(requestUser);

        expect(contact).toBeInstanceOf(Contact);
    })

    it('should throw an error when trying to create a contact with an existing phone number', async () => {
        const prismaContactRepository = new InMemoryContactRepository();
        const createContact = new CreateContact(prismaContactRepository);

        const phonenumber = '9999999999999';

        await expect(createContact.execute(makeContact({phonenumber}))).resolves.not.toThrow();
        await expect(createContact.execute(makeContact({phonenumber}))).rejects.toThrow(new Error("Contact already exists"));
    })

    it('should throw an error when trying to create a contact with invalid data', async () => {
        const prismaContactRepository = new InMemoryContactRepository();
        const createContact = new CreateContact(prismaContactRepository);

        await expect(createContact.execute(makeContact({ name: '', phonenumber: ''  }))).rejects.toThrow(new Error("Invalid user data"));
    })
})