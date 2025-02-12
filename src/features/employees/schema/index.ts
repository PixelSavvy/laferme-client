import { z } from "zod";

const employeeSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const newEmployeeSchema = employeeSchema.omit({ id: true });

type Employee = z.infer<typeof employeeSchema>;
type NewEmployee = z.infer<typeof newEmployeeSchema>;

export { employeeSchema, newEmployeeSchema, type Employee, type NewEmployee };
