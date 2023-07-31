import { User, type user } from "entities/User.entity"
import { userRepoPrisma, type UsersRepo } from "frameworks/repos/prismaPostgres/users.repo"

export class AddUserUseCase {
	private readonly usersRepo: UsersRepo

	public constructor(usersRepo: UsersRepo) {
		this.usersRepo = usersRepo
	}

	public async execute({ firstName, lastName, email, password }: Partial<user>): Promise<User> {
		const err = this.validator(firstName, email, password)
		if (err !== undefined) {
			throw new Error(err)
		}
		const user = new User(undefined, firstName as string, lastName, email as string, password)
		const newUser = await this.usersRepo.createUser(user.humble())
		return newUser as User
	}

	private validator(
		firstName: string | undefined,
		email: string | undefined,
		password: string | undefined
	): string | undefined {
		if (firstName === undefined) {
			return "firstNameRequired"
		}
		if (email === undefined) {
			return "emailRequired"
		}
		if (password === undefined) {
			return "passwordRequired"
		}
		return undefined
	}
}

export const addUserUseCase = new AddUserUseCase(userRepoPrisma)
