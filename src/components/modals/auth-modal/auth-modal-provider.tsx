// components/auth/AuthModalProvider.tsx
'use client';
import { useAuthModalStore } from '@/hooks/useAuthModalStore';
import React from 'react';
import LoginModalWrapper from './login-modal-wrapper';
import RegisterModalWrapper from './register-modal-wrapper';

export default function AuthModalProvider() {
  const { isOpen, formType, closeModal } = useAuthModalStore();

  if (!isOpen) {
    return null;
  }

  let title = '';
  let description = '';

  switch (formType || 'login') {
    case 'login':
      title = 'Sign in';
      description = 'Welcome back! Please sign in to continue.';
      break;
    case 'register':
      title = 'Register';
      description = 'Create an account to get started.';
      break;
    default:
      return null; // Handle unknown form types
  }

  return (
    <>
      {formType === 'login' && (
        <LoginModalWrapper
          title={title}
          description={description}
          isOpen={isOpen}
          setOpen={closeModal}
          formType={formType}
        />
      )}

      {formType === 'register' && (
        <RegisterModalWrapper
          title={title}
          description={description}
          isOpen={isOpen}
          setOpen={closeModal}
          formType={formType}
        />
      )}
    </>
  );
}