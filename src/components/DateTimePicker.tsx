import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

/**
 * Props interface for the DateTimePicker component
 * Defines the configuration and callback for date selection
 */
interface DateTimePickerProps {
  /**
   * Optional initial date for the picker
   * If provided, will pre-populate the date and time fields
   */
  date?: Date;

  /**
   * Callback function triggered when a date and time are selected
   * Provides the complete datetime or undefined if no date is selected
   */
  onSelect: (date: Date | undefined) => void;
}

/**
 * DateTimePicker Component
 *
 * A comprehensive date and time selection component
 *
 * @component
 * @param {DateTimePickerProps} props - Component properties
 * @returns {React.ReactElement} Rendered date and time picker
 *
 * @example
 * // Basic usage
 * <DateTimePicker
 *   date={new Date()}
 *   onSelect={(selectedDateTime) => handleDateTimeChange(selectedDateTime)}
 * />
 *
 * @description
 * Provides a user-friendly interface for selecting:
 * - Date using a popover calendar
 * - Time using a time input
 *
 * Features:
 * - Combines date and time selection
 * - Flexible initial date setting
 * - Reactive updates via onSelect callback
 * - Responsive design
 */
export const DateTimePicker: React.FC<DateTimePickerProps> = React.memo(({ date, onSelect })  => {
  // State for managing selected date
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);

  // State for managing selected time (defaults to current time or 12:00)
  const [selectedTime, setSelectedTime] = React.useState(
    date ? format(date, 'HH:mm') : '12:00'
  );

  /**
   * Effect to combine selected date and time
   * Triggers onSelect callback when date or time changes
   */
  React.useEffect(() => {
    if (selectedDate) {
      // Combine selected date with selected time
      const [hours, minutes] = selectedTime.split(':');
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

      // Call onSelect with the combined date and time
      onSelect(newDate);
    } else {
      // Call onSelect with undefined if no date is selected
      onSelect(undefined);
    }
  }, [selectedDate, selectedTime, onSelect]);

  return (
    <div
      className="flex flex-col gap-4"
      aria-label="Date and Time Picker"
    >
      {/* Date Selection Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground'
            )}
            aria-label="Open date selection"
          >
            <CalendarIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          aria-label="Select a date"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
            aria-label="Calendar for date selection"
          />
        </PopoverContent>
      </Popover>

      {/* Time Selection Input */}
      <Input
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="w-full"
        aria-label="Select time"
      />
    </div>
  );
});

export default React.memo(DateTimePicker);
