import { OllamaService } from '../ai/Ollama';
import { IAiRequest } from '../ai/interface/IAiService';
import { loadDataContextService } from '../services/loadDataContextService';

export async function initializeAi(tools: IAiRequest[] = []): Promise<OllamaService> {
    const modelfile = await loadDataContextService()

    const ollamaClient = new OllamaService(modelfile, tools)

    return ollamaClient
}