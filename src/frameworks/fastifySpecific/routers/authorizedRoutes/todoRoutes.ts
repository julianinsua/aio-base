import { type FastifyRequest, type FastifyInstance, type FastifyReply } from "fastify"
// import { normalizeFastifyRequest } from "../helpers"
import { HttpError } from "frameworks/http/HttpError"

const todoRoutes = async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", async (request: FastifyRequest<getTodosRequest>, reply: FastifyReply) => {
		try {
			// const req = normalizeFastifyRequest(request)
			return await reply.code(200).send(request.body)
		} catch (e) {
			if(e instanceof HttpError){
				return await reply.code(e.httpCode).send(e.humble())
			}
			
			if(e instanceof Error) {
				const innerError = new HttpError(e.name, e.message)
				return await reply.code(innerError.httpCode).send(innerError.humble())
			}

			const unexpected = new HttpError()
			return await reply.code(unexpected.httpCode).send(unexpected.humble())
		}
	})
}

interface getTodosRequest {
	Params: {
		pageNr: number
		pageSize: number
		sortBy: string
		sortDir: "ASC" | "DESC"
	}
}

export default todoRoutes
