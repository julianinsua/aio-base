import Fastify from "fastify"
import "dotenv/config"
import FastifyServer from "frameworks/fastifySpecific"

const fastify = Fastify({
	logger: true,
})

const fastifyServer = new FastifyServer(fastify)

fastifyServer.start().catch((e) => {})
