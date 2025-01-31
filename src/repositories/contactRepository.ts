import { Contact } from "../entities/user/user";

export abstract class ContactRepository{
    abstract findById(contactId: string): Promise<Contact | null>;
    abstract findByPhoneNumber(phone: string): Promise<Contact | null>;
    abstract create(contact: Contact): Promise<void>; 
    abstract save(contact: Contact): Promise<void>;
}