"use client";
import { UseFormReturn } from "react-hook-form";
import useCountries from "@/hooks/useCountries";
import { SearchFormValues } from "@/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LocationInputProps = {
  form: UseFormReturn<SearchFormValues>;
};

export default function LocationInput({ form }: LocationInputProps) {
  const { getAll } = useCountries();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Where do you want to go?</h2>
        <p className="text-muted-foreground">Find properties in any location</p>
      </div>

      <FormField
        control={form.control}
        name="locationValue" // make sure this matches the field in your schema
        render={({ field }) => (
          <FormItem>
           <FormLabel>Location</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="p-6 border-2 text-left w-full">
                  <SelectValue placeholder="Anywhere" />
                </SelectTrigger>
                <SelectContent>
                  {getAll().map((country) => (
                    <SelectItem
                      key={country.value}
                      value={country.value}
                    >
                      <div className="flex items-center gap-3">
                        <span>{country.flag}</span>
                        <span>
                          {country.label},{" "}
                          <span className="text-neutral-500">
                            {country.region}
                          </span>
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
