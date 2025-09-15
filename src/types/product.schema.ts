import z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "name can't be empty"),
  description: z.string().min(1, "description can't be empty"),
  price: z.string("Price is required"),
  weight: z.string("Weight is required"),
  weightUnit: z.enum(['kg', 'g', 'l', 'ml'], "weigth can't be empty"),
  status: z.enum(['draft', 'active', 'inactive', 'discontinued']),
  inventoryQuantity: z.number(),
  allowBackorder: z.boolean(),
  images: z
    .instanceof(FileList)
    .refine((list) => list.length > 0, {
      message: "Please select at least one image",
    })
    .refine((list) => list.length <= 5, {
      message: "You can upload up to 5 images",
    })
    .transform((list) => Array.from(list)) // Convert FileList to File[]
    .refine((files: File[]) =>
      files.every((file) => ["image/jpeg", "image/png"].includes(file.type))
    , {
      message: "Only JPG or PNG allowed",
    })
    .refine((files: File[]) =>
      files.every((file) => file.size <= 5 * 1024 * 1024)
    , {
      message: "Each image must be ≤ 5MB",
    }),
  tags: z.array(z.string().min(1, "tags can't be empty")),
  categoryId: z.string("category can't be empty"),
});


export type AddProductFormValues = z.infer<typeof productSchema>;