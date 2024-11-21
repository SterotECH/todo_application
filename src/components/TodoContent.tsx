import { Todo } from "@/type";
import { TimeStatus } from "./TimeStatus";

export const TodoContent = ({ todo }: { todo: Todo }) => (
  <div className="flex-1">
    <h3
      className={`font-medium transition-all duration-300 ${todo.completed ? 'line-through text-gray-400' : ''
        }`}
    >
      {todo.title}
    </h3>
    {todo.body && (
      <p
        className={`mt-1 text-sm transition-all duration-300 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-500'
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
);
