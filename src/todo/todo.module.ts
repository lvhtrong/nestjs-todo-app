import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateTodoCommandHandler,
  CreateTodoEsCommandHandler,
} from './commands';
import { TodoController } from './controllers';
import { Todo } from './entities';
import { TodoSagas } from './sagas';
import { TodoMapperService, TodoService } from './services';

const handlers = [CreateTodoCommandHandler, CreateTodoEsCommandHandler];
const sagas = [TodoSagas];

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService, TodoMapperService, ...handlers, ...sagas],
  controllers: [TodoController],
})
export class TodoModule {}
