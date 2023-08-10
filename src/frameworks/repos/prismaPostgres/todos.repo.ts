import { Todo, type todo } from "entities/Todo.entity"
import { db } from "frameworks/db/prisma"
import { thrower } from "frameworks/fastifySpecific/helpers"
import { HttpError } from "frameworks/http/HttpError"
import { HTTP } from "frameworks/http/httpCodes"

export class TodosRepo {
	private readonly db: any

	public constructor(db: any) {
		if (db === undefined) {
			throw new Error()
		}
		this.db = db
	}

	public async createTodo({ title, content, userId }: todo): Promise<Todo | undefined> {
		try {
			const newTodo = await this.db.todo.create({
				data: {
					title,
					content,
					userId,
				},
			})
			return Todo.fromPrisma(newTodo)
		} catch (e) {
			if (e instanceof HttpError) {
				throw e
			}
			thrower("createTodoError", "error while trying to add todo to the database")
		}
	}

	public async getTodosList(userId: string | undefined): Promise<Todo[] | undefined> {
		try {
			const todoList = await this.db.todo.findMany({where: {userId}})
			if (todoList === null) {
				return []
			}
			const returnList = todoList.map(( prismaTodo: todo ) => Todo.fromPrisma(prismaTodo))
			return returnList
		} catch (e) {
			thrower("findTodosError", "error while trying to get todo's list")
		}
	}

	public async deleteTodo(id: string | undefined): Promise<todo | undefined> {
		const deleted = await this.db.todo.delete({where: {id}})
		if(deleted === null || deleted === undefined) {
			thrower("deleteTodoNotFound", "error while trying to delete todo. todo not found", HTTP.NOT_FOUND )
		}
		return deleted
	}
}

export const todosRepo = new TodosRepo(db)
