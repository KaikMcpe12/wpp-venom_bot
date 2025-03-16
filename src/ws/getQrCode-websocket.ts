import { FastifyInstance } from 'fastify'
import { wppVenom } from '../lib/wpp-venom'

export function getQrCode(app: FastifyInstance) {
  app.get('/wpp/getqr', { websocket: true }, async (socket) => {
    let isClient = true

    await wppVenom.terminateVenom()
    wppVenom.initializeVenom()

    wppVenom.on('qrCode', (qrCode: string | null) => {
      if (qrCode) {
        socket.send(qrCode)
      } else {
        socket.send('QR Code não encontrado')
      }
    })

    wppVenom.on('qrCodeError', () => {
      wppVenom.terminateVenom()
      if (isClient) {
        wppVenom.initializeVenom()
      }
    })

    socket.on('close', () => {
      isClient = false
      wppVenom.emit('contactDesconected')
    })
  })
}
