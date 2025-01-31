import z from "zod";

const clientSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string(),
  addressId: z.string(),
});

const clientRegisterSchema = clientSchema.omit({
  id: true,
  addressId: true,
});

const updateClientSchema = clientRegisterSchema.partial();

export { clientSchema, clientRegisterSchema, updateClientSchema };
