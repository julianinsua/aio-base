import {db} from './db/db'
import Fastify from 'fastify'
import "dotenv/config"

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3001 })
    console.log("All good here, listening is good")
    await db.runMigrations()
    console.log("migrations are good")
  } catch (e) {
    console.log("Woopsie!")
    console.log(e)
    fastify.log.error(e)
    process.exit(1)
  }
}

start().then(() => {
  console.log("Just another lovely day in the server")
}).catch((e) => {
  console.log("Woopsie!")
  console.error(e)
})

export default {}
