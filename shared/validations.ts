import z from "zod";

// Full user schema
export const userSchema = z.object({
  firstName: z.string().min(4),
  lastName: z.string().optional(),
  emailId: z.string().email(),
  password: z.string().min(6),
  age: z.number().int().min(18).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  photoUrl: z.string().url().optional(),
  skills: z.array(z.string()).optional(),
  about: z.string().min(6).optional(),
});

// Schema for updating the user
export const userUpdateSchema = z
  .object({
    firstName: z.string().min(4).optional(), // Optional for updates
    lastName: z.string().optional(),
    password: z.string().min(6).optional(), // Optional for updates
    photoUrl: z.string().optional(),
    about: z.string().min(6).optional(),
    gender: z.enum(["male", "female", "others"]).optional(),
    age: z.number().min(18).optional(),
    skills: z
      .array(z.string())
      .max(6)
      .describe("At max 6 skills allowed!")
      .optional(),
  })
  .strict(); // Ensures only defined fields can be updated

export const userLoginSchema = z.object({
  emailId: z.string().email(),
  password: z.string().min(6),
});

// Type inference
export type UserType = z.infer<typeof userSchema>;
export type UserUpdateType = z.infer<typeof userUpdateSchema>;
export type userLoginType = z.infer<typeof userLoginSchema>;
