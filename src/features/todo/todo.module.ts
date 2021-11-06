import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ES_DOCUMENT_TYPE } from 'src/shared';
import {
  CreateTodoCommandHandler,
  CreateTodoEsCommandHandler,
} from './commands';
import { TodoController } from './controllers';
import { Todo } from './entities';
import { SearchTodoQueryHandler } from './queries';
import { TodoSagas } from './sagas';
import { TodoMapperService, TodoService } from './services';

const handlers = [
  CreateTodoCommandHandler,
  CreateTodoEsCommandHandler,
  SearchTodoQueryHandler,
];
const sagas = [TodoSagas];

const providers: Provider[] = [
  {
    provide: ES_DOCUMENT_TYPE,
    useValue: 'todo',
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [
    TodoService,
    TodoMapperService,
    ...handlers,
    ...sagas,
    ...providers,
  ],
  controllers: [TodoController],
})
export class TodoModule {}
