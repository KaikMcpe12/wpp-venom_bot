import { IAiService } from "../ai/interface/IAiService";

interface IBody {
    name: string;
    message: string;
}

export async function sendMessageAi(body: IBody, aiService: IAiService){
    const message = `${body.name}: ${body.message.trim() || 'Nenhum texto enviado'}`

    const response = await aiService.chat(message)

    return response.message
}