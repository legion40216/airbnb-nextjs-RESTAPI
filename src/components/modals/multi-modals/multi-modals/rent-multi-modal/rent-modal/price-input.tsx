"use client"
import React from 'react'
import { ListingFormValues } from "@/schemas";
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from '@/components/ui/input';

type LocationInputProps = {
  form: UseFormReturn<ListingFormValues>;
};

export default function PriceInput({ form }: LocationInputProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Set your price</h2>
      <p className="text-muted-foreground">How much do you want to charge per night?</p>
      
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price per night ($)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="100" 
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
