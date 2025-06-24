"use client"
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { ListingFormValues } from "@/schemas";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

type CounterInputProps = {
  form: UseFormReturn<ListingFormValues>;
};

export default function CounterInput({ form }: CounterInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">
          Who's coming?
        </h2>
      </div>

      <FormField
        control={form.control}
        name="guestCount"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <div>
                <FormLabel>Guests</FormLabel>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    field.value > 1 && field.onChange(field.value - 1)
                  }
                  disabled={field.value <= 1}
                  className="h-8 w-8"
                >
                  <Minus size={16} />
                </Button>
                <span className="text-lg font-medium w-6 text-center">
                  {field.value}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => field.onChange(field.value + 1)}
                  className="h-8 w-8"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="roomCount"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <div>
                <FormLabel>Rooms</FormLabel>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    field.value > 1 && field.onChange(field.value - 1)
                  }
                  disabled={field.value <= 1}
                  className="h-8 w-8"
                >
                  <Minus size={16} />
                </Button>
                <span className="text-lg font-medium w-6 text-center">
                  {field.value}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => field.onChange(field.value + 1)}
                  className="h-8 w-8"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bathroomCount"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <div>
                <FormLabel>Bathrooms</FormLabel>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    field.value > 1 && field.onChange(field.value - 1)
                  }
                  disabled={field.value <= 1}
                  className="h-8 w-8"
                >
                  <Minus size={16} />
                </Button>
                <span className="text-lg font-medium w-6 text-center">
                  {field.value}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => field.onChange(field.value + 1)}
                  className="h-8 w-8"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
