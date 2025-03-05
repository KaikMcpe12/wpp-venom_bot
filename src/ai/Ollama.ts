import { Message, Ollama } from 'ollama'
import {
  AvailableFunctions,
  IAiRequest,
  IAiService,
  IArgsMessage,
} from './interface/IAiService'

export class OllamaService implements IAiService {
  private ollamaClient!: Ollama
  private availableFunctions!: AvailableFunctions

  constructor(
    private _context: string,
    private _tools: IAiRequest[] = [],
  ) {
    this.ollamaClient = new Ollama()

    this.availableFunctions = this._tools.reduce(
      (acc: AvailableFunctions, tool) => {
        acc[tool.function.function.name] = tool.functionImplementation
        return acc
      },
      {},
    )
  }

  public async chat(
    message: string,
    argsMessages?: IArgsMessage[],
  ): Promise<{ message: string }> {
    const response = await this.ollamaClient.chat({
      model: 'llama3.2:1b',
      messages: [
        {
          role: 'system',
          content: `FROM llama3.2:1b
        SYSTEM "${this._context}"`,
        },
        { role: 'user', content: message },
        ...(argsMessages || []),
      ],
      tools: this._tools.map((tool) => tool.function),
      options: {
        temperature: 0.7,
        top_k: 40,
        top_p: 0.9,
      },
    })
    console.log({ role: 'user', content: message })

    if (response.message.tool_calls) {
      return await this.executeFunction(response.message, message)
    }

    return {
      message: response.message.content,
    }
  }

  private async executeFunction(
    message: Message,
    requestUser: string,
  ): Promise<{ message: string }> {
    for (const tool of message.tool_calls!) {
      const functionToCall = this.availableFunctions[tool.function.name]
      if (functionToCall) {
        const output = await functionToCall(tool.function.arguments)

        const response = await this.chat(requestUser, [
          message,
          {
            role: 'tool',
            content: JSON.stringify(output),
          },
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

  public get context(): string {
    return this._context
  }

  public set context(context: string) {
    this._context = context
  }
}
