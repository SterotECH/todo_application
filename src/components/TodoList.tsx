import React, { useMemo } from 'react';
import { useAppSelector } from '@/hooks';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import { TabTriggerWithBadge } from './TabTriggerWithBadge';
import { TabEmptyState } from './TabEmptyState';
import {
  selectAllTodos,
  selectOverdueTodos,
  selectDueTodayTodos,
  selectUpcomingTodos,
  selectUnscheduledTodos,
  selectCompletedTodos
} from '@/store/todo/todoSelectors';
import {
  AlertCircle,
  ListTodo,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

/**
 * TodoList Component
 *
 * Renders a comprehensive todo list with categorized tabs for different todo states.
 *
 * @component
 * @description Displays todos in categories: Overdue, Due Today, Upcoming, No Due Date, and Completed
 * @returns {React.ReactElement} A tabbed interface for managing todo items
 *
 * @example
 * // Typical usage in a parent component
 * function TaskPage() {
 *   return <TodoList />;
 * }
 *
 * @remarks
 * - Uses Redux selectors to categorize todos
 * - Implements memoization for performance optimization
 * - Dynamically selects default tab based on overdue tasks
 * - Provides empty states for each tab category
 */
export const TodoList: React.FC = React.memo(() => {
  // Retrieve todo categories using Redux selectors
  const todos = useAppSelector(selectAllTodos);
  const overdueTodos = useAppSelector(selectOverdueTodos);
  const dueTodayTodos = useAppSelector(selectDueTodayTodos);
  const upcomingTodos = useAppSelector(selectUpcomingTodos);
  const unscheduledTodos = useAppSelector(selectUnscheduledTodos);
  const completedTodos = useAppSelector(selectCompletedTodos);

  /**
   * Memoized categorized todos to prevent unnecessary rerenders
   *
   * @type {Object} Categorized todo lists
   * @property {Array} overdue - Todos past their due date
   * @property {Array} dueToday - Todos due on the current day
   * @property {Array} upcoming - Todos scheduled for future dates
   * @property {Array} noDueDate - Todos without a specific due date
   * @property {Array} completed - Completed todos
   */
  const categorizedTodos = useMemo(() => ({
    overdue: overdueTodos,
    dueToday: dueTodayTodos,
    upcoming: upcomingTodos,
    noDueDate: unscheduledTodos,
    completed: completedTodos
  }), [overdueTodos, dueTodayTodos, upcomingTodos, unscheduledTodos, completedTodos]);

  /**
   * Determines the default tab based on the presence of overdue todos
   *
   * @returns {string} The value of the default tab ('overdue' or 'dueToday')
   */
  const defaultTab = useMemo(() =>
    categorizedTodos.overdue.length > 0 ? "overdue" : "dueToday",
    [categorizedTodos.overdue.length]
  );

  // Early return for empty state when no todos exist
  if (todos.length === 0) {
    return <EmptyState />;
  }

  // Render the tabbed todo list interface
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      {/* Tab navigation list */}
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

      {/* Tab content rendering */}
      {[
        {
          value: "overdue",
          todos: categorizedTodos.overdue,
          emptyProps: {
            icon: AlertCircle,
            title: "No overdue tasks",
            message: "You're all caught up! All your tasks are on schedule."
          }
        },
        {
          value: "dueToday",
          todos: categorizedTodos.dueToday,
          emptyProps: {
            icon: Calendar,
            title: "No tasks due today",
            message: "You have no tasks scheduled for today. Consider planning your day!"
          }
        },
        {
          value: "upcoming",
          todos: categorizedTodos.upcoming,
          emptyProps: {
            icon: Clock,
            title: "No upcoming tasks",
            message: "You have no tasks scheduled for the future. Time to plan ahead!"
          }
        },
        {
          value: "noDueDate",
          todos: categorizedTodos.noDueDate,
          emptyProps: {
            icon: ListTodo,
            title: "No unscheduled tasks",
            message: "All your tasks have due dates assigned. Great organization!"
          }
        },
        {
          value: "completed",
          todos: categorizedTodos.completed,
          emptyProps: {
            icon: CheckCircle2,
            title: "No completed tasks",
            message: "Complete some tasks to see them here. Keep up the momentum!"
          },
          additionalClassName: "opacity-60"
        }
      ].map(({ value, todos, emptyProps, additionalClassName }) => (
        <TabsContent key={value} value={value} className="mt-0">
          {todos.length > 0 ? (
            <div className={`space-y-3 ${additionalClassName ?? ''}`}>
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          ) : (
            <TabEmptyState {...emptyProps} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
});

TodoList.displayName = 'TodoList';
