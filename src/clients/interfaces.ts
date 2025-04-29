import z from "zod";
import { addressSchema } from "../address/schema";
import { clientRegisterSchema, clientSchema, updateClientSchema } from "./schema";

interface IClientService {
  registerClient(payload: TregisterClient): Promise<Tclient>;
  getClients(): Promise<Array<Tclient>>;
  getClientById(id: string): Promise<Tclient | null>;
  getClientByName(name: string): Promise<Array<Tclient> | null>;
  getClientByPhone(phone: string): Promise<Tclient | null>;
  updateClient(id: string, payload: TupdateClient): Promise<Tclient | null>;
  deleteClient(id: string): Promise<void>;
}

type Tclient = z.infer<typeof clientSchema>;
type TregisterClient = z.infer<typeof clientRegisterSchema>;
type TupdateClient = z.infer<typeof updateClientSchema>;

export { IClientService, Tclient, TregisterClient, TupdateClient };
