import { IAiService } from '../ai/interface/IAiService'
import { loadDataContextService } from './loadDataContextService'

export async function generateUserContextService(aiClient: IAiService) {
  const modelfile = await loadDataContextService()

  aiClient.context = modelfile
}
