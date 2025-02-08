import { Message, Ollama, ToolCall } from 'ollama'
import { AvailableFunctions, IAiRequest } from './interface/IAiService';

export class OllamaService {
    private ollamaClient!: Ollama;
    private availableFunctions!: AvailableFunctions;

    constructor (private _context: string, private _tools: IAiRequest[] = []) {
        this.ollamaClient = new Ollama({
            host: 'http://127.0.0.1:11434',
        });

        this.availableFunctions = this._tools.reduce((acc: AvailableFunctions, tool) => {
            acc[tool.function.function.name] = tool.functionImplementation;
            return acc;
        }, {});
    }

    public async chat(message: string, argsMessages?: { role: string, content: any }[]): Promise<{ message: string}> {
        const response = await this.ollamaClient.chat({
            model: 'llama3.2:1b',
            messages: [
                { role: 'system', content: this._context },
                { role: 'user', content: message },
                ...(argsMessages || [])
            ],
            tools: this._tools.map(tool => tool.function)
        })
        console.log([
            { role: 'system', content: this._context },
            { role: 'user', content: message },
            ...(argsMessages || [])
        ])
        
        if (response.message.tool_calls) {
            return await this.executeFunction(response.message, message)
        }

        return {
            message: response.message.content,
        }
    }

    private async executeFunction(message: Message, requestUser: string): Promise<{ message: string }> {
        for (const tool of message.tool_calls!) {
            const functionToCall = this.availableFunctions[tool.function.name];
            if (functionToCall) {
                // console.log('Arguments:', tool.function.arguments);
                const output = await functionToCall(tool.function.arguments);

                const response = await this.chat(requestUser, [
                    message, 
                    {
                        role: 'tool',
                        content: JSON.stringify(output),
                    }
                ])

                return {
                    message: response.message,
                }
            } 
        }
        return {
            message: `Function not found`,
        }
    }

    public set context(context: string) {
        this._context = context
    }
}