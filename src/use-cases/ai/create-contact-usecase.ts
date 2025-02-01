import { Contact } from "../../entities/contact/contact";
import { ContactRepository } from "../../repositories/contactRepository";
import { generateContextService } from "../../services/generate-context-service";

interface IRequestUser {
    name: string;
    phonenumber: string
}

export default async function createContact(requestUser: IRequestUser, contactRepository: ContactRepository): Promise<Contact> {
    const { name, phonenumber } = requestUser;

    if(!name || !phonenumber) throw new Error("Invalid user data");

    const existingContact = await contactRepository.findByPhoneNumber(phonenumber);

    if(existingContact) throw new Error("Contact already exists");

    const contact = new Contact({
        name: name, 
        phonenumber: phonenumber
    });

    const response = await contactRepository.create(contact);

    if(!response) throw new Error("Failed to create contact");

    await generateContextService()

    return response;
}