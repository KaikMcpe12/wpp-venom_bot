import { ollamaClient } from "../server";
import { loadDataContextService } from "../services/loadDataContextService";

export async function sendMessageOllamaController(message: string){
    const context = await loadDataContextService()

    const response = await ollamaClient.chat({
        model: 'llama3.2:1b',
        messages: [
            { role: 'system', content: context },
            { role: 'user', content: message },
        ]
    })

    return response.message.content
}