import { HTTP } from "./httpCodes"

// Extending the native Error class to include more info
export class HttpError extends Error {
	public statusCode: HTTP
	public isOperational: boolean
	data?: Record<string, any>

	constructor(
		name: string = "unexpectedError",
		description: string | undefined = "An unexpected error ocurred",
		statusCode: HTTP = HTTP.INTERNAL,
		data?: Record<string, any> | undefined,
		isOperational: boolean = true
	) {
		super(description)

		Object.setPrototypeOf(this, new.target.prototype)
		this.name = name
		this.statusCode = statusCode
		this.isOperational = isOperational
		this.data = data
		Error.captureStackTrace(this)
	}

	public humble(): httpError {
		return {
			name: this.name,
			description: this.message,
			statusCode: this.statusCode,
			data: this.data,
		}
	}

	public get httpCode(): HTTP {
		return this.statusCode
	}
}

export interface httpError {
	name: string
	description: string
	statusCode: HTTP
	data?: Record<string, any>
}
