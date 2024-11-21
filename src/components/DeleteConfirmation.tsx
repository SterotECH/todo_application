import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

/**
 * Props interface for the DeleteConfirmationDialog component
 */
interface DeleteConfirmationDialogProps {
  /**
   * Callback function to be executed when deletion is confirmed
   */
  onConfirm: () => void;

  /**
   * Optional className to apply additional styling to the trigger button
   */
  className?: string;
}

/**
 * DeleteConfirmationDialog component provides a reusable confirmation
 * dialog for deleting an item with a destructive action
 *
 * @component
 * @example
 * return (
 *   <DeleteConfirmationDialog
 *     onConfirm={() => handleDelete(itemId)}
 *     className="custom-delete-button-style"
 *   />
 * )
 */
export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = React.memo(({
  onConfirm,
  className
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="destructive"
        className={className}
        aria-label="Delete item"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your item and remove it from the system.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
));

DeleteConfirmationDialog.displayName = 'DeleteConfirmationDialog';
