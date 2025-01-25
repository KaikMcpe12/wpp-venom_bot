import * as venom from 'venom-bot';
import { processMessageService } from '../services/processMessage';
import EventEmitter from 'events';

export class Venom {
  private client: venom.Whatsapp | null = null;
  public events: EventEmitter = new EventEmitter();

  public initializeVenom = async () => {
    try {
      this.client = await venom.create({
        session: 'wpp_venom-bot',
        headless: 'new',
        catchQR: async (base64Qr) => {
          this.events.emit('qrCode', base64Qr);
        },
      });
  
      this.client.onMessage(async (message) => {
        console.log('New message of:', message);
        await processMessageService(this.client!, message)
      });
  
      return this.client;
    } catch (err: Error | any) {
      console.log(err)
      throw new Error('Error initializing venom bot:', err);
    }
  };

  public terminateVenom = async (): Promise<void> => {
    if (this.client) {
      await this.client.logout();
      this.client = null;
      console.log('Instância do Venom Bot encerrada.');
    }
  };

  // public getInstanceVenom = async () => { 
  //   if (!this.client) { 
  //     this.client = await this.initializeVenom(); 
  //   }

  //   return this.client; 
  // };

  // public get qrCodeData(): string | null {
  //   return this._qrCodeData;
  // }
}
