import * as venom from 'venom-bot';

let client: venom.Whatsapp;

export const initializeVenom = async () => {
  try {
    client = await venom.create({
      session: 'wpp_venom-bot',
      headless: false
    });

    client.onMessage(async (message) => {
      console.log('New message of:', message);
    });

    return client;
  } catch (err: Error | any) {
    console.log(err)
    throw new Error('Error initializing venom bot:', err);
  }
};

export const getInstanceVenom = async () => { 
  if (!client) { 
    client = await initializeVenom(); 
  } 
  return client; 
};
