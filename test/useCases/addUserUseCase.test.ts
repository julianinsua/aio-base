import { type user } from "entities/User.entity"
import { type UsersRepo } from "frameworks/repos/prismaPostgres/users.repo"
import { AddUserUseCase } from "useCases/users/addUser.useCase"
import { v4 } from "uuid"

const mockUsersRepo = {
	createUser: jest.fn(async (user: user): Promise<user> => ({ id: v4(), ...user })),
}

describe("Add user use case", () => {
	test("Valid user added", async () => {
		const newUser: user = {
			firstName: "lorenzo",
			lastName: "lamas",
			email: "llamas@mt2015.com",
			password: "password",
		}

		const addUserUseCase = new AddUserUseCase(mockUsersRepo as unknown as UsersRepo)
		const addedUser = await addUserUseCase.execute(newUser)

		expect(addedUser).toBeDefined()
	})

	test("Throw when invalid user, firstName undefined", async () => {
		const invalidUser: Partial<user> = {
			firstName: undefined,
			lastName: "lamas",
			email: "llamas@mt2015.com",
			password: "password",
		}

		const addUserUseCase = new AddUserUseCase(mockUsersRepo as unknown as UsersRepo)

		await expect(async () => await addUserUseCase.execute(invalidUser)).rejects.toThrow(
			"firstNameRequired"
		)
	})

	test("Throw when invalid user, email undefined", async () => {
		const invalidUser: Partial<user> = {
			firstName: "lorenzo",
			lastName: "lamas",
			email: undefined,
			password: "password",
		}

		const addUserUseCase = new AddUserUseCase(mockUsersRepo as unknown as UsersRepo)

		await expect(async () => await addUserUseCase.execute(invalidUser)).rejects.toThrow(
			"emailRequired"
		)
	})

	test("Throw when invalid user, password undefined", async () => {
		const invalidUser: Partial<user> = {
			firstName: "lorenzo",
			lastName: "lamas",
			email: "llamas@mt2015.com",
			password: undefined,
		}

		const addUserUseCase = new AddUserUseCase(mockUsersRepo as unknown as UsersRepo)

		await expect(async () => await addUserUseCase.execute(invalidUser)).rejects.toThrow(
			"passwordRequired"
		)
	})

})
