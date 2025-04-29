import { z } from "zod";

const employeeScheme = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
  addressId: z.string().nullish(),
});

const employeeRegisterSchema = employeeScheme.omit({ id: true });
const employeeUpdatSchema = employeeScheme.partial();

export { employeeScheme, employeeRegisterSchema, employeeUpdatSchema };
