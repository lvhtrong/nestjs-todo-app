import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/features/todo/entities';
import { ES_INDEX_NAME, ES_DOCUMENT_TYPE } from 'src/shared/constants';
import { Repository } from 'typeorm';
import { CreateTodoEsCommand } from './create-todo-es.command';

@CommandHandler(CreateTodoEsCommand)
export class CreateTodoEsCommandHandler
  implements ICommandHandler<CreateTodoEsCommand> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,

    @Inject(ES_INDEX_NAME)
    private readonly esIndex: string,

    @Inject(ES_DOCUMENT_TYPE)
    private readonly esDocumentType: string,

    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async execute(command: CreateTodoEsCommand): Promise<any> {
    const todo = await this.todoRepository.findOne(command.todoId);
    await this.elasticsearchService.create({
      index: this.esIndex,
      id: todo.id,
      body: {
        todo,
        type: this.esDocumentType,
      },
    });
  }
}
