import { IAiService } from "../ai/interface/IAiService";

export async function sendMessageAiController(message: string, aiService: IAiService){
    const response = await aiService.chat(message)

    return response.message
}