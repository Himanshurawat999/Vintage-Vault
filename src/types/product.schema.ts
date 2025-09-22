import z from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const imageFileSchema = z
  .instanceof(File, { message: "Invalid file" })
  .refine((file) => file.size <= MAX_IMAGE_SIZE, {
    message: "Image must be less than 5 MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only JPEG, JPG, PNG or WEBP images are allowed",
  });

const existingUrlSchema = z.string().url("Invalid image URL");

const imageOrUrlSchema = z.union([imageFileSchema, existingUrlSchema]);

const imagesArraySchema = z.preprocess((val) => {
  if (val instanceof FileList) return Array.from(val as FileList);
  return val;
}, z.array(imageOrUrlSchema).min(1, "At least one image is required")) as z.ZodType<(string | File)[]>;

export const productSchema = z.object({
  name: z.string().min(1, "name can't be empty"),
  description: z.string().min(1, "description can't be empty"),
  price: z.string().min(1, "Price is required"),
  weight: z.string().min(1, "Weight is required"),
  weightUnit: z.enum(['kg', 'g', 'lb', 'oz'], "weight can't be empty"),
  isActive: z.boolean(),
  inventoryQuantity: z.number().min(1, "can't be empty"),
  images: imagesArraySchema,
  tags: z.array(z.string().min(1, "tags can't be empty"))
    .refine(val => val.length > 0, { message: "It's empty" }),
  categoryId: z.string().min(1, "category can't be empty"),
});

export const uploadProductImageSchema = z.object({
  images: z.instanceof(FileList).transform(list => Array.from(list)).pipe(z.array(imageFileSchema)),
  transform: z.string().optional(),
  maxFiles: z.number().optional(),
})

export const updateProductImageSchema = z.object({
  action: z.string(),
  images: z.array(z.string()),
  imagesToRemove: z.array(z.string())
})


export type AddProductFormValues = z.infer<typeof productSchema>;
export type uploadProductImagesInput = z.infer<typeof uploadProductImageSchema>
export type updateProductImageInput = z.infer<typeof updateProductImageSchema>

// .min(1, "At least one image is required")