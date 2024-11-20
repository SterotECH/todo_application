import React from 'react';
import { TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface Props {
  value: string;
  label: string;
  count: number;
  variant?: string;
}
export const TabTriggerWithBadge = ({ value, label, count, variant = "outline" }: Props) => (
  <TabsTrigger value={value} className="flex items-center gap-2">
    {label}
    {count > 0 && (
      <Badge variant={variant as "outline" | "default" | "secondary" | "destructive"} className="ml-1">
        {count}
      </Badge>
    )}
  </TabsTrigger>
);
