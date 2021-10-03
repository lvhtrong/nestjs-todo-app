import { ICommand } from '@nestjs/cqrs';
import { AddTodoDto } from '../../dto';

export class CreateTodoCommand implements ICommand {
  constructor(public readonly dto: AddTodoDto) {}
}
