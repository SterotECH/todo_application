import { Todo } from '@/types';
import { RootState } from '..';
import { isAfter, isBefore, isToday } from 'date-fns';

export const selectAllTodos = (state: RootState): Todo[] => state.todos.todos;

export const selectCompletedTodos = (state: RootState): Todo[] =>
  state.todos.todos.filter(todo =>
    todo.completed
  );

export const selectOverdueTodos = (state: RootState): Todo[] =>
  state.todos.todos.filter(todo =>
    !todo.completed &&
    todo.dueDate &&
    isBefore(todo.dueDate, new Date()) &&
    !isToday(todo.dueDate)
  );

export const selectDueTodayTodos = (state: RootState): Todo[] =>
  state.todos.todos.filter(todo =>
    !todo.completed &&
    todo.dueDate &&
    isToday(todo.dueDate)
  );

export const selectUpcomingTodos = (state: RootState): Todo[] =>
  state.todos.todos.filter(todo =>
    !todo.completed &&
    todo.dueDate &&
    isAfter(todo.dueDate, new Date()) &&
    !isToday(todo.dueDate)
  );

export const selectUnscheduledTodos = (state: RootState): Todo[] =>
  state.todos.todos.filter(todo =>
    !todo.completed &&
    !todo.dueDate
  );
