"use client";

import { categories } from '@/constants/categoryIcons';
import { cn } from '@/lib/utils';
import { UseFormReturn } from "react-hook-form";
import { ListingFormValues } from "@/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";

// Add props type
type CategoryInputProps = {
  form: UseFormReturn<ListingFormValues>;
};

export default function CategoryInput({ form }: CategoryInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Which of these best describes your place?</h2>
        <p className="text-muted-foreground">Pick a category</p>
      </div>

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-2 gap-4"
              >
                {categories.map((item) => (
                  <FormItem key={item.label}>
                    <FormControl>
                      <RadioGroupItem value={item.label} className="sr-only" />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      <div
                        className={cn(
                          "flex items-center gap-2 grow rounded-lg border-2 p-4 transition ",
                          field.value === item.label
                            ? "border-black bg-neutral-100"
                            : "border-neutral-200 hover:border-neutral-300"
                        )}
                      >
                        <item.icon size={30} />
                        <p className="font-medium">{item.label}</p>
                      </div>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
