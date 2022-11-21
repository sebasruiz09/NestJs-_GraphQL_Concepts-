import { Args, Query, Resolver, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './types/todo.type';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { statusArgs } from './dto/args/status.args';
import { categoriesTodo } from './types/categories.type';

//* specify type of data handled by the resolver
@Resolver(() => Todo || Number)
export class TodoResolver {
  constructor(private readonly todoSev: TodoService) {}

  //! specify the type of data to be returned [ graphQl ]
  @Query(() => [Todo], {
    name: 'testArray',
    description: 'return array of string',
  })
  //! specify type of data be returned [ typescript ]
  findAll(): Todo[] {
    return this.todoSev.SelectAll();
  }

  @Query(() => Todo, {
    name: 'testTodo',
    description: 'return one todo',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoSev.SelectOne(id);
  }

  @Mutation(() => [Todo], {
    name: 'createTodo',
    description: 'create Todo Method',
  })
  createTodo(@Args('createTodoInput') createInput: CreateTodoInput): Todo[] {
    return this.todoSev.createTodo(createInput);
  }

  @Mutation(() => Todo, {
    name: 'udpateTodo',
    description: 'update todo find by id',
  })
  updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateInput', { nullable: true }) updateInput: UpdateTodoInput,
  ): Todo {
    return this.todoSev.updateTodo(id, updateInput);
  }

  @Mutation(() => Int, {
    name: 'deleteTodo',
    description: 'delete one todo by id',
  })
  deleteTodo(
    @Args('id', { name: 'id', type: () => Int, nullable: false }) id: number,
    @Args('validate', {
      name: 'validate',
      type: () => Boolean,
      nullable: false,
      defaultValue: false,
    })
    validate: boolean,
  ): number {
    return this.todoSev.deleteOne(id, validate);
  }

  @Query(() => [Todo], {
    name: 'filterTodo',
    description: 'search Todo by one Filter',
  })
  findFilterOne(@Args() stateArgs: statusArgs): Todo[] {
    return this.todoSev.findByFilter(stateArgs);
  }

  @Query(() => categoriesTodo, {
    name: 'todoFilter',
    description: 'see all todos in categories',
  })
  findFilters(): categoriesTodo {
    return {
      passed: this.todoSev.completedTodos,
      pending: this.todoSev.pendingTodos,
      all: this.todoSev.allTodos,
    };
  }
}
