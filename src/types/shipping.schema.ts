import { z } from "zod";

export const ShippingSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    country: z.string().min(1, "Country is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    isDefault: z.boolean(),
});

export type ShippingFormInput = z.infer<typeof ShippingSchema>;
