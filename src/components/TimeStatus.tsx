import { addDays, format, isBefore, isToday } from "date-fns";
import { Clock } from "lucide-react";
import React from "react";

/**
 * Props interface for the TimeStatus component
 * Defines the structure of the component's input properties
 */
interface TimeStatusProps {
  /**
   * The due date to be analyzed and displayed
   * Determines the status and visual representation of the component
   */
  dueDate: Date;
}

/**
 * TimeStatus Component
 *
 * Renders a time-sensitive status indicator with color-coded visual feedback
 *
 * @component
 * @param {TimeStatusProps} props - Component properties
 * @returns {React.ReactElement|null} Rendered time status component or null
 *
 * @description
 * Provides a visual representation of a date's status:
 * - Categorizes dates as Overdue, Due Soon, or Upcoming
 * - Uses color coding to highlight urgency
 * - Displays a formatted date with a clock icon
 *
 * @example
 * // Renders a time status for a future task
 * <TimeStatus dueDate={new Date('2024-02-15T14:30:00')} />
 *
 * Status Definitions:
 * - Overdue: Date is in the past (excluding today)
 * - Due Soon: Date is within the next 2 days
 * - Upcoming: Date is more than 2 days in the future
 *
 * Color Scheme:
 * - Red: Overdue tasks
 * - Yellow: Tasks due soon
 * - Green: Upcoming tasks
 */
export const TimeStatus: React.FC<TimeStatusProps> = ({ dueDate }) => {
  // Validate input: return null if no due date is provided
  if (!dueDate) return null;

  // Current date for comparison
  const now = new Date();

  /**
   * Determines if the task is overdue
   * A task is overdue if it's in the past and not today
   */
  const isOverdue = isBefore(dueDate, now) && !isToday(dueDate);

  /**
   * Determines if the task is due soon
   * A task is due soon if it's not overdue and within the next 2 days
   */
  const isDueSoon = !isOverdue && isBefore(dueDate, addDays(now, 2));

  /**
   * Selects an appropriate color based on the task's status
   * @returns {string} Tailwind CSS color class
   */
  const getStatusColor = (): string => {
    if (isOverdue) return 'text-red-500';
    if (isDueSoon) return 'text-yellow-500';
    return 'text-green-500';
  };

  /**
   * Generates a human-readable status text
   * @returns {string} Status description
   */
  const getStatusText = (): string => {
    if (isOverdue) return 'Overdue';
    if (isDueSoon) return 'Due Soon';
    return 'Upcoming';
  };

  return (
    <div
      className={`flex items-center gap-2 ${getStatusColor()} text-sm font-medium`}
      aria-label={`Task ${getStatusText()} on ${format(dueDate, 'PPp')}`}
      data-status={getStatusText().toLowerCase()}
    >
      {/* Clock icon representing time-related status */}
      <Clock className="w-4 h-4" />

      {/* Formatted status and date */}
      <span>{getStatusText()} - {format(dueDate, 'PPp')}</span>
    </div>
  );
};

TimeStatus.displayName = "TimeStatus";
