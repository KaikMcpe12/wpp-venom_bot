import { IAiService } from "../ai/interface/IAiService"
import { ContactRepository } from "../repositories/contactRepository"
import ListContacts from "../use-cases/ai/list-contacts-usecase"
import { loadDataContextService } from "./loadDataContextService"

export async function generateUserContextService(aiClient: IAiService, contactRepository: ContactRepository) {
    const listContacts = new ListContacts(contactRepository)

    const contacts = await listContacts.execute()

    const context = contacts.map(contact => `${contact.name} = ${contact.phonenumber}`).join('\n')

    const modelfile = await loadDataContextService()

    aiClient.context = modelfile + `\nLista de contatos, consulte quando falar com alguem: \n${context}"`
}