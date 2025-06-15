"use client";
import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/schemas';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';
import { defaultLoggedInRoute } from '@/routes';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';


export default function LoginForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const router = useRouter();
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        const toastId = toast.loading('Logging you in...');
        try {
            // Use better-auth's signIn method
            const result = await signIn.email({
                email: values.email,
                password: values.password,
            });

            if (result.error) {
                toast.error(result.error.message || "Invalid credentials");
            } else if (result.data?.user) {
                toast.success("Logged in successfully!");
                router.push(defaultLoggedInRoute || '/'); // Redirect on success    
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account yet?{" "}
            <Link href="/auth/register" className="text-primary hover:underline"> {/* Ensure this route exists for your register page */}
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    );
}