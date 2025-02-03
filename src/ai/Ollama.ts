import { Ollama } from 'ollama'
import { AvailableFunctions, IAiRequest } from './interface/IAiService';

export class OllamaService {
    private ollamaClient!: Ollama;

    constructor (modelfile: string, private _context: string) {
        this.ollamaClient = new Ollama({
            host: 'http://127.0.0.1:11434',
        });

        // this.ollamaClient.create({ model: 'llama3.2:1b', from: modelfile });
    
        // (async () => {
        //     await this.ollamaClient.create({ model: 'llama3.2:1b', from: modelfile }) // não sei pq não está tipado 'modefile', mas precisa passar 
        //     // ¯\_(ツ)_/¯
        // })();
    }

    public async chat(message: string, tools: IAiRequest[]): Promise<{ message: string}> {
        const availableFunctions = tools.reduce((acc: AvailableFunctions, tool) => {
            acc[tool.function.function.name] = tool.functionImplementation;
            return acc;
        }, {});

        const response = await this.ollamaClient.chat({
            model: 'llama3.2:1b',
            messages: [
                { role: 'system', content: this._context },
                { role: 'user', content: message },
            ],
            tools: tools.map(tool => tool.function)
        })
    
        if (response.message.tool_calls) {
            for (const tool of response.message.tool_calls) {
                const functionToCall = availableFunctions[tool.function.name];
                if (functionToCall) {
                    console.log('Calling function:', tool.function.name);
                    console.log('Arguments:', tool.function.arguments);
                    await functionToCall(tool.function.arguments);
                    console.log('Function executed successfully');
                } else {
                    console.log('Function', tool.function.name, 'not found');
                }
            }
        } else {
            console.log('No tool calls returned from model');
        }

        return {
            message: response.message.content,
        }
    }

    public set context(context: string) {
        this._context = context
    }
}