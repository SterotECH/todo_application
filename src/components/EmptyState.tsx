import { Card } from "./ui/card";
import { ListTodo } from "lucide-react";

export const EmptyState = () => (
  <Card className="p-6 text-center text-gray-500">
    <div className="flex flex-col items-center justify-center space-y-3 text-center">
      <div className="p-3 bg-gray-100 rounded-full">
        <ListTodo  className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="font-semibold text-gray-700">No Todo Found</h3>
      <p className="text-sm text-gray-500">
        Start by creating a new Todo. using the button above
      </p>
    </div>
  </Card>
);
