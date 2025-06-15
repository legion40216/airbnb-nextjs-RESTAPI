// components/auth/LoginModal.tsx
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';
import { LoginFormValues, loginSchema } from '@/schemas';
import AuthModal from './auth-modal';
import LoginForm from './login-form/login-form';
import { useForm } from "react-hook-form";
import { Form } from '../../ui/form';

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

  const onSubmit = async (values: LoginFormValues) => {
    const toastId = toast.loading('Logging you in...');
    try {
      const result = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        toast.error(result.error.message || 'Invalid credentials');
      } else if (result.data?.user) {
        toast.success('Logged in successfully!');
        setOpen(false);
        router.refresh();
      }
    } catch (error: any) {
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