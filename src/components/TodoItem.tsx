import { useAppDispatch } from "@/hooks";
import { deleteTodo, toggleTodo, updateTodo } from "@/store/todo/todoSlice";
import { Todo } from "@/type";
import { Card, CardContent, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";
import { isBefore } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { TodoContent } from "./TodoContent";
import { EditTodoSheet } from "./EditTodoSheet";
import { DeleteConfirmationDialog } from "./DeleteConfirmation";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useAppDispatch();

  const handleUpdate = (title: string, description: string, dueDate?: Date) => {
    dispatch(updateTodo({
      id: todo.id,
      title,
      description,
      dueDate
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className="transition-all duration-300 ease-in-out transform">
      <Card
        className={cn(
          "mb-4 hover:shadow-md transition-shadow duration-300",
          todo.dueDate && !todo.completed && isBefore(todo.dueDate, new Date()) &&
          "border-destructive bg-destructive"
        )}
      >
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="transition-transform duration-200 hover:scale-110">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => dispatch(toggleTodo(todo.id))}
                className="mt-1"
              />
            </div>
            <TodoContent todo={todo} />
          </div>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          {!todo.completed && <EditTodoSheet todo={todo} onUpdate={handleUpdate} />}
          <DeleteConfirmationDialog onConfirm={handleDelete} />
        </CardFooter>
      </Card>
    </div>
  );
};
