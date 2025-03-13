export const createContactTool = {
  type: 'function',
  function: {
    name: 'createContact',
    description:
      'Função responsável por criar um novo contato/usuário no banco de dados caso ele não exista. Deve ser executada sempre que um usuário que não está no banco de dados mande uma mensagem, após isso siga o fluxo da mensagem. IMPORTANTE: Os parâmetros devem ser passados diretamente, sem um objeto "properties" envolvendo-os.',
    parameters: {
      type: 'object',
      required: ['name', 'phonenumber'],
      properties: {
        name: {
          type: 'string',
          description:
            'O nome do contato para ser cadastrado. Deve ser passado diretamente, sem estar dentro de um objeto "properties".',
        },
        phonenumber: {
          type: 'string',
          description:
            'O número de telefone do contato. Deve ser passado diretamente, sem estar dentro de um objeto "properties".',
        },
      },
    },
  },
}

export const listContactsTool = {
  type: 'function',
  function: {
    name: 'listContact',
    description:
      'Lista todos os contatos para gerenciar os contatos. IMPORTANTE: Os parâmetros devem ser passados diretamente, sem um objeto "properties" envolvendo-os.',
    parameters: {
      type: 'object',
      required: [],
      properties: {},
    },
  },
}

export const createPreferenceTool = {
  type: 'function',
  function: {
    name: 'createPreference',
    description:
      'Adiciona uma nova preferência específica ao perfil do usuário, como estilo de conversa, tópicos de interesse ou tom de comunicação sobre como a IA deve se comunicar com este usuário específico. IMPORTANTE: Os parâmetros devem ser passados diretamente, sem um objeto "properties" envolvendo-os.',
    parameters: {
      type: 'object',
      required: ['phoneNumber', 'content'],
      properties: {
        phoneNumber: {
          type: 'string',
          description:
            'Número de telefone do usuário para identificação do perfil. Deve ser passado diretamente, sem estar dentro de um objeto "properties".',
        },
        content: {
          type: 'string',
          description:
            'Valor específico da preferência (ex: "alegre", "técnico", "conciso"). Deve ser passado diretamente, sem estar dentro de um objeto "properties".',
        },
      },
    },
  },
}
