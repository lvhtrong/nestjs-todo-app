import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { Todo } from './features/todo/entities';
import { TodoModule } from './features/todo/todo.module';

const ormModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: process.env.DB_TYPE as any,
    url: `${process.env.DB_URI}/${process.env.DB_NAME}`,
    entities: [Todo],
    ssl:
      process.env.NODE_ENV === 'production'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  }),
});
@Module({
  imports: [ormModule, TodoModule, SharedModule],
})
export class AppModule {}
