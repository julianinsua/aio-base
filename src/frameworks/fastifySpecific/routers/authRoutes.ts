import { addUserController } from "controllers/user/addUser.Controller"
import { checkCredentialsController } from "controllers/user/checkCredentials.Controller"
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify"
import { HttpError } from "frameworks/http/HttpError"
import { HTTP } from "frameworks/http/httpCodes"
import { normalizeFastifyRequest } from "../helpers"

const authRoutes = async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/signup", async (request: FastifyRequest<signupBody>, reply: FastifyReply) => {
		try {
			const req = normalizeFastifyRequest(request)
			const res = await addUserController.controller(req)
			if(res.password !== undefined) {
				delete res.password
			}
			await reply.code(HTTP.OK).send(res)
		} catch (e) {
			if(e instanceof HttpError){
				return await reply.code(e.httpCode).send(e.humble())
			}

			if(e instanceof Error) {
				const innerError = new HttpError(e.name,e.message)
				return await reply.code(innerError.httpCode).send(innerError.humble())
			}

			const unexpected = new HttpError()
			return await reply.code(unexpected.httpCode).send(unexpected.humble())
		}
	})

	fastify.post("/signin", async (request: FastifyRequest<signinBody>, reply: FastifyReply) => {
		try {
			const req = normalizeFastifyRequest(request)
			const res = await checkCredentialsController.controller(req)
			return await reply.code(200).send(res)
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

interface signupBody {
	Body: {
		email: string
		password: string
		firstName: string
		lastName?: string
	}
}

interface signinBody {
	Body: {
		email: string
		password: string
	}
}

export default authRoutes
