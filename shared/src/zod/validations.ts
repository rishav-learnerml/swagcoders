import z from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailId: z.string().email(),  // Added validation for a valid email format
  password: z.string().min(6),  // Added minimum length for password
  age: z.number().int().min(0), // Ensures age is a non-negative integer
  gender: z.enum(["male", "female", "other"]), // Restricted to specific values
});

export type UserType = z.infer<typeof userSchema>; // Inferred TypeScript type from schema
