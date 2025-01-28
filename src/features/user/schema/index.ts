import { z } from "zod";

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type User = z.infer<typeof userSchema>;

export { userSchema, type User };
