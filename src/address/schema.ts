import z from "zod";

const addressSchema = z.object({
  id: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  complement: z.string(),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  zipcode: z.number().min(8),
});

export { addressSchema };
