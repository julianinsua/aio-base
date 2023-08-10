import { Controller } from "controllers/Controller"
import { type requestInterface, throwAuthError } from "frameworks/fastifySpecific/helpers"
import { HTTP } from "frameworks/http/httpCodes"
import { validEmpty } from "services/validation/validation.service"
import { type DeleteTodoUseCase } from "useCases/todos/deleteTodo.useCase"

export class DeleteTodoController extends Controller<DeleteTodoUseCase> {
	public constructor(useCase: DeleteTodoUseCase) {
		super(useCase)
	}

	public async controller(req: requestInterface): Promise<any> {
		const errors = this.validateRequest(req)
		if (Object.keys(errors).length > 0) {
			this.throwHttpError(
				"validationError",
				HTTP.BAD_REQUEST,
				"Error on the delete todo request",
				errors
			)
		}
		return {}
	}

	private validateRequest(req: requestInterface): Record<string, any> {
		if (req.body?.isAuth !== true || !req.body?.user.id) {
			throwAuthError()
		}
		if (!validEmpty(req.params?.todoId)) {
			return { todoId: "todoIdRequired" }
		}
		return {}
	}
}
