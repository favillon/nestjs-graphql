import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { Todo } from './entity/todo.entity';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { CompletedArgs } from './args/completed.args';

@Injectable()
export class TodoService {
    private todos: Todo[] = [
        {
            id: 1,
            title: 'Todo 1',
            description: 'Todo 1 Description',
            done: false
        },
        {
            id: 2,
            title: 'Todo 2',
            description: 'Todo 2 Description',
            done: true
        }
        ,
        {
            id: 3,
            title: 'Todo 3',
            description: 'Todo 3 Description',
            done: true
        }
    ];

    get totalTodos(): number {
        return this.todos.length;
    }
    get completedTodos(): number {
        return this.todos.filter(todo => todo.done).length;
    }
    get pendingTodos(): number {
        return this.todos.length - this.completedTodos;
    }

    findAll( completedArgs :CompletedArgs ) : Todo[] {
        const { completed } = completedArgs;
        if (completed !== undefined) {
            return this.todos.filter(todo => todo.done === completed);
        }
        return this.todos;
    }

    findOne(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new NotFoundException(`Todo not found with id: ${id}`);
        }
        return todo;
    }

    createTodo(todo: CreateTodoInput): Todo {
        const newTodo = {
            id: Math.max(
                ...this.todos.map(todo => todo.id), 0
            ) + 1,
            title: todo.title,
            description: todo.description,
            done: false
        }
        console.log({newTodo});

        this.todos.push(newTodo);
        return newTodo;
    }

    updateTodo(id: number, updateTodoInput : UpdateTodoInput) {
        const { description, title, done } = updateTodoInput;
        const todoUpdate = this.findOne(id);
        if (description) {
            todoUpdate.description = description;
        }
        if (title) {
            todoUpdate.title = title;
        }
        if (done !== undefined) {
            todoUpdate.done = done;
        }
        this.todos = this.todos.map(todo => {
            return (todo.id === id) ? todoUpdate : todo
        })
        return todoUpdate;
    }

    removeTodo(id: number): Boolean {
        const todo = this.findOne(id);
        this.todos = this.todos.filter(todo => todo.id !== id);
        return true;
    }
}
