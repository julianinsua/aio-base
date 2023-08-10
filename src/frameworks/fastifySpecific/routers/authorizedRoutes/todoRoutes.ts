import { addTodoController } from "controllers/todo/addTodo.Controller"
import { getTodoListController } from "controllers/todo/getTodoList.controller"
import { type user } from "entities/User.entity"
import { type FastifyRequest, type FastifyInstance, type FastifyReply } from "fastify"
import { normalizeFastifyRequest } from "frameworks/fastifySpecific/helpers"
import { HttpError } from "frameworks/http/HttpError"

const todoRoutes = async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/", async (request: FastifyRequest<addTodosRequest>, reply: FastifyReply) => {
		try {
			const req = normalizeFastifyRequest(request)
			const res = await addTodoController.controller(req)
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

	fastify.get("/", async (request:FastifyRequest<getTodosRequest>, reply: FastifyReply) => {
		try {
			const req = normalizeFastifyRequest(request)
			const res = await getTodoListController.controller(req)
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

	fastify.delete("/:todoId", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const req = normalizeFastifyRequest(request)
			// delete todo controller here
			return await reply.code(200).send(req)
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

export interface getTodosRequest {
	Body: {
		isAuth: boolean
		user: user
	}
	Params: {
		pageNr?: number
		pageSize?: number
		sortBy?: string
		sortDir?: "ASC" | "DESC"
	}
}

export interface addTodosRequest {
	Body: {
		isAuth: boolean
		user: user
		title: string
		content: string | undefined
	}
}

export default todoRoutes
