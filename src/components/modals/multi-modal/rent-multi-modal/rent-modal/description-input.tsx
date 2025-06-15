"use client"
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { ListingFormValues } from "@/schemas";
import {
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type DescriptionInputProps = {
  form: UseFormReturn<ListingFormValues>;
};

export default function DescriptionInput({ form }: DescriptionInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Describe your place</h2>
        <p className="text-muted-foreground">What makes your place special?</p>
      </div>

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter a catchy title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell potential guests about your space, the neighborhood, amenities, etc."
                {...field}
                rows={5}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
