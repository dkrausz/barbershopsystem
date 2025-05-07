import { z } from "zod";
import { orderSchema, orderWithTreatmentsAndClientSchema, orderWithTreatmentsSchema, registerOrderSchema } from "./schema";
import { updateClientSchema } from "../clients/schema";

interface IorderService {
  registerOrder(clientId: string, payload: TregisterOrder): Promise<TreturnOrderWithTreatments>;
}

type Torder = z.infer<typeof orderSchema>;
type TregisterOrder = z.infer<typeof registerOrderSchema>;
type TupdateOrder = z.infer<typeof updateClientSchema>;
type TreturnOrderWithTreatments = z.infer<typeof orderWithTreatmentsSchema>;
type TreturnOrderWithTreatmentsAndClient = z.infer<typeof orderWithTreatmentsAndClientSchema>;

export { IorderService, Torder, TregisterOrder, TupdateOrder, TreturnOrderWithTreatments, TreturnOrderWithTreatmentsAndClient };
