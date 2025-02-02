import { Contact } from "../../src/entities/contact/contact";
import { ContactRepository } from "../../src/repositories/contactRepository";

export class InMemoryContactRepository implements ContactRepository {
    public contacts: Contact[] = [];

    async findById(contactId: string): Promise<Contact | null> {
        const contact = this.contacts.find(c => c.id === contactId);

        if(!contact) {
            return null;
        };

        return contact;
    }

    async findByPhoneNumber(phone: string): Promise<Contact | null> {
        const contact = this.contacts.find(c => c.phonenumber === phone);

        if(!contact) {
            return null;
        };

        return contact;
    }

    async listAll(): Promise<Contact[]> {
        const contactsCopy = [...this.contacts];

        return contactsCopy;
    }

    async create(contact: Contact): Promise<Contact> {
        this.contacts.push(contact);

        return contact;
    }

    async save(contact: Contact): Promise<void> {
        const index = this.contacts.findIndex(c => c.id === contact.id);

        if(index >= 0) {
            this.contacts[index] = contact;
        }
    }
}
