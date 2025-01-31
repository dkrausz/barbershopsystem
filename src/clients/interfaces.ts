import z from "zod";
import { addressSchema } from "../address/schema";
import { clientRegisterSchema, clientSchema, updateClientSchema } from "./schema";

export interface IClientService {
  registerClient(payload: TregisterClient): Promise<Tclient>;
  getClients(): Promise<Array<Tclient>>;
  getClientByName(name: string): Promise<Array<Tclient> | null>;
  getClientByPhone(phone: string): Promise<Tclient | null>;
  updateClient(id: string, payload: TupdateClient): Promise<Tclient | null>;
  deleteClient(id: string): Promise<void>;
}

export type Tclient = z.infer<typeof clientSchema>;
export type TregisterClient = z.infer<typeof clientRegisterSchema>;
export type TupdateClient = z.infer<typeof updateClientSchema>;
