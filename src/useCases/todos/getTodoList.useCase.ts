import { type Todo } from "entities/Todo.entity"
import { todosRepo, type TodosRepo } from "frameworks/repos/prismaPostgres/todos.repo"

export class GetTodoListUseCase {
	todosRepo: TodosRepo

	public constructor(todosRepo: TodosRepo) {
		this.todosRepo = todosRepo
	}

	public async execute(userId: string): Promise<Todo[]> {
		const err = this.validator(userId)
		if (err !== undefined) {
			throw new Error(err)
		}
		const list = await this.todosRepo.getTodosList(userId)
		return list ?? []
	}

	private validator(userId: string | undefined): string | undefined {
		if(userId === undefined) {
			return 'userIdRequired'
		}
		return undefined
	}
}

export const getTodoListUseCase = new GetTodoListUseCase(todosRepo)
