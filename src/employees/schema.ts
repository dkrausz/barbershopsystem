import { z } from "zod";
import { addressRegisterSchema } from "../address/schema";

const employeeScheme = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
  addressId: z.string().nullish(),
  createdAt: z.date(),
});

const employeeRegisterSchema = employeeScheme.omit({ id: true, createdAt: true }).extend({ address: addressRegisterSchema.optional().nullable() });
const returnEmployeeSchema = employeeScheme.extend({ address: addressRegisterSchema.optional().nullable() });
const employeeUpdatSchema = employeeScheme.partial();

export { employeeScheme, employeeRegisterSchema, employeeUpdatSchema, returnEmployeeSchema };
