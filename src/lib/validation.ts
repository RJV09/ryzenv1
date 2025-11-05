import { z } from 'zod';

export const reviewSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  discord_username: z.string()
    .trim()
    .max(100, { message: "Discord username must be less than 100 characters" })
    .optional()
    .nullable(),
  server_name: z.string()
    .trim()
    .max(200, { message: "Server name must be less than 200 characters" })
    .optional()
    .nullable(),
  review_text: z.string()
    .trim()
    .min(10, { message: "Review must be at least 10 characters" })
    .max(1000, { message: "Review must be less than 1000 characters" }),
  rating: z.number()
    .min(1, { message: "Please select a rating" })
    .max(5, { message: "Rating must be between 1 and 5" })
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
