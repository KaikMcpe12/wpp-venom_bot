export const createContactTool = {
    type: 'function',
    function: {
        name: 'createContact',
        description: 'Cria um novo contato no banco de dados, para ser lembrado.',
        parameters: {
            type: 'object',
            required: ['name', 'phonenumber'],
            properties: {
                name: { type: 'string', description: 'O nome do contatato para ser cadastrado' },
                phonenumber: { type: 'string', description: 'O número de telefone do contato' }
            }
        }
    }
}
