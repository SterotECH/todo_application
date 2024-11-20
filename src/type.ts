export type Todo = {
  id: number;
  title: string;
  body: string;
  completed: boolean;
  isEditing: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
