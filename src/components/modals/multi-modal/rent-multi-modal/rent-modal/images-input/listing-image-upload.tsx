"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { ImagePlus, Trash, Loader2 } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

import { Button } from "@/components/ui/button";

interface ListingImageUploadProps {
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
  value?: string[]; // list of image URLs
  limitValue?: number;
}

export default function ListingImageUpload({
  disabled = false,
  onChange,
  onRemove,
  value = [],
  limitValue = 1,
}: ListingImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>(value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPreviews(value);
  }, [value]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const files = Array.from(input.files ?? []);

    if (!files.length) return;
    input.value = "";

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setIsLoading(true);

    try {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from("listing-image")
          .upload(fileName, file);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from("listing-image")
          .getPublicUrl(data.path);

        if (publicUrlData.publicUrl) {
          onChange(publicUrlData.publicUrl);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (url: string) => {
    URL.revokeObjectURL(url);
    const updatedPreviews = previews.filter((preview) => preview !== url);
    setPreviews(updatedPreviews);
    setIsLoading(true);

    try {
      const fileName = url.split("/").pop() ?? "";
      const { error } = await supabase.storage
        .from("listing-image")
        .remove([fileName]);

      if (error) throw error;

      onRemove(url);
    } catch (error) {
      console.error("Error removing image from storage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLimitReached = previews.length >= limitValue;

  return (
    <div className="space-y-4">
      {previews.length > 0 && (
        <div className="flex w-full border-dashed border-2 h-full flex-wrap gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative w-full h-full rounded-md overflow-hidden"
            >
              <Image
                fill
                className="object-cover"
                alt="Preview"
                src={preview}
              />
              <Button
                type="button"
                onClick={() => handleRemove(preview)}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 z-10"
                disabled={isLoading}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {!isLimitReached && (
        <div className="h-full">
          <Button
            type="button"
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={isLoading || disabled}
            variant={"secondary"}
            className={cn(
              "flex flex-col items-center justify-center gap-2",
              "transition border-dashed border-2  h-full w-full",
              {
                "bg-gray-400 cursor-not-allowed": isLoading,
              }
            )}
          >
            {isLoading ? (
              <Loader2 className="size-14 animate-spin" />
            ) : (
              <ImagePlus className="size-14" />
            )}
            <span className="text-lg">
              {isLoading ? "Uploading..." : "Upload Image"}
            </span>
          </Button>
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
            accept="image/*"
          />
        </div>
      )}
    </div>
  );
}
