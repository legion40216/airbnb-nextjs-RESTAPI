//schemas/index.ts
import * as z from "zod"

//Other schemas
export type ReservationServerValues = z.infer<typeof reservationServerSchema>;
export const reservationServerSchema = z.object({
  startDate: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid start date",
  }),
  endDate: z.coerce.date({
    required_error: "End date is required",
    invalid_type_error: "Invalid end date",
  }),
  totalPrice: z.coerce.number().int().positive("Total price must be a positive number"),
  listingId: z.string().min(1, "Listing ID is required"),
}).refine(
  (data) => data.endDate > data.startDate,
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);
export type SearchParamsValues = z.infer<typeof searchParamsSchema>;
export const searchParamsSchema = z.object({
  locationValue: z.string().default(""),
  guestCount: z.coerce.number().int().positive().min(1).default(1),
  roomCount: z.coerce.number().int().positive().min(1).default(1), 
  bathroomCount: z.coerce.number().int().positive().min(1).default(1),
  category: z.string().default(""),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

//Form schemas
export type LoginFormValues = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
    email: z.string().email({
     message: "Email is required"
    }),
    password: z.string().min(1,{
     message: "Password is required"
    })
})

export type RegisterFormValues = z.infer<typeof registerSchema>;
export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
export const searchSchema = z.object({
  locationValue: z.string().optional(),
  guestCount: z.coerce.number().int().positive().min(1),
  roomCount: z.coerce.number().int().positive().min(1), 
  bathroomCount: z.coerce.number().int().positive().min(1),
  category: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export type ListingFormValues = z.infer<typeof ListingSchema>;
export const ListingSchema = z.object({
  category: z.string().min(1, "Category is required"),
  locationValue: z.string().min(1, "Location is required"),
  guestCount: z.number().min(1, "Guest count must be at least 1"),
  roomCount: z.number().min(1, "Room count must be at least 1"),
  bathroomCount: z.number().min(1, "Bathroom count must be at least 1"),
  imgSrc: z.string().url("At least one image is required"),
  images: z
  .array(
    z.object({
      url: z.string().url("Invalid URL"),
    })
  )
  .optional(),
  price: z.number().min(1, "Price must be greater than 0"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;
export const reservationSchema = z.object({
  startDate: z.coerce.date({
    invalid_type_error: "Invalid start date",
  }).optional(),
  endDate: z.coerce.date({
    invalid_type_error: "Invalid end date",
  }).optional(),
  totalPrice: z.coerce.number().int().min(0, "Total price must be non-negative"),
  listingId: z.string().min(1, "Listing ID is required"),
}).refine(
  (data) => {
    // If startDate is provided, endDate must also be provided
    if (data.startDate && !data.endDate) {
      return false;
    }
    // If endDate is provided, startDate must also be provided
    if (data.endDate && !data.startDate) {
      return false;
    }
    // If both are provided, endDate must be after startDate
    if (data.startDate && data.endDate) {
      return data.endDate > data.startDate;
    }
    return true;
  },
  {
    message: "Please select both check-in and check-out dates, with check-out after check-in",
    path: ["endDate"],
  }
);
