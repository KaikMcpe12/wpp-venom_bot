import fs from 'fs';
import { Ollama } from 'ollama'

const systemContent = fs.readFileSync('data/system.txt', 'utf-8');

const modelfile = `
FROM llama3.2:1b
SYSTEM "${systemContent.replace(/\n/g, '\\n')}"
`

export async function initializeOllama(){
    const ollamaClient = new Ollama({
        host: 'http://127.0.0.1:11434'
    })

    await ollamaClient.create({ model: 'llama3.2:1b', modelfile })

    return ollamaClient
    // const res = await ollamaClient.chat({ model: 'llama3.2:1b', messages: [{ role: 'user', content: 'Por que o céu é azul' }] })
}