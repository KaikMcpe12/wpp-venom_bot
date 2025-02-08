import { InMemoryContactRepository } from "../../test/repository/in-memory-contact-repository";
import { sendMessageAiController } from "../controller/sendMessageAiController";
import { Contact } from "../entities/contact/contact";
import { initializeAi } from "../lib/ai"
import CreateContact from "../use-cases/ai/create-contact-usecase";
import { AiContactMapper } from "./mappers/ai-contact-mapper";
import { createContactTool } from "./toolsConfig/aiTools";

interface IRequestUser {
    name: string;
    phonenumber: string;
}

describe('Test ia chat', () => {
    // it('should test normal ia chat', async () => {
    //     const aiClient = await initializeAi()

    //     const body = {
    //         phonenumber: '999999999999',
    //         message: 'Olá tudo bem? Quem é você?',
    //     }

    //     const response = await sendMessageAiController(body, aiClient)
        
    //     expect(response).toBeTruthy()
    // }, 60000)

    it('should ia chat create contact', async () => {
        const inMemory = new InMemoryContactRepository();
        const createContact = new CreateContact(inMemory);

        const functionImplementation = async (request: IRequestUser) => AiContactMapper.toRaw(await createContact.execute(request)) 

        const aiClient = await initializeAi([{ function: createContactTool, functionImplementation }])

        const body = {
            phonenumber: '999999999999',
            message: 'Crie um novo usuário chamado August com número de telefone 999999999999',
        }

        const response = await sendMessageAiController(body, aiClient)
        console.log(response)
        
        expect(inMemory.contacts[0]).toBeInstanceOf(Contact)
    }, 60000)
})