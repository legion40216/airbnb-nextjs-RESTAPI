"use client"
import { ActionBtn } from '@/components/global-ui/airbnb-buttons/action-btn';
import SecondaryBtn from '@/components/global-ui/airbnb-buttons/secondary-btn';
import React from 'react';

interface ModalActionProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
  nextButtonText?: string;
  submitButtonText?: string;
}

export default function ModalAction({
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  isSubmitting = false,
  nextButtonText = "Next",
  submitButtonText = "Submit",
}: ModalActionProps) {
  
  return (
    <div className="flex justify-between gap-2 items-center">
      {/* Back button */}
      {isFirstStep ? null : (
        <SecondaryBtn
          onClick={onBack}
          disabled={isFirstStep || isSubmitting}
        >
          Back
        </SecondaryBtn>
      )}

      {/* Next/Submit button */}
      <ActionBtn
        onClick={onNext}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : (isLastStep ? submitButtonText : nextButtonText)}
      </ActionBtn>
    </div>
  );
}