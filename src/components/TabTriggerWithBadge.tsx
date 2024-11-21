import { TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { LucideIcon } from 'lucide-react';

interface Props {
  value: string;
  label: string;
  count: number;
  icon?: LucideIcon;
  variant?: "outline" | "default" | "secondary" | "destructive";
  showLabelOnMobile?: boolean;
}

export const TabTriggerWithBadge = ({
  value,
  label,
  count,
  icon: Icon,
  variant = "outline",
  showLabelOnMobile = false
}: Props) => (
  <TabsTrigger
    value={value}
    className="flex items-center gap-2 transition-all"
  >
    {Icon && (
      <Icon className="w-4 h-4" />
    )}
    <span className={`${showLabelOnMobile ? '' : 'hidden md:inline-block'}`}>
      {label}
    </span>
    {count > 0 && (
      <Badge
        variant={variant}
        className="ml-1 text-xs"
      >
        {count}
      </Badge>
    )}
  </TabsTrigger>
);
