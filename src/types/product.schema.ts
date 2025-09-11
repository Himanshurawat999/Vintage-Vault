import z from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "name can't be empty"),
    description: z.string().min(1, "description can't be empty"),
    price: z.number("Price is required"),
    weight: z.number("Weight is required"),
    weightUnit: z.enum(['kg', 'g', 'l', 'ml'], "weigth can't be empty"),
    status: z.enum(['draft', 'active', 'inactive', 'discontinued']),
    inventoryQuantity: z.number(),
    allowBackorder: z.boolean(),
    images: z.array(z.string("Image can't be empty")),
    tags: z.array(z.string().min(1, "tags can't be empty")),
    categoryId: z.string("category can't be empty"),
  });

  export type AddProductFormValues = z.infer<typeof productSchema>;