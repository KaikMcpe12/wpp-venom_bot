import { Ollama } from 'ollama';

class ContactManager {
  constructor() {
    this.contacts = new Map();
    this.preferences = new Map();
    this.ollama = new Ollama();
    this.loadData();
    this.initializeCustomModel();
  }

  async initializeCustomModel() {
    try {
      // Cria um modelo personalizado
      await this.ollama.create({
        model: 'llama3.2:1b',
        modelfile: `
FROM mistral
PARAMETER temperature 0.7
SYSTEM You are a helpful, respectful, and honest assistant designed to help users. Your name is Jonas.
        `
      });
    } catch (error) {
      console.error('Erro ao criar modelo personalizado:', error);
    }
  }

  // Salva tanto contatos quanto preferências
  saveData() {
    try {
      const fs = require('fs');
      const data = {
        contacts: Object.fromEntries(this.contacts),
        preferences: Object.fromEntries(this.preferences)
      };
      fs.writeFileSync('userdata.json', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }

  // Carrega contatos e preferências
  loadData() {
    try {
      const fs = require('fs');
      if (fs.existsSync('userdata.json')) {
        const data = JSON.parse(fs.readFileSync('userdata.json', 'utf8'));
        this.contacts = new Map(Object.entries(data.contacts || {}));
        this.preferences = new Map(Object.entries(data.preferences || {}));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  // Adiciona ou atualiza um contato
  addContact(phone, name) {
    const formattedPhone = this.formatPhone(phone);
    this.contacts.set(formattedPhone, name);
    
    // Inicializa preferências padrão se não existirem
    if (!this.preferences.has(formattedPhone)) {
      this.preferences.set(formattedPhone, {
        language: 'pt-BR',
        model: 'llama3.2:1b',
        temperature: 0.7,
        systemPrompt: 'Você é um assistente amigável e prestativo.',
        notifications: true,
        timezone: 'America/Sao_Paulo',
        topics: []
      });
    }
    
    this.saveData();
  }

  // Atualiza as preferências de um usuário
  updatePreferences(phone, newPreferences) {
    const formattedPhone = this.formatPhone(phone);
    if (!this.contacts.has(formattedPhone)) {
      throw new Error('Contato não encontrado');
    }

    const currentPrefs = this.preferences.get(formattedPhone) || {};
    this.preferences.set(formattedPhone, {
      ...currentPrefs,
      ...newPreferences
    });
    
    this.saveData();
  }

  // Obtém as preferências de um usuário
  getPreferences(phone) {
    const formattedPhone = this.formatPhone(phone);
    return this.preferences.get(formattedPhone) || null;
  }

  formatPhone(phone) {
    return phone.replace(/\D/g, '');
  }

  getContactName(phone) {
    return this.contacts.get(this.formatPhone(phone)) || null;
  }

  // Processa uma mensagem levando em conta as preferências do usuário
  async processMessage(message) {
    const phoneRegex = /\((\d{2})\)(\d{5})-(\d{4})/;
    const match = message.match(phoneRegex);
    
    if (!match) {
      throw new Error('Número de telefone não encontrado na mensagem');
    }

    const fullPhone = match[0];
    const formattedPhone = this.formatPhone(fullPhone);
    const contactName = this.getContactName(formattedPhone);
    const userPrefs = this.getPreferences(formattedPhone);

    if (!userPrefs) {
      throw new Error('Preferências do usuário não encontradas');
    }

    // Substitui o número pelo nome se disponível
    const processedMessage = contactName ? 
      message.replace(fullPhone, `${contactName} (${fullPhone})`) : 
      message;

    // Monta o contexto com as preferências do usuário
    const context = [
      {
        role: 'system',
        content: userPrefs.systemPrompt
      },
      {
        role: 'user',
        content: processedMessage
      }
    ];

    // Processa a mensagem com o Ollama usando as preferências do usuário
    const response = await this.ollama.chat({
      model: userPrefs.model,
      messages: context,
      options: {
        temperature: userPrefs.temperature
      }
    });
    console.log(context)

    return response;
  }

  // Métodos de utilidade para gerenciar tópicos de interesse
  addTopic(phone, topic) {
    const prefs = this.getPreferences(phone);
    if (prefs && !prefs.topics.includes(topic)) {
      prefs.topics.push(topic);
      this.updatePreferences(phone, { topics: prefs.topics });
    }
  }

  removeTopic(phone, topic) {
    const prefs = this.getPreferences(phone);
    if (prefs) {
      prefs.topics = prefs.topics.filter(t => t !== topic);
      this.updatePreferences(phone, { topics: prefs.topics });
    }
  }
}

// Exemplo de uso
async function main() {
  const manager = new ContactManager();
  
  // Adiciona um contato com preferências padrão
  manager.addContact('(12)12212-1212', 'Contato sem nome');
  
  // Atualiza preferências específicas
  manager.updatePreferences('(12)12212-1212', {
    language: 'en',
    temperature: 0.9,
    systemPrompt: 'You are a friendly assistant that likes to use emojis.'
  });
  
  // Adiciona tópicos de interesse
  manager.addTopic('(12)12212-1212', 'tecnologia');
  manager.addTopic('(12)12212-1212', 'música');
  
  // Processa uma mensagem
  const message = '(12)12212-1212: Você sabe meu nome? Qual?';
  const response = await manager.processMessage(message);
  console.log(response);
}

main();

export default ContactManager;