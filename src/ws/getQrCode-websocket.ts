import { FastifyInstance } from "fastify";
import { wppVenom } from "../server";

export function getQrCode(app: FastifyInstance){
  app.get('/wpp/getqr', { websocket: true }, async (socket, req) => {
    const clients = app.websocketServer.clients.size;

    await wppVenom.terminateVenom();
    wppVenom.initializeVenom();

    wppVenom.events.on('qrCode', (qrCode: string | null) => {
      if(qrCode){
        socket.send(qrCode)
      } else {
        socket.send('QR Code não encontrado')
      }
    })

    wppVenom.events.on('qrCodeError', () => {
      wppVenom.terminateVenom();
      clients && wppVenom.initializeVenom();
    })

    socket.on('close', () => {     
      console.log('Cliente desconectado do WebSocket.');
      wppVenom.terminateVenom();
    })
  })
}