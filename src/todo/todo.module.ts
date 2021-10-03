import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTodoCommandHandler } from './commands';
import { TodoController } from './controllers';
import { Todo } from './entities';
import { TodoMapperService, TodoService } from './services';

const handlers = [CreateTodoCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), CqrsModule],
  providers: [TodoService, TodoMapperService, ...handlers],
  controllers: [TodoController],
})
export class TodoModule {}
