import { thrower, type requestInterface } from "frameworks/fastifySpecific/helpers"
import { HTTP } from "frameworks/http/httpCodes"

export class Controller<T> {
	protected readonly useCase: T

	constructor(useCase: T) {
		this.useCase = useCase
	}

	public async controller(req: requestInterface): Promise<unknown> {
		return await Promise.resolve(req)
	}

	protected throwHttpError(
		name: string = "internalError",
		status: HTTP = HTTP.INTERNAL,
		description: string = "Internal server error",
		data: Record<string, any> | undefined,
		operational: boolean = false
	): void {
		thrower(name, description, status, data, operational)
	}
}
