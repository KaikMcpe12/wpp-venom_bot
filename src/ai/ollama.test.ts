import { sendMessageAiController } from "../controller/sendMessageAiController";
import { initializeAi } from "../lib/ai"
import { IAiService } from "./interface/IAiService";

// let aiClient: IAiService;
// (async () => {
//     aiClient = await initializeAi()
// })()

describe('Test ia chat', () => {
    it('should test normal ia chat', async () => {
        const aiClient = await initializeAi()

        const body = {
            phonenumber: '999999999999',
            message: 'Você atua no WhatsApp de quem? e quem é você?',
        }

        const response = await sendMessageAiController(body, aiClient)
        console.log(response)
        expect(response).toBeTruthy()
    }, 60000)
})