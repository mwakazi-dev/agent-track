import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    }),
});
