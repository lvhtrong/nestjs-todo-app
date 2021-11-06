import { Injectable } from '@nestjs/common';
import { Todo } from '../../entities';
import { TodoDto } from '../../dto';

@Injectable()
export class TodoMapperService {

  public modelToDto(todo: Todo): TodoDto {
    return new TodoDto(todo);
  }

}
