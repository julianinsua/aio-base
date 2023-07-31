import { type userAuth, type userCredentials } from "entities/User.entity"
import { userRepoPrisma, type UsersRepo } from "frameworks/repos/prismaPostgres/users.repo"

export class CheckCredentialsUseCase {
	private readonly usersRepo: UsersRepo

	public constructor(usersRepo: UsersRepo) {
		this.usersRepo = usersRepo
	}

	public async execute({ email, password }: userCredentials): Promise<userAuth | undefined> {
		const auth = await this.usersRepo.checkUserCredentials(email, password)
		return auth
	}
}

export const checkCredentialsUseCase = new CheckCredentialsUseCase(userRepoPrisma)
