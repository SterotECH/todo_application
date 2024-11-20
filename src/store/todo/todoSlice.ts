import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { Todo } from "@/type";

interface TodoState {
  items: Todo[];
}

const sortTodos = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => {
    if (a.completed && !b.completed) return a.completed ? 1 : -1;

    if (!a.dueDate && !b.dueDate) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  });
};
const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [] as Todo[],
  } as TodoState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        title: action.payload.title,
        body: action.payload.body,
        dueDate: action.payload.dueDate,
        completed: false,
        isEditing: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      state.items = sortTodos(state.items);
    },

    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date();
        state.items = sortTodos(state.items);
      }
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },

    startEditTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isEditing = true;
      }
    },

    cancelEditTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isEditing = false;
      }
    },

    updateTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.body = action.payload.body;
        todo.dueDate = action.payload.dueDate;
        todo.updatedAt = new Date();
        todo.isEditing = false;

        state.items = sortTodos(state.items);
      }
    }
  },
});

const persistConfig = {
  key: 'todos',
  storage,
  transform: [{
    in: (todo: TodoState) => {
      return {
        ...todo,
        items: todo.items.map((item) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString(),
          dueDate: item.dueDate ? item.dueDate.toISOString() : undefined,
        })),
      };

    },
  }, {
    out: (state: TodoState) => {
      return {
        ...state,
        items: state.items.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          dueDate: item.dueDate ? new Date(item.dueDate) : undefined,

        })),
      };
    },
  }
  ]
};

export const persistedTodoReducer = persistReducer(persistConfig, todoSlice.reducer);
export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  startEditTodo,
  cancelEditTodo,
  updateTodo
} = todoSlice.actions;
