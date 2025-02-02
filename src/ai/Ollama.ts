import { Ollama } from 'ollama'

export class OllamaService {
    private ollamaClient!: Ollama;

    constructor (modelfile: string, private _context: string) {
        this.ollamaClient = new Ollama({
            host: 'http://127.0.0.1:11434',
        });
    
        (async () => {
            await this.ollamaClient.create({ model: 'llama3.2:1b' }) // não sei pq não está tipado 'modefile', mas precisa passar 
            // ¯\_(ツ)_/¯
        })();
    }

    public async chat(message: string): Promise<{ message: string}> {
        const response = await this.ollamaClient.chat({
            model: 'llama3.2:1b',
            messages: [
                { role: 'system', content: this._context },
                { role: 'user', content: message },
            ]
        })

        return {
            message: response.message.content,
        }
    }

    public set context(context: string) {
        this._context = context
    }
}