import { searchParamsSchema, SearchParamsValues } from "@/schemas";
import { ReadonlyURLSearchParams } from "next/navigation";

// For server-side: Next.js searchParams prop (can have arrays)
function normalizeServerSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      result[key] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      // Take the last value from array
      result[key] = value[value.length - 1];
    }
    // Skip undefined values
  }
  
  return result;
}

// For client-side: URLSearchParams/ReadonlyURLSearchParams
function normalizeClientSearchParams(
  params: URLSearchParams | ReadonlyURLSearchParams
): Record<string, string> {
  const result: Record<string, string> = {};
  
  // URLSearchParams.entries() automatically handles duplicates by giving you all values
  // but we want the last one to match server behavior
  for (const [key, value] of params.entries()) {
    result[key] = value; // This will naturally take the last value due to iteration
  }
  
  return result;
}

// Shared validation logic
function validateNormalizedParams(normalized: Record<string, string>): SearchParamsValues {
  const result: Partial<SearchParamsValues> = {};

  for (const [key, value] of Object.entries(normalized)) {
    try {
      // Validate single field
      const singleField = searchParamsSchema.pick({ [key]: true } as any);
      const parsed = singleField.parse({ [key]: value });
      Object.assign(result, parsed);
    } catch {
      // Skip invalid fields silently
    }
  }

  // Parse with schema to apply defaults and final validation
  return searchParamsSchema.parse(result);
}

// Server-side function for Next.js searchParams prop
export function getValidatedServerSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): SearchParamsValues {
  const normalized = normalizeServerSearchParams(searchParams);
  return validateNormalizedParams(normalized);
}

// Client-side function for URLSearchParams/useSearchParams
export function getValidatedClientSearchParams(
  params: URLSearchParams | ReadonlyURLSearchParams
): SearchParamsValues {
  const normalized = normalizeClientSearchParams(params);
  return validateNormalizedParams(normalized);
}



// Type guard to distinguish between the two input types
function isURLSearchParamsLike(
  input: any
): input is URLSearchParams | ReadonlyURLSearchParams {
  return input && typeof input.entries === "function";
}
// Main function that works for both (kept for backward compatibility)
export function getValidatedSearchParams(
  input:
    | Record<string, string | string[] | undefined>  // Server-side
    | URLSearchParams                                 // Client-side
    | ReadonlyURLSearchParams                        // Client-side (Next.js useSearchParams)
): SearchParamsValues {
  // Normalize based on input type
  const normalized = isURLSearchParamsLike(input)
    ? normalizeClientSearchParams(input)
    : normalizeServerSearchParams(input);

  return validateNormalizedParams(normalized);
}