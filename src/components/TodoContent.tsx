import React from 'react';
import { Todo } from "@/types";
import { TimeStatus } from "./TimeStatus";

/**
 * Props interface for the TodoContent component
 */
interface TodoContentProps {
  todo: Todo;

  /**
   * Optional className to apply additional or override default styling
   */
  className?: string;
}

/**
 * TodoContent component renders the details of a todo item
 * Displays title, optional body, and time status for uncompleted todos
 *
 * @component
 * @example
 * return (
 *   <TodoContent
 *     todo={todoItem}
 *     className="custom-todo-style"
 *   />
 * )
 */
export const TodoContent: React.FC<TodoContentProps> = React.memo(({
  todo,
  className = ''
}) => (
  <div className={`flex-1 ${className}`}>
    <h3
      className={`font-medium transition-all duration-300 ${
        todo.completed
          ? 'line-through text-gray-400'
          : 'text-gray-800'
      }`}
    >
      {todo.title}
    </h3>

    {todo.body && (
      <p
        className={`mt-1 text-sm transition-all duration-300 ${
          todo.completed
            ? 'line-through text-gray-400'
            : 'text-gray-500'
        }`}
      >
        {todo.body}
      </p>
    )}

    {todo.dueDate && !todo.completed && (
      <div className="mt-2">
        <TimeStatus dueDate={todo.dueDate} />
      </div>
    )}
  </div>
));

TodoContent.displayName = 'TodoContent';
