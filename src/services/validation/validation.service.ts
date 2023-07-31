import validator from "validator"

export const validEmail = (email: string | undefined): boolean =>
	email !== undefined && !validator.isEmpty(email) && validator.isEmail(email)

export const validPassword = (pass: string | undefined): boolean =>
	pass !== undefined &&
	!validator.isEmpty(pass) &&
	validator.isStrongPassword(pass, { minLength: 8, minUppercase: 1, minNumbers: 1 })

export const validAlphanumeric = (str: string | undefined): boolean =>
	str !== undefined && validator.isAlphanumeric(str)

export const validEmpty = (str: string | undefined): boolean =>
	str === undefined || validator.isEmpty(str)
