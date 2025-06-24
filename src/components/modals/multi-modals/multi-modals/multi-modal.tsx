"use client"
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ModalAction from '../components/multi-modal-action';

type MultiModalProps = {
  body: React.ReactNode;
  children?: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
  nextButtonText?: string;
  submitButtonText?: string;
};

export default function MultiModal({
  body,
  children,
  description,
  title,
  isOpen,
  setOpen,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  isSubmitting = false,
  nextButtonText = "Next",
  submitButtonText = "Submit",
}: MultiModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="flex flex-col gap-y-3 h-full 
      max-h-[90vh]"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="h-full overflow-y-auto">
          {body}
        </div>

        <ModalAction
          onBack={onBack}
          onNext={onNext}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
          nextButtonText={isLastStep ? submitButtonText : nextButtonText}
        />
      </DialogContent>
    </Dialog>
  );
}