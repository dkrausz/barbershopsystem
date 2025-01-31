import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { IClientService, Tclient, TregisterClient, TupdateClient } from "./interfaces";
import { clientSchema } from "./schema";

injectable();

export class ClientService implements IClientService {
  registerClient = async (payload: TregisterClient): Promise<Tclient> => {
    const registeredClient = await prisma.client.create({
      data: payload,
    });

    return clientSchema.parse(registeredClient);
  };

  getClients = async (): Promise<Array<Tclient>> => {
    const clientList = await prisma.client.findMany({ include: { address: true } });
    return clientSchema.array().parse(clientList);
  };

  getClientByName = async (name: string): Promise<Array<Tclient> | null> => {
    const clientList = await prisma.client.findMany({ where: { name } });
    return clientSchema.array().parse(clientList);
  };

  getClientByPhone = async (phone: string): Promise<Tclient | null> => {
    const client = await prisma.client.findFirst({ where: { phone } });
    return clientSchema.parse(client);
  };

  updateClient = async (id: string, payload: TupdateClient): Promise<Tclient | null> => {
    const updatedClient = await prisma.client.update({ where: { id }, data: payload });
    return clientSchema.parse(updatedClient);
  };

  deleteClient = async (id: string): Promise<void> => {
    await prisma.client.delete({ where: { id } });
    return;
  };
}
