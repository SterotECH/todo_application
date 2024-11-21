import React, { useCallback, useMemo } from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { DateTimePicker } from "./DateTimePicker";
import { Todo } from "@/types";
import { Edit } from "lucide-react";

/**
 * Props interface for the EditTodoSheet component
 */
interface EditTodoSheetProps {
  /** The todo item to be edited */
  todo: Todo;
  /** Callback function to update the todo */
  onUpdate: (title: string, description: string, dueDate?: Date) => void;
  /** Custom trigger component if needed */
  trigger?: React.ReactNode;
  /** Optional custom submit button text */
  submitButtonText?: string;
  /** Optional class name for additional styling */
  className?: string;
}

/**
 * Interface for the component's state
 */
interface TodoEditState {
  title: string;
  description: string;
  dueDate?: Date;
  isOpen: boolean;
}

/**
 * EditTodoSheet - A reusable component for editing a todo item
 *
 * @component
 * @param {EditTodoSheetProps} props - Component properties
 *
 * @example
 * return (
 *   <EditTodoSheet
 *     todo={currentTodo}
 *     onUpdate={handleTodoUpdate}
 *   />
 * )
 */
export const EditTodoSheet: React.FC<EditTodoSheetProps> = React.memo(({
  todo,
  onUpdate,
  trigger,
  submitButtonText = "Save changes",
  className = ""
}) => {
  // Memoize initial state to prevent unnecessary re-renders
  const initialState = useMemo((): TodoEditState => ({
    title: todo.title,
    description: todo.body ?? '',
    dueDate: todo.dueDate,
    isOpen: false
  }), [todo.title, todo.body, todo.dueDate]);

  // State hook using the consolidated state object
  const [state, setState] = React.useState<TodoEditState>(initialState);

  /**
   * Creates a state update function with partial updates
   *
   * @param {Partial<TodoEditState>} updates - Partial state updates
   */
  const updateState = useCallback((updates: Partial<TodoEditState>) => {
    setState(prevState => ({
      ...prevState,
      ...updates
    }));
  }, []);

  /**
   * Handles form submission
   * Updates the todo item and closes the sheet
   *
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Validate title before submission
    const trimmedTitle = state.title.trim();
    if (trimmedTitle) {
      // Call update callback with trimmed values
      onUpdate(
        trimmedTitle,
        state.description.trim(),
        state.dueDate
      );

      // Close the sheet
      updateState({ isOpen: false });
    }
  }, [state.title, state.description, state.dueDate, onUpdate, updateState]);

  /**
   * Renders the edit todo sheet
   */
  return (
    <Sheet open={state.isOpen} onOpenChange={(open) => updateState({ isOpen: open })}>
      {/* Customizable trigger with default fallback */}
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="secondary" aria-label="Edit Todo">
            <Edit />
          </Button>
        )}
      </SheetTrigger>

      {/* Sheet content with form for editing todo */}
      <SheetContent className={className}>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Todo</SheetTitle>
          </SheetHeader>

          <div className="py-4 space-y-4">
            {/* Title input */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={state.title}
                onChange={(e) => updateState({ title: e.target.value })}
                placeholder="Enter todo title"
                required
                aria-required="true"
              />
            </div>

            {/* Description textarea */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={state.description}
                onChange={(e) => updateState({ description: e.target.value })}
                placeholder="Enter todo description"
              />
            </div>

            {/* Date and time picker */}
            <div className="space-y-2">
              <Label>Due Date & Time</Label>
              <DateTimePicker
                date={state.dueDate}
                onSelect={(dueDate) => updateState({ dueDate })}
                aria-label="Select due date and time"
              />
            </div>
          </div>

          {/* Submit button with customizable text */}
          <SheetFooter>
            <Button type="submit">{submitButtonText}</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
});

EditTodoSheet.displayName = 'EditTodoSheet';
