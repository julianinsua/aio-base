import { Controller } from "controllers/Controller"
import { type requestInterface, throwAuthError } from "frameworks/fastifySpecific/helpers"
import { type addTodosRequest } from "frameworks/fastifySpecific/routers/authorizedRoutes/todoRoutes"
import { HTTP } from "frameworks/http/httpCodes"
import { validEmpty } from "services/validation/validation.service"
import { addTodoUseCase, type AddTodoUseCase } from "useCases/todos/addTodo.useCase"

export class AddTodoController extends Controller<AddTodoUseCase> {
	public constructor(useCase: AddTodoUseCase) {
		super(useCase)
	}

	public async controller(req: requestInterface): Promise<any> {
		const errors = this.validateRequest(req)
		if (Object.keys(errors).length > 0) {
			this.throwHttpError(
				"validationError",
				HTTP.BAD_REQUEST,
				"Errors on the add todo request",
				errors
			)
		}
		const {title, content, user: {id}} = req.body as addTodosRequest["Body"]
		if (id === undefined) {
			throwAuthError()
		}
		const res = await this.useCase.execute({title, content, userId: id as string})
		return res
	}

	private validateRequest(req: requestInterface): Record<string,string> {
		if(req.body?.isAuth !== true || !req.body?.user?.id  ) {
			throwAuthError()
		}

		const errors: Record<string,string> = {}
		if(validEmpty(req.body?.title)) {
			errors.title = "titleRequired"
		}
		return errors
	}
}

export const addTodoController = new AddTodoController(addTodoUseCase)
