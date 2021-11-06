import { IQuery } from '@nestjs/cqrs';
import { GetTodoListDto } from '../../dto';

export class SearchTodoQuery implements IQuery {
  constructor(public readonly dto: GetTodoListDto) {}
}
