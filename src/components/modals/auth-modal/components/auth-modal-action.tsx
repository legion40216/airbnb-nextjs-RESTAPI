// components/auth/AuthModalAction.tsx
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ActionBtn } from '@/components/global-ui/airbnb-buttons/action-btn';
import { useAuthModalStore } from '@/hooks/useAuthModalStore';

type AuthModalActionProps = {
  isSubmitting: boolean;
  handleSubmitForm: () => void;
  formType: 'register' | 'login';
};

export default function AuthModalAction({ 
  isSubmitting,
  handleSubmitForm,
  formType,
}: AuthModalActionProps) {
const { setType : setFormType } = useAuthModalStore();

  return (
    <div className="text-center space-y-4">
      <ActionBtn
        onClick={handleSubmitForm}
        disabled={isSubmitting}
      >
        {formType === 'login'&& 'Sign in'}
        {formType === 'register' && 'Sign up'}
      </ActionBtn>

      <p className="text-sm text-gray-600">
        {formType === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <Button
          variant="link"
          className="text-primary hover:underline p-0"
          onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}
          disabled={isSubmitting}
        >
          {formType === 'login' ? 'Sign up' : 'Sign in'}
        </Button>
      </p>
    </div>
  );
}