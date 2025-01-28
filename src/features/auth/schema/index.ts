import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "პაროლი არ ემთხვევა",
  });

type Login = z.infer<typeof loginSchema>;
type Register = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema, type Login, type Register };
