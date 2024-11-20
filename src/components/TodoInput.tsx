import { useAppDispatch } from '@/hooks';
import { addTodo } from '@/store/todo/todoSlice';
import React from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { DateTimePicker } from './DateTimePicker';

export const TodoInput = () => {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo({ title, body, dueDate }));
    setTitle('');
    setBody('');
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Add Todo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>
            Add a new todo to your list.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-2'
        >
          <div className="space-y-2">
            <Label className="text-sm font-medium">Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Body</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Due Date & Time</Label>
            <DateTimePicker date={dueDate} onSelect={setDueDate} />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}
