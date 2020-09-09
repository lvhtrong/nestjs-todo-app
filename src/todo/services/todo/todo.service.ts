import { isNullOrUndefined } from 'util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../../entities';
import { TodoDto, AddTodoDto, UpdateTodoDto } from '../../dto';
import { TodoMapperService } from '../todo-mapper/todo-mapper.service';

@Injectable()
export class TodoService {

  public constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private readonly todoMapper: TodoMapperService
  ) {}

  public async findAll(): Promise<TodoDto[]> {
    const todos = await this.todoRepository.find();
    return todos.map(this.todoMapper.modelToDto);
  }

  public async findOne(id: number): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne(id);
    if (isNullOrUndefined(todo)) throw new NotFoundException();
    return this.todoMapper.modelToDto(todo);
  }


  public async add({ title }: AddTodoDto): Promise<TodoDto> {
    let todo = new Todo(title);
    todo = await this.todoRepository.save(todo);
    return this.todoMapper.modelToDto(todo);
  }

  public async edit(id: number, { title, completed }: UpdateTodoDto): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne(id);

    if (isNullOrUndefined(todo)) throw new NotFoundException();

    todo.completed = completed;
    todo.title = title;

    await this.todoRepository.save(todo);

    return this.todoMapper.modelToDto(todo);
  }

  public async remove(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);

    if (isNullOrUndefined(todo)) throw new NotFoundException();

    return await this.todoRepository.remove(todo);
  }

}
