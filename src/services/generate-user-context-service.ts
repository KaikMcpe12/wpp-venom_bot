import { IAiService } from "../ai/interface/IAiService"
import { ContactRepository } from "../repositories/contactRepository"
import { loadDataContextService } from "./loadDataContextService"

export async function generateUserContextService(aiClient: IAiService, contactRepository: ContactRepository) {
    const modelfile = await loadDataContextService()

    aiClient.context = modelfile
}