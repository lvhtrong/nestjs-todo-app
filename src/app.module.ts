import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule, SharedModule],
})
export class AppModule {}
