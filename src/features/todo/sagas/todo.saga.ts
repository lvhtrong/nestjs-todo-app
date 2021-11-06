import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTodoEsCommand } from '../commands';
import { TodoCreatedEvent } from '../events';

@Injectable()
export class TodoSagas {
  @Saga()
  todoCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TodoCreatedEvent),
      map(event => {
        return new CreateTodoEsCommand(event.todoId);
      }),
    );
  };
}
