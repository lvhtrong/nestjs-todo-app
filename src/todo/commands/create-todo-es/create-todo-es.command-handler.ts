import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities';
import { Repository } from 'typeorm';
import { CreateTodoEsCommand } from './create-todo-es.command';

@CommandHandler(CreateTodoEsCommand)
export class CreateTodoEsCommandHandler
  implements ICommandHandler<CreateTodoEsCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async execute(command: CreateTodoEsCommand): Promise<any> {
    console.log('111');

    const todo = await this.todoRepository.findOne(command.todoId);

    const esResponse = await this.elasticsearchService.create({
      index: 'todo',
      id: todo.id,
      body: todo,
    });

    console.log('222', esResponse);
  }
}