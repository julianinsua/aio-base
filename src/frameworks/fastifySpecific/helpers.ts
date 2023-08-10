import type { FastifyReply, FastifyRequest } from "fastify"
import { HttpError } from "frameworks/http/HttpError"
import { HTTP } from "frameworks/http/httpCodes"
import { verify } from "jsonwebtoken"

export const normalizeFastifyRequest = (req: FastifyRequest): requestInterface => {
	const { body, url, query, params, headers } = req
	const request: requestInterface = { url }
	if (body !== undefined) request.body = body
	if (query !== undefined) request.query = query
	if (params !== undefined) request.params = params
	if (headers !== undefined) request.headers = headers

	return request
}

export const throwAuthError = (): void => {
	thrower(
		"notAuthenticated",
		"the endpoint you are trying to acces requires an authentication token",
		HTTP.UNAUTHORIZED
	)
}

export const authProcessing = async (
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> => {
	// isAuth field on the body SO is trying to cheat the auth mechanism
	const req = normalizeFastifyRequest(request)
	try {
		// tried to trick the auth
		if (req?.body?.isAuth !== undefined) {
			throwAuthError()
		}

		// no Authorization header
		if (req?.headers?.authorization === undefined) {
			throwAuthError()
		}
		const token = req?.headers?.authorization?.split(" ")[1]
		const decodedToken = verify(
			token,
			process.env.USER_TOKEN_SECRET ?? "Never use this secret, pretty please"
		)

		// token decoded to nothing
		if (decodedToken === null || decodedToken === undefined) {
			throwAuthError()
		}

		request.body = { ...(request.body as Record<string, any>), isAuth: true, user: decodedToken }
	} catch (e) {
		if (e instanceof HttpError) {
			return await reply.code(e.httpCode).send(e.humble())
		}
		if (e instanceof Error) {
			const innerError = new HttpError(e.name, e.message)
			return await reply.code(innerError.httpCode).send(innerError.humble())
		}
		const unexpected = new HttpError()
		return await reply.code(unexpected.httpCode).send(unexpected.humble())
	}
}

export interface requestInterface {
	url: string
	body?: Record<string, any> | null
	query?: Record<string, any> | null
	params?: Record<string, any> | null
	headers?: Record<string, any> | null
}

export const thrower = (
	name: string = "internalError",
	description: string = "Internal server error",
	status: HTTP = HTTP.INTERNAL,
	data?: Record<string, any>,
	operational: boolean = false
): void => {
	throw new HttpError(name, description, status, data, operational)
}
