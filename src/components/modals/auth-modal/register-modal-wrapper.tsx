// components/auth/RegisterModal.tsx
"use client";
import React from "react";

import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { RegisterFormValues, registerSchema } from "@/schemas";
import { useAuthModalStore } from "@/hooks/useAuthModalStore";

import RegisterForm from "./register-form/registration-form";
import AuthModal from "./auth-modal";

type registerProps = {
  title: string;
  description: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  formType: "register"
};

export default function RegisterModalWrapper({
  description,
  title,
  isOpen,
  setOpen,
  formType = "register",
}: registerProps) {
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { isSubmitting } = form.formState;
  const { handleSubmit } = form;
  const { setType: setFormType } = useAuthModalStore();

  
  const handleSubmitForm = async () => {
    handleSubmit(onSubmit)();
  };

  const toastLoading = "Creating your account..."
  const toastSuccess = "Registration successful! Please log in.";

  const onSubmit = async (values: RegisterFormValues) => {
    const toastId = toast.loading(toastLoading);
    try {
      const result = await signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (result.error) {
        toast.error(result.error.message || "Registration failed.");
      } else if (result.data?.user) {
        toast.success(toastSuccess);
        // Redirect after a short delay
        setTimeout(() => {
        setFormType("login");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const currentBody = (
    <RegisterForm form={form} isSubmitting={isSubmitting} />
  )

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthModal
          title={title}
          description={description}
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
