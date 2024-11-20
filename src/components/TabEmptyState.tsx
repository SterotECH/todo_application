import React from "react";
import { Card } from "./ui/card";

interface Props {
  icon: React.ElementType;
  title: string;
  message: string;
}

export const TabEmptyState = ({
  icon: Icon,
  title,
  message
}: Props) => (
  <Card className="p-8">
    <div className="flex flex-col items-center justify-center space-y-3 text-center">
      <div className="p-3 bg-gray-100 rounded-full">
        <Icon className="w-6 h-6 text-gray-500" />
      </div>
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  </Card>
);
