import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const newUserSchema = userSchema.omit({ id: true });

type User = z.infer<typeof userSchema>;
type NewUser = z.infer<typeof newUserSchema>;

export { newUserSchema, userSchema, type NewUser, type User };
