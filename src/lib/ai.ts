import fs from 'fs';
import { OllamaService } from '../ai/Ollama';
import { IAiRequest } from '../ai/interface/IAiService';

const systemContent = fs.readFileSync('data/system.txt', 'utf-8');

const modelfile = `
FROM llama3.2:1b
SYSTEM "${systemContent.replace(/\n/g, '\\n')}"
`

export async function initializeAi(tools: IAiRequest[] = []): Promise<OllamaService> {
    const ollamaClient = new OllamaService(modelfile, tools)

    return ollamaClient
}