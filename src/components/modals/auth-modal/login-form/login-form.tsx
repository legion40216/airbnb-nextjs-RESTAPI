// components/auth/LoginForm.tsx
'use client';

import React from 'react';
import {  UseFormReturn } from 'react-hook-form';

import { LoginFormValues,  } from '@/schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type LoginFormProps = {
  form: UseFormReturn<LoginFormValues>;
  isSubmitting: boolean;
};

export default function LoginForm(
  { form, isSubmitting }: LoginFormProps
) {

  return (
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
                    disabled={isSubmitting}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="*****"
                    type="password"
                    disabled={isSubmitting}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  );
}