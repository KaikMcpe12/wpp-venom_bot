export const createContactTool = {
    type: 'function',
    function: {
        name: 'createContact',
        description: 'Função responsável por criar um novo contato/usuário no banco de dados caso ele não exista. Deve ser executada sempre que um usuário que não está no banco de dados mande uma mensagem. IMPORTANTE: Os parâmetros devem ser passados diretamente, sem um objeto "properties" envolvendo-os.',
        parameters: {
            type: 'object',
            required: ['name', 'phonenumber'],
            properties: {
                name: { 
                    type: 'string', 
                    description: 'O nome do contato para ser cadastrado. Deve ser passado diretamente, sem estar dentro de um objeto "properties".' 
                },
                phonenumber: { 
                    type: 'string', 
                    description: 'O número de telefone do contato. Deve ser passado diretamente, sem estar dentro de um objeto "properties".' 
                }
            }
        }
    }
}