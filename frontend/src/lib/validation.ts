import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email({ 
        message: "Email field must be a valid email."
    }),
    password: z.string(),
})