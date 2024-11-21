import React, { useCallback, useState } from 'react';
import { useAppDispatch } from '@/hooks';
import { addTodo } from '@/store/todo/todoSlice';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from './ui/dialog';
import { Label } from './ui/label';
import { DateTimePicker } from './DateTimePicker';
import { toast } from 'sonner';

/**
 * Interface defining the structure of the todo input state
 * Includes title, body, and optional due date for a todo item
 */
interface TodoInputState {
  title: string;
  body: string;
  dueDate: Date | undefined;
}

/**
 * TodoInput Component
 *
 * A reusable input component for creating new todo items
 *
 * Features:
 * - Dialog-based input form
 * - Title and body text inputs
 * - Optional due date selection
 * - Form validation
 * - State management using React hooks
 * - Integration with Redux store for adding todos
 *
 * @component
 * @returns {React.ReactElement} A dialog component for adding new todos
 */
export const TodoInput: React.FC = React.memo(() => {
  // Redux dispatch hook for adding todos to the store
  const dispatch = useAppDispatch();

  // Consolidated state management for todo input fields
  const [state, setState] = useState<TodoInputState>({
    title: '',
    body: '',
    dueDate: undefined
  });

  // State to control dialog open/close
  const [open, setOpen] = useState(false);

  /**
   * Memoized handler to update specific state fields
   * Allows dynamic updating of input fields while maintaining immutability
   *
   * @param {keyof TodoInputState} field - The field to be updated
   * @returns {Function} Event handler that updates the specific field
   */
  const handleInputChange = useCallback((field: keyof TodoInputState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState(prev => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  /**
   * Memoized handler to set the due date
   * Updates the dueDate in the component state
   *
   * @param {Date | undefined} date - Selected date or undefined
   */
  const handleDateChange = useCallback((date: Date | undefined) => {
    setState(prev => ({ ...prev, dueDate: date }));
  }, []);

  /**
   * Memoized submit handler for adding a new todo
   * Performs validation, dispatches action to add todo, and resets form
   *
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Trim and validate title
    const trimmedTitle = state.title.trim();
    if (!trimmedTitle) {
      toast("Whoops! You forgot to add a title", {
        description: "Please add a title to your todo.",
      });
      return;
    }

    // Dispatch action to add todo to the store
    dispatch(addTodo({
      title: trimmedTitle,
      body: state.body,
      dueDate: state.dueDate
    }));

    // Reset form state
    setState({
      title: '',
      body: '',
      dueDate: undefined
    });

    // Close dialog
    setOpen(false);
  }, [dispatch, state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>
            Add a new todo to your list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Title</Label>
              <Input
                id="title"
                value={state.title}
                onChange={handleInputChange('title')}
                placeholder="Enter todo title"
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body" className="text-sm font-medium">Body</Label>
              <Textarea
                id="body"
                value={state.body}
                onChange={handleInputChange('body')}
                placeholder="Optional todo description"
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Due Date & Time</Label>
              <DateTimePicker
                date={state.dueDate}
                onSelect={handleDateChange}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

TodoInput.displayName = 'TodoInput';
