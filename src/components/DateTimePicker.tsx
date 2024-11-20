import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format} from 'date-fns';

export const DateTimePicker = ({
  date,
  onSelect
}: {
  date?: Date,
  onSelect: (date: Date | undefined) => void
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);
  const [selectedTime, setSelectedTime] = React.useState(
    date ? format(date, 'HH:mm') : '12:00'
  );

  React.useEffect(() => {
    if (selectedDate) {
      const [hours, minutes] = selectedTime.split(':');
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      onSelect(newDate);
    } else {
      onSelect(undefined);
    }
  }, [selectedDate, selectedTime, onSelect]);

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="w-full"
      />
    </div>
  );
};
