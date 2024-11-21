import React from 'react';
import { useAppDispatch } from "@/hooks";
import { deleteTodo, toggleTodo, updateTodo } from "@/store/todo/todoSlice";
import { Todo } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";
import { isBefore } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { TodoContent } from "./TodoContent";
import { EditTodoSheet } from "./EditTodoSheet";
import { DeleteConfirmationDialog } from "./DeleteConfirmation";

/**
 * Props interface for the TodoItem component
 */
interface TodoItemProps {
  todo: Todo;
}

/**
 * TodoItem component represents an individual todo item
 * with toggle, edit, and delete functionality
 */
export const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo }) => {
  const dispatch = useAppDispatch();

  /**
   * Handles updating a todo item with new title, body, and optional due date
   */
  const handleUpdate = React.useCallback((title: string, body: string, dueDate?: Date) => {
    dispatch(updateTodo({
      id: todo.id,
      title,
      body,
      dueDate
    }));
  }, [dispatch, todo.id]);

  /**
   * Handles deleting the current todo item
   */
  const handleDelete = React.useCallback(() => {
    dispatch(deleteTodo(todo.id));
  }, [dispatch, todo.id]);

  /**
   * Handles toggling the completed status of the todo item
   */
  const handleToggle = React.useCallback(() => {
    dispatch(toggleTodo(todo.id));
  }, [dispatch, todo.id]);

  /**
   * Determines if the todo item is overdue
   * An item is overdue if it has a due date, is not completed,
   * and the due date is before the current date
   */
  const isOverdue = React.useMemo(() =>
    todo.dueDate && !todo.completed && isBefore(todo.dueDate, new Date()),
    [todo.dueDate, todo.completed]
  );

  return (
    <Card
      className={cn(
        "w-full mb-2 relative",
        todo.completed && "opacity-50",
        isOverdue && "border-red-500"
      )}
    >
      <CardContent className="flex items-center p-4 space-x-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="mr-2"
        />
        <TodoContent
        todo={todo}
        />
      </CardContent>
      <CardFooter className="flex justify-end p-2 space-x-2">
        {!todo.completed && (
          <EditTodoSheet
            todo={todo}
            onUpdate={handleUpdate}
          />
        )}
        <DeleteConfirmationDialog
          onConfirm={handleDelete}
        />
      </CardFooter>
    </Card>
  );
});

TodoItem.displayName = 'TodoItem';
