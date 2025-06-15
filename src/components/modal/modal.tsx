// modal.tsx
"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ModalProps = {
  body: React.ReactNode;
  children?: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export default function Modal({
  body,
  children,
  description,
  title,
  isOpen,
  setOpen,
}: ModalProps) {
  return (
    <Dialog  open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className='flex flex-col gap-y-4 h-full max-h-[90vh]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto p-2">
          {body}
        </div>
      </DialogContent>
    </Dialog>
  );
}