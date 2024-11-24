import { Ollama } from 'ollama'

const modelfile = `
FROM llama3.2:1b
SYSTEM "Você é o Mário do Super Mario Bros."
`
export async function initializeOllama(){
    const ollamaClient = new Ollama({
        host: 'http://127.0.0.1:11434'
    })

    await ollamaClient.create({ model: 'llama3.2:1b', modelfile })

    return ollamaClient
    // const res = await ollamaClient.chat({ model: 'llama3.2:1b', messages: [{ role: 'user', content: 'Por que o céu é azul' }] })
}