import { z } from "zod/v3";

export const registerSchema = z.object({
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender",
  }),
  height: z
    .number({ invalid_type_error: "Height is required" })
    .min(50, "Height must be at least 50 cm")
    .max(250, "Height must be below 250 cm"),
  weight: z
    .number({ invalid_type_error: "Weight is required" })
    .min(20, "Weight must be at least 20 kg")
    .max(300, "Weight must be below 300 kg"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters"),
});


export type RegisterFormData = z.infer<typeof registerSchema>;