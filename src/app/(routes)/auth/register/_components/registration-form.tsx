"use client";
import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/schemas';
import { toast } from 'sonner';
import { signUp } from '@/lib/auth-client'; 

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


export default function RegisterForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({ // Add type for useForm
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        mode: "onChange", // Good for instant feedback
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        const toastId = toast.loading("Creating your account...");
        try {
            // Use better-auth's signUp method
            const result = await signUp.email({ // <-- Use better-auth signUp
                email: values.email,
                password: values.password,
                name: values.name,
                // Set to true if you want email verification
                // Pass additional fields like 'name'.
                // better-auth adapter will try to save them if the User model has the field.     
            });
           
            if (result.error) {
                toast.error(result.error.message || "Registration failed.");
            } else if (result.data?.user) {
                toast.success("Registration successful! Please log in.");
                // Redirect to login page or a verification page if email verification is enabled
                // router.push(result.url || "/auth/login"); // better-auth might provide a redirect URL
                router.push("/auth/login"); // Or your designated login page route
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
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Name</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Email</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Password</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="*****"
                          type="password"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline"> {/* Ensure this route exists for your login page */}
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    );
}