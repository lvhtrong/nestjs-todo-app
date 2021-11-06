export class TodoDto {

  public readonly id: string;
  public readonly title: string;
  public readonly completed: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public constructor(opts?: Partial<TodoDto>) {
    Object.assign(this, opts);
  }

}