"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ListingFormValues } from "@/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import ListingImageUpload from "./images-input/listing-image-upload";

type ImagesInputProps = {
  form: UseFormReturn<ListingFormValues>;
};

export default function ImageInput({ form }: ImagesInputProps) {
  return (
    <div className="grid grid-rows-[min-content_1fr] h-full space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Add a photo of your place</h2>
        <p className="text-muted-foreground">
          Show guests what your place looks like
        </p>
      </div>
      <FormField
        control={form.control}
        name="imgSrc"
        render={({ field }) => (
          <FormItem className="grid-rows-[1fr_min-content] ">
            <FormControl>
              <ListingImageUpload
                value={field.value ? [field.value] : []}
                disabled={!!field.value}
                onChange={(url) => {
                  field.onChange(url);
                }}
                onRemove={() => {
                  field.onChange("");
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
