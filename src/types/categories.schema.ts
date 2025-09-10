import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1, "Category name cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  isActive: z.boolean("Active is cannot be empty"),
});

export type AddCategoryFormValues = z.infer<typeof addCategorySchema>;
