import { z } from "zod";

// Validates only the fields the UI uses. Unknown fields are stripped, so
// API additions don't break the app, but a missing or renamed field fails
// loudly at the boundary instead of rendering `undefined` somewhere deep.
export const productSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  brand: z.string().optional(),
  category: z.string(),
  /** USD */
  price: z.number().nonnegative(),
  thumbnail: z.url(),
});

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
});

/** GET /products/{id}: the list fields plus what the detail page shows. */
export const productDetailsSchema = productSchema.extend({
  description: z.string(),
  images: z.array(z.url()),
});
