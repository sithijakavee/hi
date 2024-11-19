import {z} from 'zod'

export const SignUpFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }).max(32, {
        message: "Password must not exceed 32 characters"
    }),
    confirmPassword: z.string(),
    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;


export const SignInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password required"
    })
})

export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;


export const SetupProfileFormSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters long"
    }).max(10, {
        message: "Username must not exceed 10 characters"
    }).regex(/^[a-zA-Z0-9_-]+$/, {
        message: "Username can only contain alphanumeric characters, underscores, and hyphens"
    }),
    bio: z.string().max(255, {
        message: "Bio must not exceed 255 characters"
    })
})

export type SetupProfileFormSchemaType = z.infer<typeof SetupProfileFormSchema>;
