import * as venom from 'venom-bot'
import EventEmitter from 'events'

export class VenomClient {
  private _client: venom.Whatsapp | null = null
  private _events: EventEmitter = new EventEmitter()
  private _connectionStatus: 'disconnected' | 'connected' = 'disconnected'

  public async initializeVenom() {
    if (this._connectionStatus === 'connected') return

    try {
      this._client = await venom.create({
        session: 'wpp_venom-bot',
        headless: 'new',
        catchQR: async (base64Qr) => {
          this._events.emit('qrCode', base64Qr)
        },
      })

      this._connectionStatus = 'connected'
      this._events.emit('connected')

      console.log('Venom bot inicializado com sucesso.')
      return this._client
    } catch (err) {
      this._connectionStatus = 'disconnected'
      this._events.emit('qrCodeError')
      throw new Error(`Error initializing venom bot: ${err}`)
    }
  }

  public async terminateVenom(): Promise<void> {
    if (this._client) {
      await this._client.logout()
      this._client = null
      this._connectionStatus = 'disconnected'
    }
  }

  public onMessage(listener: (message: venom.Message) => void) {
    this._client?.onMessage(listener)
  }

  public on(event: string, listener: (...args: any[]) => void): void {
    this._events.on(event, listener)
  }

  public emit(event: string, ...args: any[]): void {
    this._events.emit(event, ...args)
  }

  public get client(): venom.Whatsapp | null {
    return this._client
  }

  public isConnected(): boolean {
    return this._connectionStatus === 'connected'
  }
}
