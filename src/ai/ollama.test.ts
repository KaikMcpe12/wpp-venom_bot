// import { makeContact } from "../../test/factory/make-contact";
// import { InMemoryContactRepository } from "../../test/repository/in-memory-contact-repository";
// import { sendMessageAi } from "../controller/sendMessageAi";
// import { Contact } from "../entities/contact/contact";
// import { initializeAi } from "../lib/ai"
// import { generateUserContextService } from "../services/generate-user-context-service";
// import CreateContact from "../use-cases/ai/contact/create-contact-usecase";
// import { FindContactByPhoneNumber } from "../use-cases/ai/contact/find-contact-phonenumber-usecase";
// import { AiContactMapper } from "./mappers/ai-contact-mapper";
// import { createContactTool } from "./toolsConfig/aiTools";

// interface IRequestUser {
//     name: string;
//     phonenumber: string;
// }

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

    // it('should ia chat create contact', async () => {
    //     const inMemory = new InMemoryContactRepository();
    //     const createContact = new CreateContact(inMemory);

    //     const functionImplementation = async (request: IRequestUser) => AiContactMapper.toRaw(await createContact.execute(request)) 

    //     const aiClient = await initializeAi([{ function: createContactTool, functionImplementation }])

    //     const body = {
    //         phonenumber: '999999999999',
    //         message: 'Crie um novo usuário chamado August com número de telefone 999999999999',
    //     }

    //     const response = await sendMessageAiController(body, aiClient)
        
    //     generateUserContextService(aiClient, inMemory)
        
    //     expect(inMemory.contacts[0]).toBeInstanceOf(Contact)
    // }, 60000)

    // it('should test ia know contact', async () => {
    //     const inMemory = new InMemoryContactRepository();
    //     inMemory.create(makeContact({phonenumber:'(12)12212-1212', name:'Augusto'}))

    //     const findContact = new FindContactByPhoneNumber(inMemory)
    //     const contact = await findContact.execute('(12)12212-1212')

    //     const aiClient = await initializeAi()

    //     await generateUserContextService(aiClient, inMemory)

    //     const body = {
    //         name: `${contact?.name || 'Contato sem nome'} ((12)12212-1212)`,
    //         message: 'Qual o meu nome?',
    //     }

    //     const response = await sendMessageAi(body, aiClient)

    //     console.log(response)

    //     expect(response).toContain('Augusto')
    // }, 60000)
})