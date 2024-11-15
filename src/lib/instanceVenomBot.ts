import fp from 'fastify-plugin'
import * as venom from 'venom-bot'

async function venomBotPlugin(fastify: any, options: any) {
    fastify.decorate('venomBot', null)

    fastify.addHook('onReady', async () => {
        try {
            const wpp = await venom.create(
                'wpp-venombot',
                (base64Qr, asciiQR) => {
                    console.log(asciiQR)
                },
                undefined,
                { logQR: false }
            )
            
            fastify.venomBot = wpp

            fastify.log.info('Venom Bot initialized successfully');
        } catch (error) {
            fastify.log.error('Error initializing venom bot:', error)
            throw error
        }
    })
}

export default fp(venomBotPlugin)
