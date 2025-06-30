"use client"
import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

type ConfirmModalProps = {
  onConfirm: () => void;
  children: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  isDisabled?: boolean; // Optional prop to control button state
};

export default function ConfirmModal({
    onConfirm,
    children,
    open = false,
    setOpen,
    isDisabled = false, // Default to false if not provided
}: ConfirmModalProps) {
  return (
<AlertDialog open={open}>
  <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>{setOpen(false)}}>Cancel</AlertDialogCancel>
      <AlertDialogAction 
      onClick={onConfirm}
      disabled={isDisabled} // You can add a condition here if needed
      >
        Continue
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
