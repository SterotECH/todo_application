import { TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { LucideIcon } from 'lucide-react';

/**
 * Props interface for the TabTriggerWithBadge component
 * Defines the configuration options for a tab trigger with a badge
 */
interface Props {
  /**
   * The unique identifier for the tab
   * Used as the value prop for the TabsTrigger
   */
  value: string;

  /**
   * The text label displayed for the tab
   */
  label: string;

  /**
   * The count to be displayed in the badge
   * Only renders a badge if count is greater than 0
   */
  count: number;

  /**
   * Optional Lucide icon to be displayed alongside the label
   * Renders the icon if provided
   */
  icon?: LucideIcon;

  /**
   * Determines the visual style of the badge
   * @default "outline"
   */
  variant?: "outline" | "default" | "secondary" | "destructive";

  /**
   * Controls the visibility of the label on mobile devices
   * - true: Label is always visible
   * - false: Label is hidden on mobile, shown on larger screens
   * @default false
   */
  showLabelOnMobile?: boolean;
}

/**
 * TabTriggerWithBadge Component
 *
 * A flexible tab trigger that supports:
 * - Optional icons
 * - Responsive label display
 * - Configurable badge with count
 *
 * @component
 * @param {Props} props - Component properties
 * @returns {React.ReactElement} Rendered tab trigger with optional badge
 *
 * @example
 * // Basic usage with an icon and badge
 * <TabTriggerWithBadge
 *   value="inbox"
 *   label="Inbox"
 *   count={5}
 *   icon={MailIcon}
 * />
 *
 * @example
 * // Customized with different badge variant and mobile label
 * <TabTriggerWithBadge
 *   value="alerts"
 *   label="Alerts"
 *   count={3}
 *   icon={BellIcon}
 *   variant="destructive"
 *   showLabelOnMobile={true}
 * />
 *
 * @description
 * This component creates a tab trigger with:
 * - An optional icon
 * - A label (with responsive display option)
 * - A badge showing a count (when count > 0)
 *
 * Responsive Behavior:
 * - By default, label is hidden on mobile and shown on larger screens
 * - Can be configured to always show label using showLabelOnMobile prop
 */
export const TabTriggerWithBadge = ({
  value,
  label,
  count,
  icon: Icon,
  variant = "outline",
  showLabelOnMobile = false
}: Props) => (
  // TabsTrigger with flexible layout and transition
  <TabsTrigger
    value={value}
    className="flex items-center gap-2 transition-all"
    aria-label={`${label} (${count} items)`}
  >
    {/* Render icon if provided */}
    {Icon && (
      <Icon
        className="w-4 h-4"
        aria-hidden="true"  // Hide from screen readers if label is present
      />
    )}

    {/* Responsive label display */}
    <span
      className={`${showLabelOnMobile ? '' : 'hidden md:inline-block'}`}
    >
      {label}
    </span>

    {/* Render badge when count is greater than 0 */}
    {count > 0 && (
      <Badge
        variant={variant}
        className="ml-1 text-xs"
        aria-label={`${count} items`}
      >
        {count}
      </Badge>
    )}
  </TabsTrigger>
);

TabTriggerWithBadge.displayName = "TabsTriggerWithBadge";
