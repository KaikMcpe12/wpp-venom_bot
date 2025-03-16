import { env } from '../env'
import { app } from './app'

try {
  app.listen(
    {
      port: env.PORT,
    },
    (err) => {
      console.log(err)
      console.log(`Serve its running on the port ${env.PORT}`)
    },
  )
} catch (err) {
  console.error('Error initializing venom bot:', err)
}
