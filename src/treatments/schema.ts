import { z } from "zod";

const treatmentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(5),
  price: z.number().min(1),
  description: z.string().min(1),
  time: z.string(),
});

const treatmentRegisterSchema = treatmentSchema.omit({ id: true });
const treatmentUpdateSchema = treatmentRegisterSchema.partial();

export { treatmentSchema, treatmentRegisterSchema, treatmentUpdateSchema };
