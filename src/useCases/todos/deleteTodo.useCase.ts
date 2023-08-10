import { Todo, type todo } from "entities/Todo.entity"
import { thrower } from "frameworks/fastifySpecific/helpers"
import { HTTP } from "frameworks/http/httpCodes"
import { todosRepo, type TodosRepo } from "frameworks/repos/prismaPostgres/todos.repo"

export class DeleteTodoUseCase {
	private readonly todosRepo: TodosRepo

	public constructor(todosRepo: TodosRepo) {
		this.todosRepo = todosRepo
	}

	public async execute(userId: string): Promise<Todo | undefined> {
		const err = this.validator(userId)
		if (err !== undefined) {
			throw new Error(err)
		}
		const deleted = await this.todosRepo.deleteTodo(userId)
		if (deleted === undefined) {
			thrower('todoNotFound', "the todo you are trying to delete couldn't be found", HTTP.NOT_FOUND )
		}
		const del = Todo.fromPrisma(deleted as todo)
		return del
	}

	private validator(userId: string | undefined): string | undefined {
		if (userId === undefined) {
			return 'userIdRequired'
		}
		return undefined
	}
}

export const deleteTodouseCase = new DeleteTodoUseCase(todosRepo)
