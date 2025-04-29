import z from "zod";

const addressSchema = z.object({
  id: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  complement: z.string().nullish(),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  zipCode: z.string().min(8),
});

const addressRegisterSchema = addressSchema.omit({ id: true });
const addressUpdateSchema = addressRegisterSchema.partial();

export { addressSchema, addressRegisterSchema, addressUpdateSchema };
