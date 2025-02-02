import { Contact } from "../../entities/contact/contact";
import { ContactRepository } from "../../repositories/contactRepository";

interface IRequestUser {
    name: string;
    phonenumber: string
}

export default class CreateContact {
    constructor(private contactRepository: ContactRepository){}

    async execute(requestUser: IRequestUser): Promise<Contact> {
        const { name, phonenumber } = requestUser;
    
        if(!name || !phonenumber) throw new Error("Invalid user data");
    
        const existingContact = await this.contactRepository.findByPhoneNumber(phonenumber);
    
        if(existingContact) throw new Error("Contact already exists");
    
        const contact = new Contact({
            name: name, 
            phonenumber: phonenumber
        });
    
        const response = await this.contactRepository.create(contact);
    
        if(!response) throw new Error("Failed to create contact");
        
        return response;
    }
}
