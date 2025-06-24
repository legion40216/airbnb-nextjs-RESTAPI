"use client"
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { ListingFormValues } from "@/schemas";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import ListingImagesUpload from "./images-input/listing-images-upload";

type ImagesInputProps = {
  form: UseFormReturn<ListingFormValues>;
};

export default function ImagesInput({ form }: ImagesInputProps) {
  return (
    <div className="grid grid-rows-[min-content_1fr] h-full space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Add photos of your place</h2>
        <p className="text-muted-foreground">
          Optional
        </p>
      </div>
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem className="grid-rows-[1fr_min-content] ">
            <FormControl>
              <ListingImagesUpload
                value={(field.value ?? []).map((img) => img.url)}
                disabled={(field.value ?? []).length >= 3}
                // Upload image
                onChange={(url) => {
                  const currentImages = form.getValues("images") ?? [];
                  const newImage = { url: url };

                  if (currentImages.length < 3) {
                    const updatedImages = [...currentImages, newImage];
                    form.setValue("images", updatedImages, {
                      shouldValidate: true,
                    });
                  } else {
                    toast.error("You can only upload a maximum of 3 images.");
                  }
                }}

                // Remove image
                onRemove={(url) => {
                  const updatedImages = (field.value ?? []).filter(
                    (current) => current.url !== url
                  );
                  form.setValue("images", updatedImages, {
                    shouldValidate: true,
                  });
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
