import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './types/todo.type';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { statusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'test 1',
      done: true,
    },
    {
      id: 2,
      description: 'Test 2',
      done: false,
    },
  ];

  get allTodos(): number {
    const count = this.todos.length;
    return count;
  }

  get pendingTodos(): number {
    const count = this.todos.filter((item) => item.done === false).length;
    return count;
  }

  get completedTodos(): number {
    const count = this.todos.filter((item) => item.done === true).length;
    return count;
  }

  createTodo(CreateTodoInput: CreateTodoInput) {
    console.log({ CreateTodoInput });
    const newTodo = {
      ...CreateTodoInput,
    };
    this.todos.push(newTodo);
    return this.SelectAll();
  }

  updateTodo(id: number, UpdateTodoInput: UpdateTodoInput): Todo {
    const todo = this.todos.find((element) => element.id === id);
    if (!todo) throw new NotFoundException();
    const newTodo = {
      id,
      ...UpdateTodoInput,
    };
    const index = this.todos.findIndex((item) => {
      return item.id === id;
    });

    this.todos[index] = newTodo;
    return newTodo;
  }

  SelectAll(): Todo[] {
    return this.todos;
  }

  SelectOne(id: number): Todo {
    const result = this.todos.find((element) => element.id === id);
    if (!result) throw new NotFoundException(`Todo With id: ${id} not found`);
    return result;
  }

  deleteOne(id: number, validate: boolean): number {
    if (!validate) console.log('false');
    const index = this.todos.findIndex((item) => item.id === id);
    if (!index) throw new NotFoundException(`${id} : todo, doenst exist!`);
    const newTodoList = this.todos.filter((element) => element.id !== id);
    this.todos = newTodoList;
    return 200;
  }

  findByFilter(statusArgs: statusArgs): Todo[] {
    const { status } = statusArgs;
    const result = this.todos.filter((item) => item.done === status);
    return result;
  }
}
