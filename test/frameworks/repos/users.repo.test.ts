/* eslint-disable @typescript-eslint/naming-convention */
import { UsersRepo } from "../../../src/frameworks/repos/prismaPostgres/users.repo"
import { type user } from "../../../src/entities/User.entity"
import { v4 } from "uuid"

const db = {
	create: jest.fn(async ({ data: { first_name, last_name, email, password } }) => ({
		id: v4(),
		first_name,
		last_name,
		email,
		password,
	})),
}

describe("UsersRepo", () => {
	test("Create User", async (): Promise<void> => {
		const newUser: user = {
			firstName: "lorenzo",
			lastName: "lamas",
			email: "llamas@mt2015.com",
			password: "password",
		}

		const usersRepo = new UsersRepo(db)
		const addedUser = await usersRepo.createUser(newUser)

		expect(addedUser).toBeDefined()

		const [call] = (db.create as jest.Mock).mock.calls[0]

		expect(call.data.first_name).toBe(newUser.firstName)
	})
})
