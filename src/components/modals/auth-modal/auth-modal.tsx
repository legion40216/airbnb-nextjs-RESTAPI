// components/auth/AuthModal.tsx
'use client';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import AuthModalAction from './components/auth-modal-action';

type AuthModalProps = {
  body: React.ReactNode;
  children?: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  isSubmitting: boolean;
  handleSubmitForm: () => void;
  formType: 'register' | 'login';
};

export default function AuthModal({
  body,
  children,
  description,
  title,
  isOpen,
  setOpen,
  isSubmitting,
  handleSubmitForm,
  formType,
}: AuthModalProps) {
  
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="flex flex-col justify-between gap-y-4 h-full max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="h-full overflow-y-auto p-2">
          {body}
        </div>

        <AuthModalAction 
        isSubmitting={isSubmitting} 
        handleSubmitForm={handleSubmitForm} 
        formType={formType}
        />
      </DialogContent>
    </Dialog>
  );
}