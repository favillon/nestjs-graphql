import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { CompletedArgs } from './args/completed.args';
import { AggregationType } from './types/aggregations.types';

@Resolver( () => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ) {}

    @Query(() => [Todo], {name: 'todos'})
    findAll(
        @Args() completedArgs: CompletedArgs
    ): Todo[] {
        return this.todoService.findAll(completedArgs);
    }

    @Query(() => Todo, {name: 'todo'})
    findOne(
        @Args ('id', { type: () => Int }) id : number
    ): Todo {
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo, {name: 'createTodo'})
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) {
        console.log({createTodoInput});
        return this.todoService.createTodo(createTodoInput);
    }

    @Mutation(() => Todo, {name: 'updateTodo'})
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this.todoService.updateTodo(updateTodoInput.id, updateTodoInput);
    }

    @Mutation(() => Boolean, {name: 'deleteTodo'})
    removeTodo(
        @Args('id', {type: () => Int}) id: number
    ) {
        return this.todoService.removeTodo(id);
    }

    @Query(() => Int, {name: 'totaTodos'})
    totalTodos(): number {
        return this.todoService.totalTodos;
    }

    @Query(() => Int, {name: 'completedTodos'})
    completedTodos(): number {
        return this.todoService.completedTodos;
    }

    @Query(() => Int, {name: 'pendingTodos'})
    pendingTodos(): number {
        return this.todoService.pendingTodos;
    }

    @Query(() => AggregationType, {name: 'aggregations'})
    aggregations(): AggregationType {
        return {
            completedTodos : this.completedTodos(),
            pendingTodos: this.pendingTodos(),
            totalTodos : this.totalTodos()
        }
    }
}
