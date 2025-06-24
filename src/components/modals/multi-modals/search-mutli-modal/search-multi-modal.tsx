"use client"
import React from 'react';
import { checkSearchParams } from '@/utils/checkSearchParams';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ModalAction from '../components/multi-modal-action';
import RemoveFilterBtn from '@/components/global-ui/airbnb-buttons/remove-filter-btn';
import { Separator } from '@/components/ui/separator';

type SearchMultiModalProps = {
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

export default function SearchMultiModal({
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
}: SearchMultiModalProps) {
  
  const hasQuery = checkSearchParams()

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="flex flex-col gap-y-2 h-full 
      max-h-[90vh]"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="h-full overflow-y-auto">
          {body}
        </div>

        <Separator />

        {/* Actions and buttons */}
        <div className='grid space-y-2'>
          <ModalAction
            onBack={onBack}
            onNext={onNext}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isSubmitting={isSubmitting}
            nextButtonText={isLastStep ? submitButtonText : nextButtonText}
          />

          {hasQuery && <RemoveFilterBtn setOpen={setOpen}/>}
        </div>
      </DialogContent>
    </Dialog>
  );
}