import { WebSocket } from '@fastify/websocket'
import { WppFactory } from '../wpp/factories/wpp-factory'
import { MessageHandler } from '../utils/message-handler'
import { VenomClient } from '../lib/wpp-venom'

enum ConnectionStatus {
  IDLE = 'idle',
  CONNECTING = 'connecting',
  CONNECTED = 'connected'
}

export class WppSessionManager { 
  private static activeSockets = new Set<WebSocket>()
  private static status: ConnectionStatus = ConnectionStatus.IDLE

  public static async handleConnection(socket: WebSocket) {
    const venomClient = WppFactory.getVenomClient()
    
    if (await this.shouldRejectConnection(socket, venomClient)) return

    this.registerSocket(socket)

    try {
      await this.initializeSession(venomClient, socket)
      this.setupMessageHandler(venomClient)
    } catch (error) {
      this.handleError(error, socket)
    } finally {
      socket.send('Connection established')
      this.cleanupConnection(socket)
    }
  }

  private static async shouldRejectConnection(socket: WebSocket, client: VenomClient): Promise<boolean> {
    if (this.status !== ConnectionStatus.IDLE || await client.isConnected()) {
      socket.send('Waiting for existing connection')
      socket.close(1008)
      return true
    }
    return false
  }

  private static registerSocket(socket: WebSocket) {
    this.activeSockets.add(socket)
    this.status = ConnectionStatus.CONNECTING
    socket.on('close', () => this.cleanupConnection(socket))
  }

  private static async initializeSession(client: VenomClient, socket: WebSocket) {
    const qrHandler = (qr: string) => socket.send(qr)
    const errorHandler = (error: Error) => {
      socket.send(`Erro: ${error.message}`)
      this.cleanupConnection(socket)
    }

    client.on('qrCode', qrHandler)
    client.on('qrCodeError', errorHandler)

    await client.initializeVenom()
    this.status = ConnectionStatus.CONNECTED
  }

  private static setupMessageHandler(client: VenomClient) {
    const repository = WppFactory.getWppService()
    const messageHandler = new MessageHandler(repository)
    client.onMessage(messageHandler.handler.bind(messageHandler))
  }

  private static handleError(error: unknown, socket: WebSocket) {
    console.error('Error initializing QR Code:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    socket.send(`Error initializing QR Code: ${message}`)
  }

  private static cleanupConnection(socket: WebSocket) {
    this.activeSockets.delete(socket)
    this.status = ConnectionStatus.IDLE
    socket.close(1000, 'Connection closed')
  }
}
