import { OllamaService } from '../ai/Ollama'
import { loadDataContext } from '../utils/loadDataContextService'

let aiClient: OllamaService | null = null

export async function getAiClient(): Promise<OllamaService> {
  if (!aiClient) {
    const modelfile = await loadDataContext()
    aiClient = new OllamaService(modelfile)
  }
  return aiClient
}
