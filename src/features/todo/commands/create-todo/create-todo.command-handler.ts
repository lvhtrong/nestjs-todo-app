import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/features/todo/entities';
import { TodoCreatedEvent } from 'src/features/todo/events';
import { Repository } from 'typeorm';
import { CreateTodoCommand } from './create-todo.command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand, Todo> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoCommand): Promise<Todo> {
    const { title } = command.dto ?? {};
    if (title) {
      let todo = new Todo(title);
      todo = await this.todoRepository.save(todo);

      this.eventBus.publish(new TodoCreatedEvent(todo.id));

      return todo;
    }

    throw new Error('created todo failed!!!');
  }
}
