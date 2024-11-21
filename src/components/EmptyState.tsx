import { Card } from "./ui/card";
import { ListTodo } from "lucide-react";
import React from "react";

/**
 * EmptyState Component
 *
 * A reusable empty state component for todo lists with no items
 *
 * @component
 * @returns {React.ReactElement} Rendered empty state card for todos
 *
 * @example
 * // Used when no todos exist in the list
 * {todos.length === 0 && <EmptyState />}
 *
 * @description
 * Displays a visually appealing empty state for todo lists:
 * - Centered card layout
 * - Todo list icon
 * - Motivational message
 *
 * Design Features:
 * - Minimalist and clean design
 * - Encourages user action
 * - Provides context for empty state
 */
export const EmptyState = React.memo(() => (
  <Card
    className="p-6 text-center text-gray-500"
    aria-label="No todos available"
  >
    <section
      className="flex flex-col items-center justify-center space-y-3 text-center"
      aria-describedby="empty-state-description"
    >
      {/* Circular icon container */}
      <div
        className="p-3 bg-gray-100 rounded-full"
        aria-hidden="true"
      >
        <ListTodo
          className="w-6 h-6 text-gray-500"
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3
        className="font-semibold text-gray-700"
        id="empty-state-title"
      >
        No Todo Found
      </h3>

      {/* Motivational message */}
      <p
        className="text-sm text-gray-500"
        id="empty-state-description"
      >
        Start by creating a new Todo. Those who fail to plan, plan to fail.
      </p>
    </section>
  </Card>
));

EmptyState.displayName = "EmptyState";
