import { addDays, format, isBefore, isToday } from "date-fns";
import { Clock } from "lucide-react";

export const TimeStatus = ({ dueDate }: { dueDate?: Date }) => {
  if (!dueDate) return null;

  const now = new Date();
  const isOverdue = isBefore(dueDate, now) && !isToday(dueDate);
  const isDueSoon = !isOverdue && isBefore(dueDate, addDays(now, 2));

  const getStatusColor = () => {
    if (isOverdue) return 'text-red-500';
    if (isDueSoon) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusText = () => {
    if (isOverdue) return 'Overdue';
    if (isDueSoon) return 'Due Soon';
    return 'Upcoming';
  };

  return (
    <div className={`flex items-center gap-2 ${getStatusColor()} text-sm font-medium`}>
      <Clock className="w-4 h-4" />
      <span>{getStatusText()} - {format(dueDate, 'PPp')}</span>
    </div>
  );
};
