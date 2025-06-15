"use client"
import React from 'react'

import { UseFormReturn } from 'react-hook-form';
import { SearchFormValues } from '@/schemas';

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

type CounterInputProps = {
  form: UseFormReturn<SearchFormValues>;
};

export default function CounterInput({ form }: CounterInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold"></h2>
        <p className="text-muted-foreground"></p>
      </div>
      <FormField
        control={form.control}
        name="guestCount"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <div>
                <FormLabel>Guests</FormLabel>
                <p className="text-sm text-muted-foreground">
                  How many guests can stay?
                </p>
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
                <p className="text-sm text-muted-foreground">
                  How many rooms are available?
                </p>
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
                <p className="text-sm text-muted-foreground">
                  How many bathrooms are available?
                </p>
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
