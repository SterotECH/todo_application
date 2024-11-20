import { Todo } from "@/type";
import React from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { DateTimePicker } from "./DateTimePicker";

export const EditTodoSheet = ({ todo, onUpdate }: {
  todo: Todo,
  onUpdate: (title: string, description: string, dueDate?: Date) => void
}) => {
  const [title, setTitle] = React.useState(todo.title);
  const [description, setDescription] = React.useState(todo.body || '');
  const [dueDate, setDueDate] = React.useState<Date | undefined>(todo.dueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onUpdate(title.trim(), description.trim(), dueDate);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Todo</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter todo description"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Due Date & Time</Label>
              <DateTimePicker date={dueDate} onSelect={setDueDate} />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
