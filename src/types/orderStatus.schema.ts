import z from "zod";

export const orderStatusSchema = z.object({
    status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'returned'], "select any one"),
    comment: z.string(),
    isCustomerVisible: z.boolean("Can't be empty"),
})

export const orderConfirmPaymentSchema = z.object({
    comment: z.string(),
    isCustomerVisible: z.boolean("Can't be empty"),
})

export const orderCancel = z.object({
    reason: z.string("Can't be empty"),
})

export type OrderStatusValues = z.infer<typeof orderStatusSchema>
export type OrderConfirmPaymentValues = z.infer<typeof orderConfirmPaymentSchema>
export type OrderCancelValues = z.infer<typeof orderCancel>