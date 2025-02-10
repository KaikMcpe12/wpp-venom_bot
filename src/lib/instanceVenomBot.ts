import * as venom from 'venom-bot';
import { handlerMessageVenomBot } from '../services/processMessage';
import EventEmitter from 'events';

export class Venom {
  private _client: venom.Whatsapp | null = null;
  private _events: EventEmitter = new EventEmitter();

  public initializeVenom = async () => {
    try {
      this._client = await venom.create({
        session: 'wpp_venom-bot',
        headless: 'new',
        autoClose: 10000,
        catchQR: async (base64Qr) => {
          this._events.emit('qrCode', base64Qr);
        },
      });
  
      this._client.onMessage(async (message) => {
        console.log('New message of:', message);
        await handlerMessageVenomBot(this._client!, message)
      });
    } catch (err: Error | any) {
      console.log(err)
      this._events.emit('qrCodeError');
      throw new Error('Error initializing venom bot:', err);
    }
  };

  public terminateVenom = async (): Promise<void> => {
    if (this._client) {
      await this._client.logout();
      this._client = null;
      console.log('Instância do Venom Bot encerrada.');
    }
  };

  public on(event: string, listener: (...args: any[]) => void): void {
    this._events.on(event, listener);
  }

  public emit(event: string, ...args: any[]): void {
    this._events.emit(event,...args);
  }

  public get client(): venom.Whatsapp {
    if (!this._client) {
      throw new Error('Venom bot not initialized');
    }

    return this._client;
  }
}
