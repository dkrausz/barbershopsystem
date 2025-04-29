import z from "zod";
import { addressRegisterSchema, addressSchema } from "../address/schema";

const clientSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  addressId: z.string().nullish(),
});

const clientRegisterSchema = clientSchema.omit({ id: true }).extend({ address: addressRegisterSchema.optional() });

const returnClientSchema = clientSchema.extend({ address: addressSchema.optional().nullable() });

const updateClientSchema = clientSchema.omit({ id: true }).partial();

export { clientSchema, clientRegisterSchema, updateClientSchema, returnClientSchema };
