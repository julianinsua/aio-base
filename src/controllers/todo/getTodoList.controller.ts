import { Controller } from "controllers/Controller"
import { type requestInterface, throwAuthError } from "frameworks/fastifySpecific/helpers"
import { HTTP } from "frameworks/http/httpCodes"
import { getTodoListUseCase, type GetTodoListUseCase } from "useCases/todos/getTodoList.useCase"

export class GetTodoListController extends Controller<GetTodoListUseCase> {
	public constructor(useCase: GetTodoListUseCase) {
		super(useCase)
	}

	public async controller(req: requestInterface): Promise<any> {
		const errors = this.validateRequest(req)
		if (Object.keys(errors).length > 0) {
			this.throwHttpError(
				"validationError",
				HTTP.BAD_REQUEST,
				"Error on the get todo list request",
				errors
			)
		}
		const { id } = req.body?.user
		const list = await this.useCase.execute(id)
		return { data: list }
	}

	private validateRequest(req: requestInterface): Record<string, any> {
		if (req.body?.isAuth !== true || !req.body?.user.id) {
			throwAuthError()
		}
		return {}
	}
}

export const getTodoListController = new GetTodoListController(getTodoListUseCase)
