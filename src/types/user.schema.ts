import z from "zod";

export const userFormSchema = z.object({
    firstName: z.string().trim().min(3, "First Name must have at least 3 characters"),
    lastName: z.string().trim().min(3, "Last Name must have at least 3 characters"),
    email: z.email({
        pattern: z.regexes.email,
        message: "Invalid email address",
    }),
})

export type userFormInput = z.infer<typeof userFormSchema>