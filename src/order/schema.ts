import { z } from "zod";
import { clientSchema } from "../clients/schema";
import { treatmentSchema } from "../treatments/schema";

const orderSchema = z.object({
  id: z.string().min(1),
  treatmentIds: z.array(z.string().min(1)).nonempty("Nenhum tratamento selecionado"),
  clientId: z.string().min(1),
  amount: z.number().min(0.01),
  createdAt: z.date(),
  date: z.coerce.date(),
});

const orderWithTreatmentsSchema = orderSchema.omit({ treatmentIds: true }).extend({ treatments: treatmentSchema.array() });
const orderWithTreatmentsAndClientSchema = orderWithTreatmentsSchema.omit({ clientId: true }).extend({ client: clientSchema });
const registerOrderSchema = orderSchema.omit({ id: true, clientId: true, createdAt: true, amount: true });
const updateOrderSchema = registerOrderSchema.partial();
const returnOrderSchema = orderSchema.extend({ client: clientSchema });

export { orderSchema, registerOrderSchema, updateOrderSchema, returnOrderSchema, orderWithTreatmentsSchema, orderWithTreatmentsAndClientSchema };
