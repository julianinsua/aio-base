import { compare } from "bcrypt"
import { User, type userAuth, type user } from "entities/User.entity"
import { db } from "frameworks/db/prisma"
import { thrower } from "frameworks/fastifySpecific/helpers"
import { HttpError } from "frameworks/http/HttpError"
import { HTTP } from "frameworks/http/httpCodes"
import { createToken } from "services/crypt/createToken"

export class UsersRepo {
	private readonly db: any
	public constructor(db: any) {
		if (db === undefined) {
			throw new Error()
		}

		this.db = db
	}

	public async createUser({
		firstName,
		lastName,
		email,
		password,
	}: user): Promise<User | undefined> {
		try {
			const userFound = await this.findUserByEmail(email)
			if (userFound !== undefined) {
				thrower("incorrectEmail", "Email is already in use", HTTP.BAD_REQUEST, {
					email: "incorrectEmail",
				})
			}

			const newUser = await this.db.user.create({
				data: {
					first_name: firstName,
					last_name: lastName,
					email,
					password,
				},
			})

			return User.fromPrisma(newUser)
		} catch (e) {
			if (e instanceof HttpError) {
				throw e
			}
			thrower("createUserError", "error while trying to add user to database")
		}
	}

	public async findUserByEmail(email: string | undefined): Promise<User | undefined> {
		try {
			const user = await this.db.user.findUnique({ where: { email } })
			if (user === null) {
				return undefined
			}
			return User.fromPrisma(user)
		} catch (e) {
			thrower("findUserByEmailError", "error while trying to find user by email")
		}
	}

	public async findUserById(id: string | undefined): Promise<User | undefined> {
		try {
			const user = await this.db.user.findUnique({ where: { id } })
			if (user === null) {
				return undefined
			}
			return User.fromPrisma(user)
		} catch (e) {
			thrower("findUserByEmailError", "error while trying to find user by email")
		}
	}

	public async checkUserCredentials(
		email: string,
		password: string
	): Promise<userAuth | undefined> {
		const user = await this.findUserByEmail(email)
		if (user === null || user === undefined) {
			thrower("userNotFound", "error while trying to find user", HTTP.UNAUTHORIZED)
		}
		const passwordCheck = await compare(password, user?.userPswd as string)
		if (!passwordCheck) {
			thrower("invalidEmailPassword", "wrong email password combination", HTTP.UNAUTHORIZED)
		}
		const token = await createToken((user as User).toDto(), "1h")
		return user?.toUserAuth(token)
	}
}

export const userRepoPrisma = new UsersRepo(db)
