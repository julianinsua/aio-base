import { Controller } from "controllers/Controller"
import { type userCredentials } from "entities/User.entity"
import { type requestInterface } from "frameworks/fastifySpecific/helpers"
import { HTTP } from "frameworks/http/httpCodes"
import { validEmail, validPassword } from "services/validation/validation.service"
import { checkCredentialsUseCase, type CheckCredentialsUseCase } from "useCases/users/checkCredentials.useCase"

export class CheckCredentialsController extends Controller<CheckCredentialsUseCase> {
	public constructor(useCase: CheckCredentialsUseCase) {
		super(useCase)
	}

	public async controller(req: requestInterface): Promise<any> {
		const errors = this.validateRequest(req)
		if (Object.keys(errors).length > 0) {
			this.throwHttpError(
				"validationError",
				HTTP.BAD_REQUEST,
				"Errors on the check credentials request",
				errors
			)
		}
		const { email, password } = req.body as userCredentials
		const res = await this.useCase.execute({ email, password })
		return res
	}

	private validateRequest(req: requestInterface): Record<string, string> {
		const errors: Record<string, string> = {}
		if (!validEmail(req.body?.email)) {
			errors.email = "invalidEmail"
		}
		if (!validPassword(req.body?.password)) {
			errors.password = "invalidPassword"
		}
		return errors
	}
}

export const checkCredentialsController = new CheckCredentialsController(checkCredentialsUseCase)
