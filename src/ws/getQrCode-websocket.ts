import { FastifyInstance } from "fastify";
import { wppVenom } from "../server";

export function getQrCode(app: FastifyInstance){
  app.get('/wpp/getqr', { websocket: true }, (socket, req) => {
    wppVenom.terminateVenom();
    wppVenom.initializeVenom();

    socket.on('close', () => {
      console.log('Cliente desconectado do WebSocket.');
    })

    wppVenom.events.on('qrCode', (qrCode: string | null) => {
      if(qrCode){
        socket.send(qrCode, 'oi')
      } else {
        socket.send('QR Code não encontrado')
      }
    })
  })
}