export interface Todo {
  id: number;
  title: string;
  body?: string;
  dueDate?: Date;
  completed: boolean;
  isEditing: boolean;
  createdAt: Date;
  updatedAt: Date;
}
