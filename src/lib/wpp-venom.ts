import * as venom from 'venom-bot'
import { handlerMessageVenomBot } from '../utils/processMessage'
import EventEmitter from 'events'

export class Venom {
  private _client: venom.Whatsapp | null = null
  private _events: EventEmitter = new EventEmitter()

  public async initializeVenom() {
    let connectedCanceled: boolean = false

    this.on('contactDesconected', () => {
      connectedCanceled = true
    })

    try {
      if (connectedCanceled) {
        throw new Error('Initialization cancelled due to disconnection')
      }

      this._client = await venom.create({
        session: 'wpp_venom-bot',
        headless: 'new',
        autoClose: 10000,
        catchQR: async (base64Qr) => {
          this._events.emit('qrCode', base64Qr)
        },
      })

      this._client.onMessage(async (message) => {
        console.log('New message of:', message)
        await handlerMessageVenomBot(this._client!, message)
      })

      console.log('Venom bot inicializado com sucesso.')
      return this._client
    } catch (err) {
      this._events.emit('qrCodeError')
      console.error('Error initializing venom bot:', err)
      throw new Error(`Error initializing venom bot: ${err}`)
    }
  }

  public async terminateVenom(): Promise<void> {
    if (this._client) {
      await this._client.logout()
      this._client = null
      console.log('Instância do Venom Bot encerrada.')
    }
  }

  public on(event: string, listener: (...args: any[]) => void): void {
    this._events.on(event, listener)
  }

  public emit(event: string, ...args: any[]): void {
    this._events.emit(event, ...args)
  }

  public get client(): venom.Whatsapp | null {
    if (!this._client) {
      return null
    }

    return this._client
  }
}

export const wppVenom = new Venom()
