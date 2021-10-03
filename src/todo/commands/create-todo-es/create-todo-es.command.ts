import { ICommand } from '@nestjs/cqrs';

export class CreateTodoEsCommand implements ICommand {
  constructor(public readonly todoId: string) {}
}
