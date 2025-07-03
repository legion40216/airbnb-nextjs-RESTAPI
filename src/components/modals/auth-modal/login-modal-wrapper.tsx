// components/modals/auth-modal/login-modal-wrapper.tsx
'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';
import { LoginFormValues, loginSchema } from '@/schemas';
import { useForm } from "react-hook-form";

import AuthModal from './auth-modal';
import LoginForm from './login-form/login-form';

import { Form } from '@/components/ui/form';

type LoginProps = {
  title: string;
  description: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  formType: 'login'
};

export default function LoginModalWrapper({
    description,
    title,
    isOpen,
    setOpen,
    formType
  }: LoginProps) {
    
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  const { isSubmitting } = form.formState;
  const { handleSubmit } = form;

  const handleSubmitForm = async () => {
  handleSubmit(onSubmit)();
  };

  const toastLoading = "Logging you in...";
  const toastSuccess = "Logged in successfully!";

  const onSubmit = async (values: LoginFormValues) => {
    const toastId = toast.loading(toastLoading);
    try {
      const result = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        toast.error(result.error.message || 'Invalid credentials');
      } else if (result.data?.user) {
        toast.success(toastSuccess);
        setOpen(false);
        router.refresh();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Something went wrong!');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const currentBody = (
    <LoginForm form={form} isSubmitting = {isSubmitting}/>
  )

  return (
  <Form {...form}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthModal
        title= {title}
        description= {description}
        isOpen={isOpen}
        setOpen={setOpen}
        body={currentBody}
        isSubmitting={isSubmitting}
        handleSubmitForm={handleSubmitForm}
        formType={formType}
      />
    </form>
  </Form>
  );
}