import { FastifyInstance } from "fastify";

export function getQrCode(app: FastifyInstance){
  app.get('/wpp/getqr', async (req, reply) => {
    
  })
}