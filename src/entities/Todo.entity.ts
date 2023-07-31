export class Todo {
  private readonly id: string;
  private title: string;
  private content: string | undefined;
  private readonly userId: string;
  private createdAt: Date | undefined;
  private updatedAt: Date | undefined;

  public constructor(
    id: string,
    title: string,
    content: string | undefined,
    userId: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  public get todoId(): string {
    return this.id;
  }

  public get todoTitle(): string {
    return this.title;
  }

  public get todoContent(): string | undefined {
    return this.content;
  }

  public get todoUser(): string {
    return this.userId;
  }

  public get todoCreated(): Date | undefined {
    return this.createdAt;
  }

  public get todoUpdated(): Date | undefined {
    return this.updatedAt;
  }

  public setTitle(title: string | undefined): void {
    if (title === undefined || title?.trim().length === 0) {
      throw new Error("titleRequired");
    }
    this.title = title.trim();
  }

  public setContent(content: string | undefined): void {
    this.content = content?.trim();
  }

  public setCreated(date: Date): void {
    this.createdAt = date;
  }

  public setUpdated(date: Date): void {
    this.updatedAt = date;
  }

  public static fromPrisma({
    id,
    title,
    content,
    userId,
    createdAt,
    updatedAt,
  }: todo): Todo {
    const todo = new Todo(id, title, content, userId);

    todo.setCreated(new Date(createdAt));
    todo.setUpdated(new Date(updatedAt));

    return todo;
  }
}

export interface todo {
  id: string;
  title: string;
  content?: string;
  userId: string;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
}
