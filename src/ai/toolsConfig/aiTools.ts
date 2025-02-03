export const createContactTool = {
    type: 'function',
    function: {
        name: 'createContactController',
        description: 'Cria um novo contato no banco de dados',
        parameters: {
            type: 'object',
            required: ['name', 'phonenumber'],
            properties: {
                name: { type: 'string', description: 'O nome do contatato para ser cadastrado' },
                phonenumber: { type: 'number', description: 'O número de telefone do contato' }
            }
        }
    }
}
