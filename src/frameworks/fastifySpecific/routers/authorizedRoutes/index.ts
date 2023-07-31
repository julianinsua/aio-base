import { type FastifyInstance } from "fastify"
import todoRoutes from "./todoRoutes"
import { authProcessing } from "frameworks/fastifySpecific/helpers"


const authorizedRouter = async (fastify: FastifyInstance): Promise<void> => {
	// Register the hook to process the auth token
	fastify.addHook("preValidation", authProcessing)
	await fastify.register(todoRoutes, { prefix: "/todo" })
}


export default authorizedRouter
