import { z } from "zod";

export const signupSchema = z
  .object({
    address: z.string().min(1, "Username is required").optional(),
    fullname: z.string().min(1, "Fullname is required").optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
