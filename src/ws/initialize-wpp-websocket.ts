import { WebSocket } from '@fastify/websocket'
import { wppVenom } from '../lib/wpp-venom'

const activeSockets = new Set<WebSocket>()
let isInitializing = false

export async function initializeSessionWpp(socket: WebSocket) {
  if (activeSockets.size > 0 || isInitializing) {
    socket.send('Waiting for existing connection')
    socket.close()
    return
  }

  activeSockets.add(socket)
  isInitializing = true

  try {
    wppVenom.on('qrCode', (qrCode: string | null) => {
      if (qrCode) {
        socket.send(qrCode)
      } else {
        socket.send('QR Code não encontrado')
      }
    })

    wppVenom.on('qrCodeError', async () => {
      isInitializing = false
      if (activeSockets.size > 0) {
        await wppVenom.initializeVenom()
      }
    })

    socket.on('close', async () => {
      activeSockets.delete(socket)
      // if (!wppVenom.isConnected()) {
      //   wppVenom.emit('contactDesconected')
      //   console.log('WebSocket fechado')
      //   await wppVenom.terminateVenom()
      // }
    })

    await wppVenom.initializeVenom()
  } catch (error) {
    console.log(error)
    socket.send('Error initializing QR Code')
  }

  isInitializing = false
}
