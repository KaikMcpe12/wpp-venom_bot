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
  private _tools: IAiRequest[] = []
  private model: string = 'llama3.2'

  constructor(private _context: string) {
    this.ollamaClient = new Ollama()
  }

  public async chat(
    message: string,
    argsMessages?: IArgsMessage[],
  ): Promise<{ message: string }> {
    const response = await this.ollamaClient.chat({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: `${this.model}
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
        console.log(output)

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

  public get tools(): IAiRequest[] {
    return this.tools
  }

  public set tools(tools: IAiRequest[]) {
    this._tools = tools

    this.availableFunctions = this._tools.reduce(
      (acc: AvailableFunctions, tool) => {
        acc[tool.function.function.name] = tool.functionImplementation
        return acc
      },
      {},
    )
  }
}
