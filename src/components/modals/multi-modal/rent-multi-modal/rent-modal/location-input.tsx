"use client";
import { UseFormReturn } from "react-hook-form";
import { ListingFormValues } from "@/schemas";
import useCountries from "@/hooks/useCountries";

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
  form: UseFormReturn<ListingFormValues>;
};

export default function LocationInput({ form }: LocationInputProps) {
  const { getAll } = useCountries();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Where is your place located?</h2>
        <p className="text-muted-foreground">Help us find you</p>
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
