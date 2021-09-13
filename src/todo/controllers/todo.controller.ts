import { TodoService } from './../services/todo/todo.service';
import { TodoDto, AddTodoDto, EditTodoDto } from './../dto';

import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
} from '@nestjs/common';

@Controller('todos')
export class TodoController {
  public constructor(private readonly todoService: TodoService) {}

  @Get()
  public findAll(): Promise<TodoDto[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<TodoDto> {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  public edit(
    @Param('id') id: string,
    @Body() todo: EditTodoDto,
  ): Promise<TodoDto> {
    return this.todoService.edit(id, todo);
  }

  @Post()
  public add(@Body() todo: AddTodoDto): Promise<TodoDto> {
    return this.todoService.add(todo);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(id);
  }
}
