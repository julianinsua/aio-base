import { sign } from "jsonwebtoken"

export const createToken = async (
	tokenClaims: Record<string, any>,
	expirationTime: string
): Promise<string> => {
	return sign(
		tokenClaims,
		process.env.USER_TOKEN_SECRET || "Never use this secret, pretty please",
		{ expiresIn: expirationTime }
	)
}
