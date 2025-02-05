import { Ollama } from 'ollama'
import { AvailableFunctions, IAiRequest } from './interface/IAiService';

export class OllamaService {
    private ollamaClient!: Ollama;

    constructor (private _context: string, private _tools: IAiRequest[] = []) {
        this.ollamaClient = new Ollama({
            host: 'http://127.0.0.1:11434',
        });
    }

    public async chat(message: string): Promise<{ message: string}> {
        const availableFunctions = this._tools.reduce((acc: AvailableFunctions, tool) => {
            acc[tool.function.function.name] = tool.functionImplementation;
            return acc;
        }, {});

        const response = await this.ollamaClient.chat({
            model: 'llama3.2:1b',
            messages: [
                { role: 'system', content: this._context },
                { role: 'user', content: message },
            ],
            tools: this._tools.map(tool => tool.function)
        })
        console.log('Response:', response);
        
        if (response.message.tool_calls) {
            console.log(availableFunctions)
            for (const tool of response.message.tool_calls) {
                const functionToCall = availableFunctions[tool.function.name];
                if (functionToCall) {
                    console.log('Arguments:', tool.function.arguments);
                    await functionToCall(tool.function.arguments);
                } else {
                    console.log('Function', tool.function.name, 'not found');
                }
            }
        }

        return {
            message: response.message.content,
        }
    }

    public set context(context: string) {
        this._context = context
    }
}