import { Todo, type todo } from "entities/Todo.entity";
import { todosRepo, type TodosRepo } from "frameworks/repos/prismaPostgres/todos.repo";

export class AddTodoUseCase {
	private readonly todosRepo: TodosRepo

	public constructor(todosRepo: TodosRepo) {
		this.todosRepo = todosRepo
	}

	public async execute({title, content, userId}: todo): Promise<Todo> {
		const err = this.validator(title, userId)
		if(err !== undefined) {
			throw new Error(err)
		}

		const todo = new Todo(undefined, title, content, userId)
		const newTodo = await this.todosRepo.createTodo(todo.humble())
		return newTodo as Todo
	}

	public validator(
		title: string | undefined,
		userId: string | undefined
	): string | undefined {
		if(title === undefined) {
			return "titleRequired"
		}
		if(userId === undefined) {
			return "userIdRequired"
		}
		return undefined
	}
}

export const addTodoUseCase = new AddTodoUseCase(todosRepo)
