import z from "zod";

export const orderStatusSchema = z.object({
    status: z.enum([ 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'returned'], "select any one"),
    comment: z.string().min(1, "Can't be empty"),
    trackingNumber: z.string(),
    isCustomerVisible: z.boolean("Can't be empty"),
})

export type OrderStatusValues = z.infer<typeof orderStatusSchema>