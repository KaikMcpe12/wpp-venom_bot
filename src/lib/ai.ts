import fs from 'fs';
import { OllamaService } from '../ai/Ollama';
import { loadDataContextService } from "../services/loadDataContextService";

const systemContent = fs.readFileSync('data/system.txt', 'utf-8');

const modelfile = `
FROM llama3.2:1b
SYSTEM "${systemContent.replace(/\n/g, '\\n')}"
`

export async function initializeAi(){
    const context = await loadDataContextService()

    const ollamaClient = new OllamaService(modelfile, context)

    return ollamaClient
    // const res = await ollamaClient.chat({ model: 'llama3.2:1b', messages: [{ role: 'user', content: 'Por que o céu é azul' }] })
}