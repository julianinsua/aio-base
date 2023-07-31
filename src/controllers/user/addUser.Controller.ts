import { Controller } from "controllers/Controller"
import { type user } from "entities/User.entity"
import { type requestInterface } from "frameworks/fastifySpecific/helpers"
import { HTTP } from "frameworks/http/httpCodes"
import { hashPassword } from "services/crypt/hashPassword"
import { validEmail, validEmpty, validPassword } from "services/validation/validation.service"
import { addUserUseCase, type AddUserUseCase } from "useCases/users/addUser.useCase"

export class AddUserController extends Controller<AddUserUseCase> {
	public constructor(useCase: AddUserUseCase) {
		super(useCase)
	}

	public async controller(req: requestInterface): Promise<any> {
		const errors = this.validateRequest(req)
		if (Object.keys(errors).length > 0) {
			this.throwHttpError(
				"validationError",
				HTTP.BAD_REQUEST,
				"Errors on the add user request",
				errors
			)
		}

		const { firstName, lastName, email, password } = req.body as user
		const hashedPassword = await hashPassword(password)
		const addedUser = await this.useCase.execute({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		})

		return addedUser
	}

	private validateRequest(req: requestInterface): Record<string, string> {
		const errors: Record<string, string> = {}
		if (!validEmail(req.body?.email)) {
			errors.email = "invalidEmail" 
		}
		if (!validPassword(req.body?.password)) {
			errors.password = "invalidPassword"
		}
		if (validEmpty(req.body?.firstName)) {
			errors.firstName = "invalidFirstName"
		}
		return errors
	}
}

export const addUserController = new AddUserController(addUserUseCase)
