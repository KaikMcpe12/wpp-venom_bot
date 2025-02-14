import { Contact } from "../../entities/contact/contact";
import { ContactRepository } from "../../repositories/contactRepository";

export default class DisableContact {
    constructor(private contactRepository: ContactRepository){}

    public async execute(contact: Contact): Promise<void> {
        contact.turnoffbot();

        await this.contactRepository.save(contact);
    }
}