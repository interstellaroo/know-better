import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email({ 
        message: "Email field must be a valid email."
    }),
    password: z.string(),
})

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });