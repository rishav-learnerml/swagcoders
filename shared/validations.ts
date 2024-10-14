import z from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailId: z.string().email(),
  password: z.string().min(6),
  age: z.number().int().min(0),
  gender: z.enum(["male", "female", "other"]),
});

export type UserType = z.infer<typeof userSchema>;
