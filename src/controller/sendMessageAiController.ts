import { IAiService } from "../ai/interface/IAiService";

interface IBody {
    phonenumber: string;
    message: string;
}

export async function sendMessageAiController(body: IBody, aiService: IAiService){
    const message = `${body.phonenumber}: ${body.message.trim() || 'Nenhum texto enviado'}`

    const response = await aiService.chat(message, [])

    return response.message
}