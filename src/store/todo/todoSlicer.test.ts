import { configureStore } from '@reduxjs/toolkit';
import { Todo } from '@/type';
import { describe, test, expect, beforeEach } from '@jest/globals';
import { addTodo, cancelEditTodo, deleteTodo, persistedTodoReducer, startEditTodo, toggleTodo, updateTodo } from './todoSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      todo: persistedTodoReducer
    }
  });
};

describe('Todo Slice', () => {
  let store: ReturnType<typeof createTestStore>;
  let initialTodo: Todo;

  beforeEach(() => {
    store = createTestStore();
    initialTodo = {
      id: 1,
      title: 'Test Todo',
      body: 'Test Body',
      dueDate: new Date('2024-01-01'),
      completed: false,
      isEditing: false,
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2023-12-01')
    };
  });

  test('should add a todo', () => {
    store.dispatch(addTodo({
      title: initialTodo.title,
      body: initialTodo.body,
      dueDate: initialTodo.dueDate
    }));

    const state = store.getState().todo;
    expect(state.todos.length).toBe(1);
    expect(state.todos[0].title).toBe(initialTodo.title);
    expect(state.todos[0].completed).toBe(false);
  });

  test('should toggle todo completion', () => {
    store.dispatch(addTodo({
      title: initialTodo.title,
      body: initialTodo.body,
      dueDate: initialTodo.dueDate
    }));

    const todoId = store.getState().todo.todos[0].id;

    store.dispatch(toggleTodo(todoId));

    const state = store.getState().todo;
    expect(state.todos[0].completed).toBe(true);
    expect(state.todos[0].updatedAt).not.toEqual(initialTodo.updatedAt);
  });

  test('should delete a todo', () => {
    store.dispatch(addTodo({
      title: initialTodo.title,
      body: initialTodo.body,
      dueDate: initialTodo.dueDate
    }));

    const todoId = store.getState().todo.todos[0].id;

    store.dispatch(deleteTodo(todoId));

    const state = store.getState().todo;
    expect(state.todos.length).toBe(0);
  });

  test('should start and cancel editing a todo', () => {
    store.dispatch(addTodo({
      title: initialTodo.title,
      body: initialTodo.body,
      dueDate: initialTodo.dueDate
    }));

    const todoId = store.getState().todo.todos[0].id;

    store.dispatch(startEditTodo(todoId));
    let state = store.getState().todo;
    expect(state.todos[0].isEditing).toBe(true);

    store.dispatch(cancelEditTodo(todoId));
    state = store.getState().todo;
    expect(state.todos[0].isEditing).toBe(false);
  });

  test('should update a todo', () => {
    store.dispatch(addTodo({
      title: initialTodo.title,
      body: initialTodo.body,
      dueDate: initialTodo.dueDate
    }));

    const todoId = store.getState().todo.todos[0].id;

    store.dispatch(updateTodo({
      id: todoId,
      title: 'Updated Title',
      body: 'Updated Body',
      dueDate: new Date('2024-02-01')
    }));

    const state = store.getState().todo;
    expect(state.todos[0].title).toBe('Updated Title');
    expect(state.todos[0].body).toBe('Updated Body');
    expect(state.todos[0].dueDate).toEqual(new Date('2024-02-01'));
    expect(state.todos[0].isEditing).toBe(false);
    expect(state.todos[0].updatedAt).not.toEqual(initialTodo.updatedAt);
  });

  test('should add a new todo and sort todos', ()=> {
    const todo1 = {
      title: "Todo 1",
      body: "description 1",
      dueDate: new Date('2024-02-01')
    }
    const todo2 = {
      title: "Todo 2",
      body: "description 2",
      dueDate: new Date("2024-01-01")
    }

    store.dispatch(addTodo(todo1))
    store.dispatch(addTodo(todo2))

    const state = store.getState().todo;

    expect(state.todos.length).toBe(2);
    expect(state.todos[0].title).toBe(todo1.title);
    expect(state.todos[1].title).toBe(todo2.title);
  })

  test("should resort todos after toggling completion", () => {
    const todo1 = {
      title: "Todo 1",
      body: "description 1",
      dueDate: new Date('2024-02-01')
    }
    const todo2 = {
      title: "Todo 2",
      body: "description 2",
      dueDate: new Date("2024-01-01")
    }

    store.dispatch(addTodo(todo1))
    store.dispatch(addTodo(todo2))

    const todoId = store.getState().todo.todos[0].id;

    store.dispatch(toggleTodo(todoId));

    expect(store.getState().todo.todos[0].completed).toBe(true);
    expect(store.getState().todo.todos[1].completed).toBe(false);
  })
});
