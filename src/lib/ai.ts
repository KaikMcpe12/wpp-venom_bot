import { OllamaService } from '../ai/Ollama'
import { loadDataContextService } from '../services/loadDataContextService'

export async function initializeAi(): Promise<OllamaService> {
  const modelfile = await loadDataContextService()

  const ollamaClient = new OllamaService(modelfile)

  return ollamaClient
}
