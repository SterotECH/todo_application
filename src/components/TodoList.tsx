import React from 'react';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { isAfter, isBefore, isToday } from 'date-fns';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import { TabTriggerWithBadge } from './TabTriggerWithBadge';
import { TabEmptyState } from './TabEmptyState';
import { AlertCircle, ListTodo , AlertTriangle, Calendar, Clock, CheckCircle2, HelpCircle } from 'lucide-react';


export const TodoList = () => {
  const todos = useAppSelector((state: RootState) => state.todos.todos);

  const categorizedTodos = React.useMemo(() => {
    const now = new Date();

    const overdue = todos.filter(todo =>
      !todo.completed &&
      todo.dueDate &&
      isBefore(todo.dueDate, now) &&
      !isToday(todo.dueDate)
    );

    const dueToday = todos.filter(todo =>
      !todo.completed &&
      todo.dueDate &&
      isToday(todo.dueDate)
    );

    const upcoming = todos.filter(todo =>
      !todo.completed &&
      todo.dueDate &&
      isAfter(todo.dueDate, now) &&
      !isToday(todo.dueDate)
    );

    const noDueDate = todos.filter(todo =>
      !todo.completed &&
      !todo.dueDate
    );

    const completed = todos.filter(todo =>
      todo.completed
    );

    return {
      overdue,
      dueToday,
      upcoming,
      noDueDate,
      completed
    };
  }, [todos]);

  if (todos.length === 0) {
    return <EmptyState />;
  }

  // Default to "overdue" tab if there are overdue items, otherwise "dueToday"
  const defaultTab = categorizedTodos.overdue.length > 0 ? "overdue" : "dueToday";

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="justify-start w-full mb-6">
        <TabTriggerWithBadge
          value="overdue"
          label="Overdue"
          count={categorizedTodos.overdue.length}
          variant="destructive"
          icon={AlertTriangle}
        />
        <TabTriggerWithBadge
          value="dueToday"
          label="Due Today"
          count={categorizedTodos.dueToday.length}
          variant="secondary"
          icon={Clock}
        />
        <TabTriggerWithBadge
          value="upcoming"
          label="Upcoming"
          count={categorizedTodos.upcoming.length}
          icon={Calendar}
        />
        <TabTriggerWithBadge
          value="noDueDate"
          label="No Due Date"
          count={categorizedTodos.noDueDate.length}
          icon={HelpCircle}
        />
        <TabTriggerWithBadge
          value="completed"
          label="Completed"
          count={categorizedTodos.completed.length}
          variant="secondary"
          icon={CheckCircle2}
        />
      </TabsList>

      <TabsContent value="overdue" className="mt-0">
        {categorizedTodos.overdue.length > 0 ? (
          <div className="space-y-3">
            {categorizedTodos.overdue.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <TabEmptyState
            icon={AlertCircle}
            title="No overdue tasks"
            message="You're all caught up! All your tasks are on schedule."
          />
        )}
      </TabsContent>

      <TabsContent value="dueToday" className="mt-0">
        {categorizedTodos.dueToday.length > 0 ? (
          <div className="space-y-3">
            {categorizedTodos.dueToday.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <TabEmptyState
            icon={Calendar}
            title="No tasks due today"
            message="You have no tasks scheduled for today. Consider planning your day!"
          />
        )}
      </TabsContent>

      <TabsContent value="upcoming" className="mt-0">
        {categorizedTodos.upcoming.length > 0 ? (
          <div className="space-y-3">
            {categorizedTodos.upcoming.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <TabEmptyState
            icon={Clock}
            title="No upcoming tasks"
            message="You have no tasks scheduled for the future. Time to plan ahead!"
          />
        )}
      </TabsContent>

      <TabsContent value="noDueDate" className="mt-0">
        {categorizedTodos.noDueDate.length > 0 ? (
          <div className="space-y-3">
            {categorizedTodos.noDueDate.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <TabEmptyState
            icon={ListTodo}
            title="No unscheduled tasks"
            message="All your tasks have due dates assigned. Great organization!"
          />
        )}
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        {categorizedTodos.completed.length > 0 ? (
          <div className="space-y-3 opacity-60">
            {categorizedTodos.completed.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <TabEmptyState
            icon={CheckCircle2}
            title="No completed tasks"
            message="Complete some tasks to see them here. Keep up the momentum!"
          />
        )}
      </TabsContent>
    </Tabs>
  );
};
