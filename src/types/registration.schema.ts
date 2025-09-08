import { z } from 'zod';

export const registrationSchema = z.object({
    firstName: z.string().trim().min(3, "First Name must have at least 3 characters"),
    lastName: z.string().trim().min(3, "Last Name must have at least 3 characters"),
    email: z.email({
        pattern: z.regexes.email,
        message: "Invalid email address",
    }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
            isVerified: boolean;
            createdAt: string;
            updatedAt: string;
        };
        accessToken: string;
    };
}

export const loginSchema = z.object({
    email: z.email({
        pattern: z.regexes.email,
        message: "Invalid email address",
    }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export const forgetSchema = z.object({
    email: z.email({
        pattern: z.regexes.email,
        message: "Invalid email address",
    }),
});

export interface ForgetResponse {
    success: boolean;
    message: string;
}

export const resetSchema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
    token: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});

export interface ResetResponse {
    success: boolean;
    message: string;
}

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type loginInput = z.infer<typeof loginSchema>;
export type forgetInput = z.infer<typeof forgetSchema>;
export type resetInput = z.infer<typeof resetSchema>;