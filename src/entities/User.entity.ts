/* eslint-disable @typescript-eslint/naming-convention */
export class User {
	private readonly id: string | undefined
	private firstName: string
	private lastName: string | undefined
	private email: string
	private password: string | undefined

	public constructor(
		id: string | undefined,
		firstName: string,
		lastName: string | undefined,
		email: string,
		password: string | undefined
	) {
		this.id = id
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.password = password
	}

	public get userId(): string | undefined {
		return this.id
	}

	public get userFirstName(): string {
		return this.firstName
	}

	public get userLastName(): string | undefined {
		return this.lastName
	}

	public get userEmail(): string | undefined {
		return this.lastName
	}

	public get userPswd(): string | undefined {
		return this.password
	}

	public setFirstName(firstName: string | undefined): void {
		if (firstName === undefined || (firstName?.trim()).length === 0) {
			throw new Error("firstNameRequired")
		}
		this.firstName = firstName.trim()
	}

	public setLastName(lastName: string | undefined): void {
		this.lastName = lastName?.trim()
	}

	public setEmail(email: string | undefined): void {
		if (email === undefined || (email?.trim()).length === 0) {
			throw new Error("emailRequired")
		}
		this.email = email.trim()
	}

	public setPassword(password: string | undefined): void {
		if (password === undefined || (password?.trim()).length === 0) {
			throw new Error("passwordRequired")
		}
		this.password = password.trim()
	}

	public humble(): user {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			password: this.password,
		}
	}

	public toDto(): user {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
		}
	}

	public static fromPrisma({ id, first_name, last_name, email, password }: prismaUser): User {
		const newUser = new User(id, first_name, last_name, email, password)
		return newUser
	}

	public toUserAuth(token: string): userAuth {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			token: `Bearer ${token}`,
		}
	}
}

export interface user {
	id?: string
	firstName: string
	lastName?: string
	email: string
	password?: string
}

export interface userCredentials {
	email: string
	password: string
}

export interface userAuth {
	firstName: string
	lastName?: string
	email: string
	token: string
}

export interface prismaUser {
	id: string
	first_name: string
	last_name?: string
	email: string
	password?: string
}
