import type { FastifyInstance } from "fastify"
import addAuthRouter from "./routers/authRoutes"
import authorizedRouter from "./routers/authorizedRoutes"

class FastifyServer {
	private readonly app: FastifyInstance

	public constructor(fastify: FastifyInstance) {
		this.app = fastify
	}

	private async initRouter(): Promise<void> {
		await this.app.register(addAuthRouter, { prefix: "/api" })
		await this.app.register(authorizedRouter, {prefix: "/api/v1"})

		// Health Check
		this.app.get("/", async (_request, reply) => {
			return await reply.code(200).send("Hello dude!")
		})
	}

	public async start(): Promise<void> {
		try {
			await this.initRouter()
			await this.app.listen({ port: 8080 })
			console.log("All good here, listening is good")
			console.log("Just another nice day in the server")
		} catch (e) {
			this.app.log.error(e)
			console.log(e)
			process.exit(1)
		}
	}
}

export default FastifyServer
