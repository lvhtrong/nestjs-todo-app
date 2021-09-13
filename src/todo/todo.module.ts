import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers';
import { Todo } from './entities';
import { TodoMapperService, TodoService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService, TodoMapperService],
  controllers: [TodoController],
})
export class TodoModule {}
