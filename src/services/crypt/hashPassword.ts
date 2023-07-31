import { hash } from "bcrypt"

export const hashPassword = async (password: string | undefined): Promise<string | undefined> => {
	if (password === undefined) {
		return undefined
	}
	return await hash(password, process.env.ENCRYPT_ROUNDS ?? 12)
}
