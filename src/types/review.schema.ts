import z from "zod";

export const reviewSchema = z.object({
    rating: z.number("rate between 1 to 5"),
    title: z.string("can't be empty"),
    comment: z.string("can't be empty"),
})

export const reviewUpdateSchema = z.object({
    rating: z.number("rate between 1 to 5"),
    title: z.string("can't be empty"),
    comment: z.string("can't be empty"),
})

export type reviewInput = z.infer<typeof reviewSchema>
export type reviewUpdateInput = z.infer<typeof reviewUpdateSchema>
