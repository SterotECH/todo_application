import React from "react";
import { Card } from "./ui/card";

/**
 * Props interface for the TabEmptyState component
 * Defines the configuration options for an empty state display
 */
interface Props {
  /**
   * The icon component to be displayed
   * Accepts any React component type that can be rendered as an icon
   */
  icon: React.ElementType;

  /**
   * The title text for the empty state
   * Provides a concise headline explaining the empty state
   */
  title: string;

  /**
   * The descriptive message for the empty state
   * Offers more detailed information about the current state
   */
  message: string;
}

/**
 * TabEmptyState Component
 *
 * A reusable empty state component for tabs or sections with no content
 *
 * @component
 * @param {Props} props - Component properties
 * @returns {React.ReactElement} Rendered empty state card
 *
 * @example
 * // Basic usage with an icon, title, and message
 * <TabEmptyState
 *   icon={FolderIcon}
 *   title="No Items"
 *   message="There are no items in this section yet."
 * />
 *
 * @description
 * Creates a centered card with:
 * - A circular background for the icon
 * - A bold title
 * - A subtle descriptive message
 *
 * Design Characteristics:
 * - Responsive and centered layout
 * - Soft, neutral color scheme
 * - Visually indicates lack of content
 */
export const TabEmptyState = ({ icon: Icon, title, message }: Props) => (
  // Card component with padding
  <Card
    className="p-8"
    aria-label={`Empty state: ${title}`}
  >
    {/* Centered flex container with vertical spacing */}
    <section
      className="flex flex-col items-center justify-center space-y-3 text-center"
      aria-describedby="empty-state-description"
    >
      {/* Circular icon container with background */}
      <div
        className="p-3 bg-gray-100 rounded-full"
        aria-hidden="true"
      >
        <Icon
          className="w-6 h-6 text-gray-500"
          aria-hidden="true"
        />
      </div>

      {/* Title with semi-bold styling */}
      <h3
        className="font-semibold text-gray-700"
        id="empty-state-title"
      >
        {title}
      </h3>

      {/* Descriptive message with subtle styling */}
      <p
        className="text-sm text-gray-500"
        id="empty-state-description"
      >
        {message}
      </p>
    </section>
  </Card>
);

TabEmptyState.displayName = "TabEmptyState"
