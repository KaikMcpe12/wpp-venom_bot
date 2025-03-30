import { FastifyInstance } from 'fastify'
import { wppVenom } from '../lib/wpp-venom'

const activeSockets = new Set<WebSocket>()
let isInitializing = false

export function getQrCode(app: FastifyInstance) {
  app.get('/wpp/getqr', { websocket: true }, async (socket) => {
    if (activeSockets.size > 0 || isInitializing) {
      socket.send('Waiting for existing connection')
      socket.close()
      return
    }

    activeSockets.add(socket)
    isInitializing = true

    await wppVenom.terminateVenom()

    try {
      wppVenom.on('qrCode', (qrCode: string | null) => {
        if (qrCode) {
          socket.send(qrCode)
        } else {
          socket.send('QR Code não encontrado')
        }
      })

      wppVenom.on('qrCodeError', async () => {
        await wppVenom.terminateVenom()
        isInitializing = false
        if (activeSockets.size > 0) {
          await wppVenom.initializeVenom()
        }
      })

      socket.on('close', async () => {
        activeSockets.delete(socket)
        wppVenom.emit('contactDesconected')
        console.log('WebSocket fechado')
        await wppVenom.terminateVenom()
      })

      await wppVenom.initializeVenom()
    } catch (error) {
      console.log(error)
      isInitializing = false
    }
  })
}
