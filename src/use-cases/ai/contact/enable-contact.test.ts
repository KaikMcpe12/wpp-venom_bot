import { makeContact } from "../../../../test/factory/make-contact";
import { InMemoryContactRepository } from "../../../../test/repository/in-memory-contact-repository";
import EnableContact from "./enable-contact-usecase"

describe('Enable botstatus', () => {
    it('should enable botstatus', async () => {
        const inMemory = new InMemoryContactRepository();
        const enableContact = new EnableContact(inMemory);

        inMemory.create(makeContact({ phonenumber:'(12)12212-1212', name:'Augusto', botstatus: false }));

        await enableContact.execute(inMemory.contacts[0]);

        expect(inMemory.contacts[0].botstatus).toBe(true);
    })
})